import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { NewSaleDto } from './dto/new-sale.dto';
import { Sale } from 'src/schemas/sale.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { Commission } from 'src/schemas/commission.schema';
import { Account } from 'src/schemas/account.schema';

@Injectable()
export class SalesService {
  private readonly logger = new Logger(SalesService.name);

  constructor(
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(Commission.name) private commissionModel: Model<Commission>,
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
      .find({ user: userId })
      .sort({ date: -1 })
      .limit(1);

    // if no sales accounting data for an agent is available - set to 0
    const lastPendingComm =
      lastRecord.length > 0 ? lastRecord[0].total_commission_pending : 0;

    const latestPaidComm =
      lastRecord.length > 0 ? lastRecord[0].total_commission_paid : 0;

    /** calculate the balance from paying an agent */
    const lastCommBalance = lastPendingComm + totalCommission - latestPaidComm;

    /** get the total sales of all products */
    const lastTotalSales =
      lastRecord.length > 0 ? lastRecord[0].total_sales : 0;

    const commissionsAccount = new this.accountModel({
      agent: userId,
      total_commission_paid: latestPaidComm,
      total_commission_pending: lastPendingComm + totalCommission,
      balance: lastCommBalance,
      total_sales: totalSalesAmount + lastTotalSales,
      date: new Date(),
    });

    await commissionsAccount.save();

    const sale = new this.saleModel({
      agent: userId,
      account: commissionsAccount.id,
      product: body.product,
      quantity: body.quantity,
      commission: totalCommission,
      totalAmount: totalSalesAmount,
      date: new Date(),
    });

    await sale.save();

    return sale;
  }
}
