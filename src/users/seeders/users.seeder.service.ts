import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { User } from 'src/schemas/user.schema';
import { Commission } from 'src/schemas/commission.schema';
@Injectable()
export class UsersSeedService {
  private readonly logger = new Logger(UsersSeedService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Commission.name) private commissionModel: Model<Commission>,
  ) {}

  async seed() {
    const exists = await this.userModel
      .findOne({
        email: 'admin@incourage.com',
      })
      .exec();

    if (exists) return this.logger.log(`Users seed data in sync ✔`);

    /** data not in db seed the users data */
    const users = [
      {
        name: 'Admin',
        email: 'admin@incourage.com',
        password: 'password123',
        role: 'admin',
      },
      {
        name: 'marvin espira',
        email: 'espira@example.com',
        password: 'password1234',
        role: 'agent',
      },
    ];

    for (const user of users) {
      const hashedPassword = await hash(user.password, 10);
      user.password = hashedPassword;
      const createdUser = new this.userModel(user);
      await createdUser.save();
    }
  }

  async seedCommission() {
    /** seeed commission rate for the agents */
    const commissionExists = await this.commissionModel.findOne({});

    if (commissionExists)
      return this.logger.log(`Commission seed data in sync ✔`);

    const commissionData = {
      commission: 3,
      valid: true,
      created_date: new Date(),
    };

    const commission = new this.commissionModel(commissionData);
    await commission.save();
  }
}
