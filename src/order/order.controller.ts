// import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
// import { OrderService } from './order.service';
// import { formatResponse } from '../common/utils/response-formatter';
// import { ActivateNumberDto } from './dto/activate-number.dto';
// import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
// import { UpdatePlanDto } from './dto/update-plan.dto';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiParam,
//   ApiBody,
// } from '@nestjs/swagger';

// @ApiTags('orders')
// @Controller('api/v1/orders')
// export class OrderController {
//   constructor(private orderService: OrderService) {}

//   @Get(':orderId')
//   @ApiOperation({ summary: 'Get order details' })
//   @ApiParam({ name: 'orderId', description: 'Order ID' })
//   @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
//   async getOrder(@Param('orderId') orderId: string) {
//     const result = await this.orderService.queryOrder(orderId);
//     return formatResponse(
//       result.return || result,
//       'Order retrieved successfully',
//     );
//   }

//   @Post('activate')
//   @ApiOperation({ summary: 'Activate a number' })
//   @ApiBody({ type: ActivateNumberDto })
//   @ApiResponse({ status: 200, description: 'Number activated successfully' })
//   async activateNumber(@Body() activateNumberDto: ActivateNumberDto) {
//     const result = await this.orderService.activateNumber(activateNumberDto);
//     return formatResponse(
//       result.return || result,
//       'Number activated successfully',
//     );
//   }

//   @Post('activate/port')
//   @ApiOperation({ summary: 'Activate a ported number' })
//   @ApiBody({ type: ActivatePortNumberDto })
//   @ApiResponse({
//     status: 200,
//     description: 'Ported number activated successfully',
//   })
//   async activatePortNumber(
//     @Body() activatePortNumberDto: ActivatePortNumberDto,
//   ) {
//     const result = await this.orderService.activatePortNumber(
//       activatePortNumberDto,
//     );
//     return formatResponse(
//       result.return || result,
//       'Ported number activated successfully',
//     );
//   }

//   @Patch(':custNo/plan')
//   @ApiOperation({ summary: 'Update customer plan' })
//   @ApiParam({ name: 'custNo', description: 'Customer number' })
//   @ApiBody({ type: UpdatePlanDto })
//   @ApiResponse({ status: 200, description: 'Plan updated successfully' })
//   async updatePlan(
//     @Param('custNo') custNo: string,
//     @Body() updatePlanDto: UpdatePlanDto,
//   ) {
//     const result = await this.orderService.updatePlan(updatePlanDto, custNo);
//     return formatResponse(result.return || result, 'Plan updated successfully');
//   }

//   @Get('plans')
//   @ApiOperation({ summary: 'Get all available plans' })
//   @ApiResponse({ status: 200, description: 'Plans retrieved successfully' })
//   async getPlans() {
//     const result = await this.orderService.getPlans();
//     return formatResponse(
//       result.return || result,
//       'Plans retrieved successfully',
//     );
//   }
// }

// import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
// import { OrderService } from './order.service';
// import { formatResponse } from '../common/utils/response-formatter';
// import { ActivateNumberDto } from './dto/activate-number.dto';
// import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
// import { UpdatePlanDto } from './dto/update-plan.dto';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiParam,
//   ApiBody,
// } from '@nestjs/swagger';
// import { SoapResponse } from '../common/types/soap-response.type';

// @ApiTags('orders')
// @Controller('api/v1/orders')
// export class OrderController {
//   constructor(private orderService: OrderService) {}

//   @Get(':orderId')
//   @ApiOperation({ summary: 'Get order details' })
//   @ApiParam({ name: 'orderId', description: 'Order ID' })
//   @ApiResponse({ status: 200, description: 'Order retrieved successfully' })
//   async getOrder(@Param('orderId') orderId: string) {
//     const result: SoapResponse = await this.orderService.queryOrder(orderId);
//     return formatResponse(
//       'return' in result ? result.return : result,
//       'Order retrieved successfully',
//     );
//   }

//   @Post('activate')
//   @ApiOperation({ summary: 'Activate a number' })
//   @ApiBody({ type: ActivateNumberDto })
//   @ApiResponse({ status: 200, description: 'Number activated successfully' })
//   async activateNumber(@Body() dto: ActivateNumberDto) {
//     const result: SoapResponse = await this.orderService.activateNumber(dto);
//     return formatResponse(
//       'return' in result ? result.return : result,
//       'Number activated successfully',
//     );
//   }

//   @Post('activate/port')
//   @ApiOperation({ summary: 'Activate a ported number' })
//   @ApiBody({ type: ActivatePortNumberDto })
//   @ApiResponse({
//     status: 200,
//     description: 'Ported number activated successfully',
//   })
//   async activatePortNumber(@Body() dto: ActivatePortNumberDto) {
//     const result: SoapResponse =
//       await this.orderService.activatePortNumber(dto);
//     return formatResponse(
//       'return' in result ? result.return : result,
//       'Ported number activated successfully',
//     );
//   }

//   @Patch(':custNo/plan')
//   @ApiOperation({ summary: 'Update customer plan' })
//   @ApiParam({ name: 'custNo', description: 'Customer number' })
//   @ApiBody({ type: UpdatePlanDto })
//   @ApiResponse({ status: 200, description: 'Plan updated successfully' })
//   async updatePlan(
//     @Param('custNo') custNo: string,
//     @Body() dto: UpdatePlanDto,
//   ) {
//     const result: SoapResponse = await this.orderService.updatePlan(
//       dto,
//       custNo,
//     );
//     return formatResponse(
//       'return' in result ? result.return : result,
//       'Plan updated successfully',
//     );
//   }

//   @Get('plans')
//   @ApiOperation({ summary: 'Get all available plans' })
//   @ApiResponse({ status: 200, description: 'Plans retrieved successfully' })
//   async getPlans() {
//     const result: SoapResponse = await this.orderService.getPlans();
//     return formatResponse(
//       'return' in result ? result.return : result,
//       'Plans retrieved successfully',
//     );
//   }
// }
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
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
import { ApiProperty } from '@nestjs/swagger';

// ---------------------------------------------------------------
// Generic success response schema
// ---------------------------------------------------------------
class ApiSuccessResponse<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Operation successful' })
  message: string;

  @ApiProperty()
  data: T;
}

// ---------------------------------------------------------------
// Controller
// ---------------------------------------------------------------
@ApiTags('Orders')
@Controller('api/v1/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // -----------------------------------------------------------------
  // 1. GET /api/v1/orders/plans   (static)
  // -----------------------------------------------------------------
  @Get('plans')
  @ApiOperation({ summary: 'Get all available plans' })
  @ApiResponse({
    status: 200,
    description: 'Plans retrieved',
    content: {
      'application/json': {
        example: {
          success: true,
          message: 'Plans retrieved successfully',
          data: {
            return: {
              plans: [
                {
                  planNo: 'PLAN001',
                  planName: 'SimplyBig Unlimited',
                  price: 49.99,
                },
                { planNo: 'PLAN002', planName: 'Lite Plan', price: 29.99 },
              ],
            },
          },
        },
      },
    },
  })
  async getPlans() {
    const result = await this.orderService.getPlans();
    return formatResponse(
      'return' in result ? result.return : result,
      'Plans retrieved successfully',
    );
  }

  // -----------------------------------------------------------------
  // 2. POST /api/v1/orders/activate   (static)
  // -----------------------------------------------------------------
  @Post('activate')
  @HttpCode(200)
  @ApiOperation({ summary: 'Activate a new mobile number' })
  @ApiBody({ type: ActivateNumberDto })
  @ApiResponse({
    status: 200,
    description: 'Number activated',
    content: {
      'application/json': { example: ActivateNumberDto.ResponseExample },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async activateNumber(@Body() dto: ActivateNumberDto) {
    const result = await this.orderService.activateNumber(dto);
    return formatResponse(
      'return' in result ? result.return : result,
      'Number activated successfully',
    );
  }

  // -----------------------------------------------------------------
  // 3. POST /api/v1/orders/activate/port   (static)
  // -----------------------------------------------------------------
  @Post('activate/port')
  @HttpCode(200)
  @ApiOperation({ summary: 'Activate a ported number' })
  @ApiBody({ type: ActivatePortNumberDto })
  @ApiResponse({
    status: 200,
    description: 'Ported number activated',
    content: {
      'application/json': { example: ActivatePortNumberDto.ResponseExample },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid port request' })
  async activatePortNumber(@Body() dto: ActivatePortNumberDto) {
    const result = await this.orderService.activatePortNumber(dto);
    return formatResponse(
      'return' in result ? result.return : result,
      'Ported number activated successfully',
    );
  }

  // -----------------------------------------------------------------
  // 4. PATCH /api/v1/orders/:custNo/plan   (dynamic – custNo)
  // -----------------------------------------------------------------
  @Patch(':custNo/plan')
  @ApiOperation({ summary: 'Update customer plan' })
  @ApiParam({ name: 'custNo', example: 'CUST12345' })
  @ApiBody({ type: UpdatePlanDto })
  @ApiResponse({
    status: 200,
    description: 'Plan updated',
    content: {
      'application/json': { example: UpdatePlanDto.ResponseExample },
    },
  })
  async updatePlan(
    @Param('custNo') custNo: string,
    @Body() dto: UpdatePlanDto,
  ) {
    const result = await this.orderService.updatePlan(dto, custNo);
    return formatResponse(
      'return' in result ? result.return : result,
      'Plan updated successfully',
    );
  }

  // -----------------------------------------------------------------
  // 5. GET /api/v1/orders/:orderId   (dynamic – orderId)  <-- last
  // -----------------------------------------------------------------
  @Get(':orderId')
  @ApiOperation({ summary: 'Get order details by ID' })
  @ApiParam({ name: 'orderId', example: 'ORD123456' })
  @ApiResponse({
    status: 200,
    description: 'Order retrieved',
    content: {
      'application/json': {
        example: {
          success: true,
          message: 'Order retrieved successfully',
          data: { return: { status: 'COMPLETED' } },
        },
      },
    },
  })
  async getOrder(@Param('orderId') orderId: string) {
    const result = await this.orderService.queryOrder(orderId);
    return formatResponse(
      'return' in result ? result.return : result,
      'Order retrieved successfully',
    );
  }
}
