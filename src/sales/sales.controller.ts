import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { NewSaleDto } from './dto/new-sale.dto';
import { error } from 'console';
import { AuthGuard } from 'src/auth/guards';
import { GetUserData } from 'src/auth/decorator/get-user.decorator';

@UseGuards(AuthGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  /** record new sale */
  @Post()
  recordNewSale(
    @Body(new ValidationPipe()) body: NewSaleDto,
    @GetUserData('_id') userId: string,
  ) {
    try {
      return this.salesService.recordNewSale(body, userId);
    } catch (err) {
      throw new error(err);
    }
  }
}
