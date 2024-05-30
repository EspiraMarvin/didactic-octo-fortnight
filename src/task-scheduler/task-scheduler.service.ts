import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { MailService } from 'src/mail/mail.service';
import { Sale } from 'src/schemas/sale.schema';
import { User } from 'src/schemas/user.schema';
import { Account } from 'src/schemas/account.schema';
import * as moment from "moment";

@Injectable()
export class TaskSchedulerService {
  private readonly logger = new Logger(TaskSchedulerService.name);

  constructor(
    @InjectModel(Sale.name) private saleModel: Model<Sale>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly mailService: MailService,
  ) {}

  async sendSalesReport(startDate: Date, endDate: Date, user) {
    let filters: any = {};
    if (user) filters = { agent: user['_id'] };

    if (startDate || endDate) {
      filters.date = {
        ...(startDate && { $gte: startDate }),
        ...(endDate && { $lte: endDate }),
      };
    }

    const stmt = await this.saleModel
      .find(filters)
      .populate('agent')
      .populate('product')
      .populate('account')
      .exec();

    stmt['startDate'] = startDate;
    stmt['endDate'] = endDate;

    const fStmtm = stmt.map((stm) => {
      return {
        product_name: stm.product['name'],
        price: stm.product['price'],
        quantity: stm.quantity,
        total_value: stm.totalAmount,
        commission: stm.commission,
        date_sold: JSON.stringify(stm.date).slice(1, 11),
      };
    });

      /** unpaid commission from the last commmulative accounts record */
      const totalUnpaidCommission = (await this.accountModel.findOne({}).sort({ date: -1 })).total_commission_pending;

      const totalSaleValue = stmt.reduce(
      (acc, curr) => acc + curr.totalAmount,
      0,
    );

    const totalCommission = stmt.reduce(
      (acc, curr) => acc + curr.commission,
      0,
    );

    const data = {
      userName: stmt[0].agent['name'],
      userEmail: stmt[0].agent['email'],
      startDate: JSON.stringify(startDate).slice(1, 11),
      endDate: JSON.stringify(endDate).slice(1, 11),
      totalSaleValue: totalSaleValue,
      totalCommission: totalCommission,
      totalUnpaidCommission: totalUnpaidCommission,
      soldProducts: fStmtm,
    };

    this.mailService.sendSaleReport(data);

    return stmt;
  }

  @Cron('0 0 7 15 * *')
  async sendSalesReportsToAgents() {
    const users: User[] = await this.userModel.find({ role: 'agent' });
    const startDate = moment().startOf('month').toDate();
    const endDate =  new Date()

    for await (const user of users)
      await this.sendSalesReport(startDate, endDate, user);

  } 
}
