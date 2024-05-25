import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersSeedService {
  private readonly logger = new Logger(UsersSeedService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async seed() {
    const exists = await this.userModel
      .findOne({
        email: 'admin@incourage.com',
      })
      .exec();

    if (exists) return this.logger.log(`Seed data in sync`);

    /** data not in db seed the users data */
    const users = [
      {
        name: 'Admin',
        email: 'admin@incourage.com',
        password: 'password123',
        role: 'admin',
        date: new Date(),
      },
      {
        name: 'marvin espira',
        email: 'espira@example.com',
        password: 'password1234',
        role: 'agent',
        date: new Date(),
      },
    ];

    for (const user of users) {
      const hashedPassword = await hash(user.password, 10);
      user.password = hashedPassword;
      const createdUser = new this.userModel(user);
      await createdUser.save();
    }
    this.logger.log(`Users data seeded successfully`);
  }
}
