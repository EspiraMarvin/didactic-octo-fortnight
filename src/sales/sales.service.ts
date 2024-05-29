import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { NewSaleDto } from './dto/new-sale.dto';
import { Sale } from 'src/schemas/sale.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { Commission } from 'src/schemas/commission.schema';
import { Account } from 'src/schemas/account.schema';
import { MailService } from 'src/mail/mail.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name);

  constructor(
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Commission.name) private commissionModel: Model<Commission>,
    private readonly mailService: MailService,
  ) {}

  /**
   * record new sale by an agent
   * @param body
   * @returns
   */
  async recordNewSale(body: NewSaleDto, userId: string): Promise<Sale> {
    const product = await this.productModel.findById(body.product).lean();
    const commissionExists = await this.commissionModel.findOne({});
    const commissionPercentage = commissionExists?.commission;

    if (!product || !commissionExists) {
      const value = !product ? 'Product' : 'Commission';
      // throw new BadRequestException(`Invalid ${value} account`);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `${value} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // calculates the total amount of sales made
    const totalSalesAmount = Number(product.price) * body.quantity;

    // calculates the commission for all sales
    const totalCommission =
      totalSalesAmount * Number(commissionPercentage / 100);

    /** get the last added record from the accounts model */
    const lastRecord = await this.accountModel
      .find({ agent: userId })
      .sort({ date: -1 })
      .limit(1)
      .exec();

    // if no sales accounting data for an agent is available - set to 0
    const lastPendingComm =
      lastRecord.length > 0 ? lastRecord[0].total_commission_pending : 0;

    const lastPaidComm =
      lastRecord.length > 0 ? lastRecord[0].total_commission_paid : 0;

    /** get the total sales of all products */
    const lastTotalSales =
      lastRecord.length > 0 ? lastRecord[0].total_sales : 0;

    const commissionsAccount = new this.accountModel({
      agent: userId,
      product: product._id,
      total_commission_paid: lastPaidComm,
      total_commission_pending: lastPendingComm + totalCommission,
      total_sales: totalSalesAmount + lastTotalSales,
      date: new Date(),
    });

    await commissionsAccount.save();

    const sale = new this.saleModel({
      agent: userId,
      account: commissionsAccount.id,
      product: product,
      quantity: body.quantity,
      commission: totalCommission,
      totalAmount: totalSalesAmount,
      date: new Date(),
    });

    await sale.save();

    return sale;
  }

  /**
   *
   * @param startDate
   * @param endDate
   * @param userId
   * @returns
   */
  async getAllSales(
    startDate: Date,
    endDate: Date,
    userId?: string,
  ): Promise<Sale[]> {
    this.logger.log(`USER ID`, userId);
    let filters: any = {};
    if (userId) filters = { agent: userId };

    if (!startDate || !endDate)
      throw new BadRequestException(
        `Invalid! ${!startDate ? 'start date' : 'end date'} required`,
      );

    if (startDate || endDate) {
      filters.date = {
        /** greater than or equal to start date */
        ...(startDate && { $gte: startDate }),
        /** less than or equal to end date */
        ...(endDate && { $lte: endDate }),
      };
    }

    const sales = await this.saleModel
      .find(filters)
      .populate('product')
      .populate('agent')
      .populate('account')
      .lean()
      .exec();

    return sales;
  }

  /**
   *
   * @param startDate
   * @param endDate
   * @param userId
   * @returns
   */
  async getAgentSalesReport(startDate: Date, endDate: Date, userId?: string) {
    let filters: any = {};
    if (userId) filters = { agent: userId };

    if (startDate || endDate) {
      filters.date = {
        ...(startDate && { $gte: startDate }),
        ...(endDate && { $lte: endDate }),
      };
    }

    const sale = await this.saleModel
      .find(filters)
      .populate('agent')
      .populate('product')
      .populate('account')
      .exec();

    return sale;
  }
}
