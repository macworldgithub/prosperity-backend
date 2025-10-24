// import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
// import { CustomerService } from './customer.service';
// import { AddCustomerDto } from './dto/add-customer.dto';
// import { formatResponse } from '../common/utils/response-formatter';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiParam,
//   ApiBody,
// } from '@nestjs/swagger';

// @ApiTags('customers')
// @Controller('api/v1/customers')
// export class CustomerController {
//   constructor(private customerService: CustomerService) {}

//   @Post()
//   @ApiOperation({ summary: 'Create a new customer' })
//   @ApiBody({ type: AddCustomerDto })
//   @ApiResponse({ status: 201, description: 'Customer created successfully' })
//   async addCustomer(@Body() addCustomerDto: AddCustomerDto) {
//     const result = await this.customerService.addCustomer(addCustomerDto);
//     return formatResponse(
//       result.return || result,
//       'Customer created successfully',
//     );
//   }

//   @Get(':custNo/services')
//   @ApiOperation({ summary: 'Get customer services' })
//   @ApiParam({ name: 'custNo', description: 'Customer number' })
//   @ApiResponse({
//     status: 200,
//     description: 'Customer services retrieved successfully',
//   })
//   async getCustomerServices(@Param('custNo') custNo: string) {
//     const result = await this.customerService.getServices(custNo);
//     return formatResponse(
//       result.return || result,
//       'Customer services retrieved successfully',
//     );
//   }

//   @Get(':custNo')
//   @ApiOperation({ summary: 'Get customer details' })
//   @ApiParam({ name: 'custNo', description: 'Customer number' })
//   @ApiResponse({
//     status: 200,
//     description: 'Customer details retrieved successfully',
//   })
//   async getCustomerDetails(@Param('custNo') custNo: string) {
//     const result = await this.customerService.getDetails(custNo);
//     return formatResponse(
//       result.return || result,
//       'Customer details retrieved successfully',
//     );
//   }

//   @Get(':custNo/balance')
//   @ApiOperation({ summary: 'Get customer balance' })
//   @ApiParam({ name: 'custNo', description: 'Customer number' })
//   @ApiResponse({
//     status: 200,
//     description: 'Customer balance retrieved successfully',
//   })
//   async getCustomerBalance(@Param('custNo') custNo: string) {
//     const result = await this.customerService.getBalance(custNo);
//     return formatResponse(
//       result.return || result,
//       'Customer balance retrieved successfully',
//     );
//   }

//   @Delete(':custNo')
//   @ApiOperation({ summary: 'Delete customer account' })
//   @ApiParam({ name: 'custNo', description: 'Customer number' })
//   @ApiResponse({
//     status: 200,
//     description: 'Customer account deleted successfully',
//   })
//   async deleteCustomer(@Param('custNo') custNo: string) {
//     const result = await this.customerService.deleteCustomer(custNo);
//     return formatResponse(
//       result.return || result,
//       'Customer account deleted successfully',
//     );
//   }
// }

// src/customer/customer.controller.ts
import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AddCustomerDto } from './dto/add-customer.dto';
import { formatResponse } from '../common/utils/response-formatter';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { SoapResponse } from '../common/types/soap-response.type';

@ApiTags('customers')
@Controller('api/v1/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiBody({ type: AddCustomerDto })
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  async addCustomer(@Body() dto: AddCustomerDto) {
    const result: SoapResponse = await this.customerService.addCustomer(dto);
    return formatResponse(
      'return' in result ? result.return : result,
      'Customer created successfully',
    );
  }

  @Get(':custNo/services')
  async getCustomerServices(@Param('custNo') custNo: string) {
    const result: SoapResponse = await this.customerService.getServices(custNo);
    return formatResponse(
      'return' in result ? result.return : result,
      'Customer services retrieved successfully',
    );
  }

  @Get(':custNo')
  async getCustomerDetails(@Param('custNo') custNo: string) {
    const result: SoapResponse = await this.customerService.getDetails(custNo);
    return formatResponse(
      'return' in result ? result.return : result,
      'Customer details retrieved successfully',
    );
  }

  @Get(':custNo/balance')
  async getCustomerBalance(@Param('custNo') custNo: string) {
    const result: SoapResponse = await this.customerService.getBalance(custNo);
    return formatResponse(
      'return' in result ? result.return : result,
      'Customer balance retrieved successfully',
    );
  }

  @Delete(':custNo')
  async deleteCustomer(@Param('custNo') custNo: string) {
    const result: SoapResponse =
      await this.customerService.deleteCustomer(custNo);
    return formatResponse(
      'return' in result ? result.return : result,
      'Customer account deleted successfully',
    );
  }
}
