// // // import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
// // // import { CustomerService } from './customer.service';
// // // import { AddCustomerDto } from './dto/add-customer.dto';
// // // import { formatResponse } from '../common/utils/response-formatter';
// // // import {
// // //   ApiTags,
// // //   ApiOperation,
// // //   ApiResponse,
// // //   ApiParam,
// // //   ApiBody,
// // // } from '@nestjs/swagger';

// // // @ApiTags('customers')
// // // @Controller('api/v1/customers')
// // // export class CustomerController {
// // //   constructor(private customerService: CustomerService) {}

// // //   @Post()
// // //   @ApiOperation({ summary: 'Create a new customer' })
// // //   @ApiBody({ type: AddCustomerDto })
// // //   @ApiResponse({ status: 201, description: 'Customer created successfully' })
// // //   async addCustomer(@Body() addCustomerDto: AddCustomerDto) {
// // //     const result = await this.customerService.addCustomer(addCustomerDto);
// // //     return formatResponse(
// // //       result.return || result,
// // //       'Customer created successfully',
// // //     );
// // //   }

// // //   @Get(':custNo/services')
// // //   @ApiOperation({ summary: 'Get customer services' })
// // //   @ApiParam({ name: 'custNo', description: 'Customer number' })
// // //   @ApiResponse({
// // //     status: 200,
// // //     description: 'Customer services retrieved successfully',
// // //   })
// // //   async getCustomerServices(@Param('custNo') custNo: string) {
// // //     const result = await this.customerService.getServices(custNo);
// // //     return formatResponse(
// // //       result.return || result,
// // //       'Customer services retrieved successfully',
// // //     );
// // //   }

// // //   @Get(':custNo')
// // //   @ApiOperation({ summary: 'Get customer details' })
// // //   @ApiParam({ name: 'custNo', description: 'Customer number' })
// // //   @ApiResponse({
// // //     status: 200,
// // //     description: 'Customer details retrieved successfully',
// // //   })
// // //   async getCustomerDetails(@Param('custNo') custNo: string) {
// // //     const result = await this.customerService.getDetails(custNo);
// // //     return formatResponse(
// // //       result.return || result,
// // //       'Customer details retrieved successfully',
// // //     );
// // //   }

// // //   @Get(':custNo/balance')
// // //   @ApiOperation({ summary: 'Get customer balance' })
// // //   @ApiParam({ name: 'custNo', description: 'Customer number' })
// // //   @ApiResponse({
// // //     status: 200,
// // //     description: 'Customer balance retrieved successfully',
// // //   })
// // //   async getCustomerBalance(@Param('custNo') custNo: string) {
// // //     const result = await this.customerService.getBalance(custNo);
// // //     return formatResponse(
// // //       result.return || result,
// // //       'Customer balance retrieved successfully',
// // //     );
// // //   }

// // //   @Delete(':custNo')
// // //   @ApiOperation({ summary: 'Delete customer account' })
// // //   @ApiParam({ name: 'custNo', description: 'Customer number' })
// // //   @ApiResponse({
// // //     status: 200,
// // //     description: 'Customer account deleted successfully',
// // //   })
// // //   async deleteCustomer(@Param('custNo') custNo: string) {
// // //     const result = await this.customerService.deleteCustomer(custNo);
// // //     return formatResponse(
// // //       result.return || result,
// // //       'Customer account deleted successfully',
// // //     );
// // //   }
// // // }

// // // src/customer/customer.controller.ts
// // // import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
// // // import { CustomerService } from './customer.service';
// // // import { AddCustomerDto } from './dto/add-customer.dto';
// // // import { formatResponse } from '../common/utils/response-formatter';
// // // import {
// // //   ApiTags,
// // //   ApiOperation,
// // //   ApiResponse,
// // //   ApiParam,
// // //   ApiBody,
// // // } from '@nestjs/swagger';
// // // import { SoapResponse } from '../common/types/soap-response.type';

// // // @ApiTags('customers')
// // // @Controller('api/v1/customers')
// // // export class CustomerController {
// // //   constructor(private readonly customerService: CustomerService) {}

// // //   @Post()
// // //   @ApiOperation({ summary: 'Create a new customer' })
// // //   @ApiBody({ type: AddCustomerDto })
// // //   @ApiResponse({ status: 201, description: 'Customer created successfully' })
// // //   async addCustomer(@Body() dto: AddCustomerDto) {
// // //     const result: SoapResponse = await this.customerService.addCustomer(dto);
// // //     return formatResponse(
// // //       'return' in result ? result.return : result,
// // //       'Customer created successfully',
// // //     );
// // //   }

// // //   @Get(':custNo/services')
// // //   async getCustomerServices(@Param('custNo') custNo: string) {
// // //     const result: SoapResponse = await this.customerService.getServices(custNo);
// // //     return formatResponse(
// // //       'return' in result ? result.return : result,
// // //       'Customer services retrieved successfully',
// // //     );
// // //   }

// // //   @Get(':custNo')
// // //   async getCustomerDetails(@Param('custNo') custNo: string) {
// // //     const result: SoapResponse = await this.customerService.getDetails(custNo);
// // //     return formatResponse(
// // //       'return' in result ? result.return : result,
// // //       'Customer details retrieved successfully',
// // //     );
// // //   }

// // //   @Get(':custNo/balance')
// // //   async getCustomerBalance(@Param('custNo') custNo: string) {
// // //     const result: SoapResponse = await this.customerService.getBalance(custNo);
// // //     return formatResponse(
// // //       'return' in result ? result.return : result,
// // //       'Customer balance retrieved successfully',
// // //     );
// // //   }

// // //   @Delete(':custNo')
// // //   async deleteCustomer(@Param('custNo') custNo: string) {
// // //     const result: SoapResponse =
// // //       await this.customerService.deleteCustomer(custNo);
// // //     return formatResponse(
// // //       'return' in result ? result.return : result,
// // //       'Customer account deleted successfully',
// // //     );
// // //   }
// // // }

// // import {
// //   Controller,
// //   Post,
// //   Get,
// //   Delete,
// //   Param,
// //   Body,
// //   HttpCode,
// // } from '@nestjs/common';
// // import { CustomerService } from './customer.service';
// // import { AddCustomerDto } from './dto/add-customer.dto';
// // import { formatResponse } from '../common/utils/response-formatter';
// // import {
// //   ApiTags,
// //   ApiOperation,
// //   ApiResponse,
// //   ApiParam,
// //   ApiBody,
// //   ApiBearerAuth,
// // } from '@nestjs/swagger';
// // import { SoapResponse } from '../common/types/soap-response.type';

// // class AddCustomerSuccessResponse {
// //   return: {
// //     custNo: string;
// //   };
// // }

// // class CustomerDetailsResponse {
// //   return?: {
// //     dob?: string;
// //     firstName?: string;
// //     surname?: string;
// //     email?: string;
// //     phone?: string;
// //     address?: string;
// //     suburb?: string;
// //     state?: string;
// //     postcode?: string;
// //     // Add other fields as returned by SOAP
// //   };
// // }

// // class CustomerBalanceResponse {
// //   return?: {
// //     balance?: string;
// //   };
// // }

// // class CustomerServicesResponse {
// //   return?: {
// //     services?: Array<{
// //       serviceId?: string;
// //       serviceType?: string;
// //       status?: string;
// //       // Add more as needed
// //     }>;
// //   };
// // }

// // class DeleteCustomerSuccessResponse {
// //   return: {
// //     // Assuming SOAP returns some confirmation
// //     success?: boolean;
// //     message?: string;
// //   };
// // }

// // @ApiTags('customers')
// // @Controller('api/v1/customers')
// // export class CustomerController {
// //   constructor(private readonly customerService: CustomerService) {}

// //   @Post()
// //   @HttpCode(201)
// //   @ApiOperation({
// //     summary: 'Create a new customer',
// //     description:
// //       'Creates a new customer via SOAP API and stores minimal data locally.',
// //   })
// //   @ApiBody({
// //     type: AddCustomerDto,
// //     description: 'Customer data to create',
// //     examples: {
// //       example: {
// //         value: {
// //           customer: {
// //             address: '123 Example St',
// //             postcode: '3000',
// //             state: 'VIC',
// //             suburb: 'Melbourne',
// //             custType: 'R',
// //             email: 'john.doe@example.com',
// //             dob: '1985-06-15',
// //             dob_port: '1985-06-20',
// //             firstName: 'John',
// //             surname: 'Doe',
// //             phone: '0412345678',
// //             notes: 'New residential customer',
// //             preferredContactMethod: 'Email',
// //             sal: 'Mr',
// //             orderNotificationEmail: 'john.notify@example.com',
// //             custAuthorityType: 'PA',
// //             custAuthorityNo: '1212',
// //           },
// //         },
// //       },
// //     },
// //   })
// //   @ApiResponse({
// //     status: 201,
// //     description: 'Customer created successfully',
// //     schema: {
// //       example: formatResponse(
// //         { custNo: 'CUST123456' },
// //         'Customer created successfully',
// //       ),
// //     },
// //   })
// //   @ApiResponse({ status: 400, description: 'Invalid input or SOAP error' })
// //   async addCustomer(@Body() dto: AddCustomerDto) {
// //     const result: SoapResponse = await this.customerService.addCustomer(dto);
// //     return formatResponse(
// //       'return' in result ? result.return : result,
// //       'Customer created successfully',
// //     );
// //   }

// //   @Get(':custNo/services')
// //   @ApiOperation({
// //     summary: 'Get customer services',
// //     description: 'Retrieves all services linked to the customer via SOAP.',
// //   })
// //   @ApiParam({
// //     name: 'custNo',
// //     type: 'string',
// //     description: 'Unique customer number (e.g., CUST123456)',
// //     example: 'CUST123456',
// //   })
// //   @ApiResponse({
// //     status: 200,
// //     description: 'Customer services retrieved successfully',
// //     schema: {
// //       example: formatResponse(
// //         {
// //           services: [
// //             { serviceId: 'SVC001', serviceType: 'Internet', status: 'Active' },
// //             { serviceId: 'SVC002', serviceType: 'Phone', status: 'Active' },
// //           ],
// //         },
// //         'Customer services retrieved successfully',
// //       ),
// //     },
// //   })
// //   @ApiResponse({ status: 400, description: 'Customer number is required' })
// //   @ApiResponse({ status: 404, description: 'Customer not found' })
// //   async getCustomerServices(@Param('custNo') custNo: string) {
// //     const result: SoapResponse = await this.customerService.getServices(custNo);
// //     return formatResponse(
// //       'return' in result ? result.return : result,
// //       'Customer services retrieved successfully',
// //     );
// //   }

// //   @Get(':custNo')
// //   @ApiOperation({
// //     summary: 'Get customer details',
// //     description: 'Fetches full customer profile from SOAP service.',
// //   })
// //   @ApiParam({
// //     name: 'custNo',
// //     type: 'string',
// //     description: 'Unique customer number',
// //     example: 'CUST123456',
// //   })
// //   @ApiResponse({
// //     status: 200,
// //     description: 'Customer details retrieved successfully',
// //     schema: {
// //       example: formatResponse(
// //         {
// //           firstName: 'John',
// //           surname: 'Doe',
// //           email: 'john.doe@example.com',
// //           phone: '0412345678',
// //           dob: '1985-06-15',
// //           address: '123 Example St',
// //           suburb: 'Melbourne',
// //           state: 'VIC',
// //           postcode: '3000',
// //         },
// //         'Customer details retrieved successfully',
// //       ),
// //     },
// //   })
// //   @ApiResponse({ status: 400, description: 'Customer number required' })
// //   @ApiResponse({ status: 404, description: 'Customer not found' })
// //   async getCustomerDetails(@Param('custNo') custNo: string) {
// //     const result: SoapResponse = await this.customerService.getDetails(custNo);
// //     return formatResponse(
// //       'return' in result ? result.return : result,
// //       'Customer details retrieved successfully',
// //     );
// //   }

// //   @Get(':custNo/balance')
// //   @ApiOperation({
// //     summary: 'Get customer account balance',
// //     description: 'Retrieves current account balance via SOAP.',
// //   })
// //   @ApiParam({
// //     name: 'custNo',
// //     type: 'string',
// //     description: 'Unique customer number',
// //     example: 'CUST123456',
// //   })
// //   @ApiResponse({
// //     status: 200,
// //     description: 'Customer balance retrieved successfully',
// //     schema: {
// //       example: formatResponse(
// //         { balance: '125.50' },
// //         'Customer balance retrieved successfully',
// //       ),
// //     },
// //   })
// //   @ApiResponse({ status: 400, description: 'Customer number required' })
// //   @ApiResponse({ status: 404, description: 'Customer not found' })
// //   async getCustomerBalance(@Param('custNo') custNo: string) {
// //     const result: SoapResponse = await this.customerService.getBalance(custNo);
// //     return formatResponse(
// //       'return' in result ? result.return : result,
// //       'Customer balance retrieved successfully',
// //     );
// //   }

// //   @Delete(':custNo')
// //   @HttpCode(200)
// //   @ApiOperation({
// //     summary: 'Delete (disconnect) customer account',
// //     description:
// //       'Marks customer as "Disconnected" in SOAP system and removes local record.',
// //   })
// //   @ApiParam({
// //     name: 'custNo',
// //     type: 'string',
// //     description: 'Customer number to delete',
// //     example: 'CUST123456',
// //   })
// //   @ApiResponse({
// //     status: 200,
// //     description: 'Customer account deleted successfully',
// //     schema: {
// //       example: formatResponse(
// //         { success: true },
// //         'Customer account deleted successfully',
// //       ),
// //     },
// //   })
// //   @ApiResponse({ status: 400, description: 'Missing custNo or DOB' })
// //   @ApiResponse({ status: 404, description: 'Customer not found' })
// //   async deleteCustomer(@Param('custNo') custNo: string) {
// //     const result: SoapResponse =
// //       await this.customerService.deleteCustomer(custNo);

// //     return formatResponse(
// //       'return' in result ? result.return : result,
// //       'Customer account deleted successfully',
// //     );
// //   }
// // }
// import {
//   Controller,
//   Post,
//   Get,
//   Delete,
//   Param,
//   Body,
//   HttpCode,
// } from '@nestjs/common';
// import { CustomerService } from './customer.service';
// import { AddCustomerDto } from './dto/add-customer.dto';
// import { formatResponse } from '../common/utils/response-formatter';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiParam,
//   ApiBody,
//   ApiBearerAuth,
// } from '@nestjs/swagger';
// import { SoapResponse } from '../common/types/soap-response.type';

// class AddCustomerSuccessResponse {
//   return: {
//     custNo: string;
//   };
// }

// class CustomerDetailsResponse {
//   return?: {
//     dob?: string;
//     firstName?: string;
//     surname?: string;
//     email?: string;
//     phone?: string;
//     address?: string;
//     suburb?: string;
//     state?: string;
//     postcode?: string;
//     // Add other fields as returned by SOAP
//   };
// }

// class CustomerBalanceResponse {
//   return?: {
//     balance?: string;
//   };
// }

// class CustomerServicesResponse {
//   return?: {
//     services?: Array<{
//       serviceId?: string;
//       serviceType?: string;
//       status?: string;
//       // Add more as needed
//     }>;
//   };
// }

// class DeleteCustomerSuccessResponse {
//   return: {
//     // Assuming SOAP returns some confirmation
//     success?: boolean;
//     message?: string;
//   };
// }

// @ApiTags('customers')
// @Controller('api/v1/customers')
// export class CustomerController {
//   constructor(private readonly customerService: CustomerService) {}

//   @Post()
//   @HttpCode(201)
//   @ApiOperation({
//     summary: 'Create a new customer',
//     description:
//       'Creates a new customer via SOAP API and stores minimal data locally.',
//   })
//   @ApiBody({
//     type: AddCustomerDto,
//     description: 'Customer data to create',
//     examples: {
//       example: {
//         value: {
//           customer: {
//             address: '123 Example St',
//             postcode: '3000',
//             state: 'VIC',
//             suburb: 'Melbourne',
//             custType: 'R',
//             email: 'john.doe@example.com',
//             dob: '1985-06-15',
//             dob_port: '1985-06-20',
//             firstName: 'John',
//             surname: 'Doe',
//             phone: '0412345678',
//             notes: 'New residential customer',
//             preferredContactMethod: 'Email',
//             sal: 'Mr',
//             orderNotificationEmail: 'john.notify@example.com',
//             custAuthorityType: 'PA',
//             custAuthorityNo: '1212',
//           },
//         },
//       },
//     },
//   })
//   @ApiResponse({
//     status: 201,
//     description: 'Customer created successfully',
//     schema: {
//       example: formatResponse(
//         { custNo: 'CUST123456' },
//         'Customer created successfully',
//       ),
//     },
//   })
//   @ApiResponse({ status: 400, description: 'Invalid input or SOAP error' })
//   async addCustomer(@Body() dto: AddCustomerDto) {
//     const result: SoapResponse = await this.customerService.addCustomer(dto);
//     return formatResponse(
//       'return' in result ? result.return : result,
//       'Customer created successfully',
//     );
//   }

//   @Get(':custNo/services')
//   @ApiOperation({
//     summary: 'Get customer services',
//     description: 'Retrieves all services linked to the customer via SOAP.',
//   })
//   @ApiParam({
//     name: 'custNo',
//     type: 'string',
//     description: 'Unique customer number (e.g., CUST123456)',
//     example: 'CUST123456',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'Customer services retrieved successfully',
//     schema: {
//       example: formatResponse(
//         {
//           services: [
//             { serviceId: 'SVC001', serviceType: 'Internet', status: 'Active' },
//             { serviceId: 'SVC002', serviceType: 'Phone', status: 'Active' },
//           ],
//         },
//         'Customer services retrieved successfully',
//       ),
//     },
//   })
//   @ApiResponse({ status: 400, description: 'Customer number is required' })
//   @ApiResponse({ status: 404, description: 'Customer not found' })
//   async getCustomerServices(@Param('custNo') custNo: string) {
//     const result: SoapResponse = await this.customerService.getServices(custNo);
//     return formatResponse(
//       'return' in result ? result.return : result,
//       'Customer services retrieved successfully',
//     );
//   }

//   @Get(':custNo')
//   @ApiOperation({
//     summary: 'Get customer details',
//     description: 'Fetches full customer profile from SOAP service.',
//   })
//   @ApiParam({
//     name: 'custNo',
//     type: 'string',
//     description: 'Unique customer number',
//     example: 'CUST123456',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'Customer details retrieved successfully',
//     schema: {
//       example: formatResponse(
//         {
//           firstName: 'John',
//           surname: 'Doe',
//           email: 'john.doe@example.com',
//           phone: '0412345678',
//           dob: '1985-06-15',
//           address: '123 Example St',
//           suburb: 'Melbourne',
//           state: 'VIC',
//           postcode: '3000',
//         },
//         'Customer details retrieved successfully',
//       ),
//     },
//   })
//   @ApiResponse({ status: 400, description: 'Customer number required' })
//   @ApiResponse({ status: 404, description: 'Customer not found' })
//   async getCustomerDetails(@Param('custNo') custNo: string) {
//     const result: SoapResponse = await this.customerService.getDetails(custNo);
//     return formatResponse(
//       'return' in result ? result.return : result,
//       'Customer details retrieved successfully',
//     );
//   }

//   @Get(':custNo/balance')
//   @ApiOperation({
//     summary: 'Get customer account balance',
//     description: 'Retrieves current account balance via SOAP.',
//   })
//   @ApiParam({
//     name: 'custNo',
//     type: 'string',
//     description: 'Unique customer number',
//     example: 'CUST123456',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'Customer balance retrieved successfully',
//     schema: {
//       example: formatResponse(
//         { balance: '125.50' },
//         'Customer balance retrieved successfully',
//       ),
//     },
//   })
//   @ApiResponse({ status: 400, description: 'Customer number required' })
//   @ApiResponse({ status: 404, description: 'Customer not found' })
//   async getCustomerBalance(@Param('custNo') custNo: string) {
//     const result: SoapResponse = await this.customerService.getBalance(custNo);
//     return formatResponse(
//       'return' in result ? result.return : result,
//       'Customer balance retrieved successfully',
//     );
//   }

//   @Delete(':custNo')
//   @HttpCode(200)
//   @ApiOperation({
//     summary: 'Delete (disconnect) customer account',
//     description:
//       'Marks customer as "Disconnected" in SOAP system and removes local record.',
//   })
//   @ApiParam({
//     name: 'custNo',
//     type: 'string',
//     description: 'Customer number to delete',
//     example: 'CUST123456',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'Customer account deleted successfully',
//     schema: {
//       example: formatResponse(
//         { success: true },
//         'Customer account deleted successfully',
//       ),
//     },
//   })
//   @ApiResponse({ status: 400, description: 'Missing custNo or DOB' })
//   @ApiResponse({ status: 404, description: 'Customer not found' })
//   async deleteCustomer(@Param('custNo') custNo: string) {
//     const result: SoapResponse =
//       await this.customerService.deleteCustomer(custNo);

//     return formatResponse(
//       'return' in result ? result.return : result,
//       'Customer account deleted successfully',
//     );
//   }
// }

import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
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
import { ApiQuery } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import { AppError } from 'src/common/errors/app-error';
interface UnbilledCallSummary {
  csn?: string;
  department?: string;
  groupName?: string;
  groupNo?: string;
  lineseqno?: string;
  name?: string;
  totalCalls?: string;
  totalCharge?: string;
  totalOther?: string;
  totalVSPCost?: string;
}

interface UnbilledCallsSummaryResponse {
  calls?: UnbilledCallSummary[];
}
@ApiTags('customers')
@Controller('api/v1/customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: 'Create a new customer',
    description:
      'Creates a new customer via SOAP API and stores minimal data locally.',
  })
  @ApiBody({
    type: AddCustomerDto,
    description: 'Customer data to create',
    examples: {
      example: {
        value: {
          customer: {
            address: '123 Example St',
            postcode: '3000',
            state: 'VIC',
            suburb: 'Melbourne',
            custType: 'R',
            email: 'john.doe@example.com',
            dob: '1985-06-15',
            dob_port: '1985-06-20',
            firstName: 'John',
            surname: 'Doe',
            phone: '0412345678',
            notes: 'New residential customer',
            preferredContactMethod: 'Email',
            sal: 'Mr',
            orderNotificationEmail: 'john.notify@example.com',
            custAuthorityType: 'PA',
            custAuthorityNo: '1212',
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Customer created successfully',
    schema: {
      example: formatResponse(
        { custNo: 'CUST123456' },
        'Customer created successfully',
      ),
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input or SOAP error' })
  async addCustomer(@Body() dto: AddCustomerDto) {
    const result: SoapResponse = await this.customerService.addCustomer(dto);
    return formatResponse(
      'return' in result ? result.return : result,
      'Customer created successfully',
    );
  }

  @Get(':custNo/services')
  @ApiOperation({
    summary: 'Get customer services',
    description: 'Retrieves all services linked to the customer via SOAP.',
  })
  @ApiParam({
    name: 'custNo',
    type: 'string',
    description: 'Unique customer number (e.g., CUST123456)',
    example: 'CUST123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer services retrieved successfully',
    schema: {
      example: formatResponse(
        {
          services: [
            { serviceId: 'SVC001', serviceType: 'Internet', status: 'Active' },
            { serviceId: 'SVC002', serviceType: 'Phone', status: 'Active' },
          ],
        },
        'Customer services retrieved successfully',
      ),
    },
  })
  @ApiResponse({ status: 400, description: 'Customer number is required' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async getCustomerServices(@Param('custNo') custNo: string) {
    const result: SoapResponse = await this.customerService.getServices(custNo);
    return formatResponse(
      'return' in result ? result.return : result,
      'Customer services retrieved successfully',
    );
  }

  @Get(':custNo')
  @ApiOperation({
    summary: 'Get customer details',
    description: 'Fetches full customer profile from SOAP service.',
  })
  @ApiParam({
    name: 'custNo',
    type: 'string',
    description: 'Unique customer number',
    example: 'CUST123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer details retrieved successfully',
    schema: {
      example: formatResponse(
        {
          firstName: 'John',
          surname: 'Doe',
          email: 'john.doe@example.com',
          phone: '0412345678',
          dob: '1985-06-15',
          address: '123 Example St',
          suburb: 'Melbourne',
          state: 'VIC',
          postcode: '3000',
        },
        'Customer details retrieved successfully',
      ),
    },
  })
  @ApiResponse({ status: 400, description: 'Customer number required' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async getCustomerDetails(@Param('custNo') custNo: string) {
    const result: SoapResponse = await this.customerService.getDetails(custNo);
    return formatResponse(
      'return' in result ? result.return : result,
      'Customer details retrieved successfully',
    );
  }

  @Get(':custNo/balance')
  @ApiOperation({
    summary: 'Get customer account balance',
    description: 'Retrieves current account balance via SOAP.',
  })
  @ApiParam({
    name: 'custNo',
    type: 'string',
    description: 'Unique customer number',
    example: 'CUST123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer balance retrieved successfully',
    schema: {
      example: formatResponse(
        { balance: '125.50' },
        'Customer balance retrieved successfully',
      ),
    },
  })
  @ApiResponse({ status: 400, description: 'Customer number required' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async getCustomerBalance(@Param('custNo') custNo: string) {
    const result: SoapResponse = await this.customerService.getBalance(custNo);
    return formatResponse(
      'return' in result ? result.return : result,
      'Customer balance retrieved successfully',
    );
  }
  @Get(':custNo/balance/mobile')
  @ApiOperation({
    summary: 'Get mobile service allowances (raw UtbMobile response)',
    description: 'Returns exact queryBalance response from UtbMobile',
  })
  @ApiParam({ name: 'custNo', example: 'CUST123456' })
  @ApiQuery({ name: 'lineSeqNo', required: false, example: '1' })
  @ApiResponse({
    status: 200,
    description: 'Raw mobile balance from UtbMobile',
  })
  async getMobileBalance(
    @Param('custNo') custNo: string,
    @Query('lineSeqNo') lineSeqNo?: string,
  ) {
    const result = await this.customerService.getMobileBalance(
      custNo,
      lineSeqNo,
    );

    const payload = 'return' in result ? result.return : result;

    return formatResponse(payload, 'Mobile balance retrieved successfully');
  }

  @Get(':custNo/unbilled-summary')
  @ApiOperation({
    summary: 'Get unbilled calls summary (raw UtbCall response)',
    description: 'Returns exact getUnbilledCallsSummary response from UtbCall',
  })
  @ApiParam({ name: 'custNo', example: 'CUST351128' })
  @ApiResponse({
    status: 200,
    description: 'Raw unbilled summary from UtbCall',
  })
  async getUnbilledCallsSummary(@Param('custNo') custNo: string) {
    const result = await this.customerService.getUnbilledCallsSummary(custNo);

    const payload = 'return' in result ? result.return : result;

    return formatResponse(
      payload,
      'Unbilled calls summary retrieved successfully',
    );
  }
  @Get(':custNo/unbilled-detail')
  @ApiOperation({
    summary: 'Get detailed unbilled calls (raw UtbCall response)',
    description: 'Returns exact getUnbilledCallsDetail response from UtbCall',
  })
  @ApiParam({ name: 'custNo', example: 'CUST351128' })
  @ApiQuery({ name: 'csn', required: true, example: '9000000001' })
  @ApiResponse({ status: 200, description: 'Raw unbilled detail from UtbCall' })
  async getUnbilledCallsDetail(
    @Param('custNo') custNo: string,
    @Query('csn') csn: string,
  ) {
    const result = await this.customerService.getUnbilledCallsDetail(
      custNo,
      csn,
    );

    const payload = 'return' in result ? result.return : result;

    return formatResponse(
      payload,
      'Unbilled call details retrieved successfully',
    );
  }
  @Delete(':custNo')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Delete (disconnect) customer account',
    description:
      'Marks customer as "Disconnected" in SOAP system and removes local record.',
  })
  @ApiParam({
    name: 'custNo',
    type: 'string',
    description: 'Customer number to delete',
    example: 'CUST123456',
  })
  @ApiResponse({
    status: 200,
    description: 'Customer account deleted successfully',
    schema: {
      example: formatResponse(
        { success: true },
        'Customer account deleted successfully',
      ),
    },
  })
  @ApiResponse({ status: 400, description: 'Missing custNo or DOB' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async deleteCustomer(@Param('custNo') custNo: string) {
    const result: SoapResponse =
      await this.customerService.deleteCustomer(custNo);

    return formatResponse(
      'return' in result ? result.return : result,
      'Customer account deleted successfully',
    );
  }
  // customer.controller.ts (add this method)

@Get(':custNo/orders')
@ApiOperation({
  summary: 'Get all orders for a customer',
  description: 'Retrieves all activation/port-in/plan change orders linked to a customer.',
})
@ApiParam({
  name: 'custNo',
  type: 'string',
  description: 'Customer number (e.g., CUST123456)',
  example: 'CUST123456',
})
@ApiResponse({
  status: 200,
  description: 'List of orders retrieved successfully',
  schema: {
    example: formatResponse(
      [
        {
          orderId: 'ORD-2025-0001',
          custNo: 'CUST123456',
          msn: '61400123456',
          planNo: 'PLAN123',
          orderType: 'NEW_ACTIVATION',
          orderAction: 'ADD_WME_NEW',
          status: 'COMPLETED',
          createdAt: '2025-04-15T10:30:00.000Z',
          isEsim: true,
          simNo: '8944100030123456789',
        },
        // ... more orders
      ],
      'Orders retrieved successfully',
    ),
  },
})
@ApiResponse({ status: 404, description: 'Customer not found or no orders' })
async getCustomerOrders(@Param('custNo') custNo: string) {
  const orders = await this.customerService.getOrdersByCustomer(custNo);
  return formatResponse(orders, 'Orders retrieved successfully');
}
}
