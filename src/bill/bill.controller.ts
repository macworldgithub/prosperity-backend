import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillDto } from './dto/bill.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { Request } from '@nestjs/common';
@ApiTags('bill')
@Controller('bill')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BillController {
  constructor(private billService: BillService) {}

  @Get()
  @ApiOperation({ summary: 'Get bill for the authenticated user' })
  @ApiResponse({ status: 200, description: 'Bill details for the user', type: Object })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
  @ApiResponse({ status: 404, description: 'Bill not found for the user' })
  async getBill(@Req() req) {
    const bill = await this.billService.findByUserId(req.user.userId);
    if (!bill) {
      return { message: 'Bill not found' };
    }
    return bill;
  }

   @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new bill for the authenticated user' })
  @ApiBody({ type: BillDto })
  @ApiResponse({ status: 201, description: 'Bill created successfully', type: Object })
  @ApiResponse({ status: 400, description: 'Invalid bill data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
  async create(@Request() req, @Body() billDto: BillDto) {
    const bill = await this.billService.create(req.user.userId, billDto);
    return { message: 'Bill created', billId: bill._id.toString() };
  }
}