import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { NewSaleDto } from './dto/new-sale.dto';
import { error } from 'console';
import { AuthGuard } from 'src/auth/guards';
import { GetUserData } from 'src/auth/decorator/get-user.decorator';
import { DateCastPipe } from 'src/utils/casts';

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

  /** list individual sales of an agent*/
  @Get('individual')
  getIndividualSales(
    @Query('startDate', DateCastPipe) startDate: Date,
    @Query('endDate', DateCastPipe) endDate: Date,
    @GetUserData('_id') userId?: string,
  ) {
    try {
      return this.salesService.getAllSales(startDate, endDate, userId);
    } catch (err) {
      throw new Error(err);
    }
  }

  /** logged in agent sales */
  @Get('statements')
  getAgentSales(
    @Query('startDate', DateCastPipe) startDate?: Date,
    @Query('endDate', DateCastPipe) endDate?: Date,
    @GetUserData('_id') userId?: string,
  ) {
    try {
      return this.salesService.getAgentSalesReport(startDate, endDate, userId);
    } catch (err) {
      throw new Error(err);
    }
  }

  /** list all sales by all agents */
  @Get()
  getAllSales(
    @Query('startDate', DateCastPipe) startDate?: Date,
    @Query('endDate', DateCastPipe) endDate?: Date,
  ) {
    try {
      return this.salesService.getAllSales(startDate, endDate);
    } catch (err) {
      throw new Error(err);
    }
  }
}
