import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { formatResponse } from '../common/utils/response-formatter';
import { ActivateNumberDto } from './dto/activate-number.dto';
import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('orders')
@Controller('api/v1/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order details' })
  @ApiParam({ name: 'orderId', description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
  async getOrder(@Param('orderId') orderId: string) {
    const result = await this.orderService.queryOrder(orderId);
    return formatResponse(
      result.return || result,
      'Order retrieved successfully',
    );
  }

  @Post('activate')
  @ApiOperation({ summary: 'Activate a number' })
  @ApiBody({ type: ActivateNumberDto })
  @ApiResponse({ status: 200, description: 'Number activated successfully' })
  async activateNumber(@Body() activateNumberDto: ActivateNumberDto) {
    const result = await this.orderService.activateNumber(activateNumberDto);
    return formatResponse(
      result.return || result,
      'Number activated successfully',
    );
  }

  @Post('activate/port')
  @ApiOperation({ summary: 'Activate a ported number' })
  @ApiBody({ type: ActivatePortNumberDto })
  @ApiResponse({
    status: 200,
    description: 'Ported number activated successfully',
  })
  async activatePortNumber(
    @Body() activatePortNumberDto: ActivatePortNumberDto,
  ) {
    const result = await this.orderService.activatePortNumber(
      activatePortNumberDto,
    );
    return formatResponse(
      result.return || result,
      'Ported number activated successfully',
    );
  }

  @Patch(':custNo/plan')
  @ApiOperation({ summary: 'Update customer plan' })
  @ApiParam({ name: 'custNo', description: 'Customer number' })
  @ApiBody({ type: UpdatePlanDto })
  @ApiResponse({ status: 200, description: 'Plan updated successfully' })
  async updatePlan(
    @Param('custNo') custNo: string,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    const result = await this.orderService.updatePlan(updatePlanDto, custNo);
    return formatResponse(result.return || result, 'Plan updated successfully');
  }

  @Get('plans')
  @ApiOperation({ summary: 'Get all available plans' })
  @ApiResponse({ status: 200, description: 'Plans retrieved successfully' })
  async getPlans() {
    const result = await this.orderService.getPlans();
    return formatResponse(
      result.return || result,
      'Plans retrieved successfully',
    );
  }
}
