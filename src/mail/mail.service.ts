import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
// import { User } from './../user/user.entity';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private mailerService: MailerService) {}

  async sendSaleReport(data) {
    await this.mailerService.sendMail({
      to: data.userEmail,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Statement of sales and commission earned!',
      template: './index', // `.hbs` extension is appended automatically
      context: {
        user_name: data.userName,
        start_date: data.startDate,
        end_date: data.endDate,
        total_products_sale: data.totalSaleValue,
        total_commission: data.totalCommission,
        total_unpaid_commission: data.totalUnpaidCommission,
        products: data.soldProducts,
      },
    });

    this.logger.log(`MAIL SENT!!`);
  }
}
