// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Customer } from '../schemas/customer.schema';
// import { ApiClientService } from '../api-client/api-client.service';
// import { AppError } from '../common/errors/app-error';
// import { AddCustomerDto } from './dto/add-customer.dto';

// @Injectable()
// export class CustomerService {
//   constructor(
//     private apiClient: ApiClientService,
//     @InjectModel('Customer') private customerModel: Model<Customer>,
//   ) {}

//   async addCustomer(addCustomerDto: AddCustomerDto) {
//     const response = await this.apiClient.soapCall(
//       '/UtbCustomer',
//       {
//         customer: {
//           ...addCustomerDto.customer,
//           preferredContactMethod: 'EMAIL',
//           orderNotificationEmail: addCustomerDto.customer.email,
//           internetAccess: 'Y',
//           company:
//             addCustomerDto.customer.firstName + addCustomerDto.customer.surname,
//         },
//       },
//       'addCustomer',
//     );

//     if (response.error) {
//       throw new AppError(
//         response.error.message || 'Failed to add customer',
//         400,
//       );
//     }

//     // Store in local DB
//     await this.customerModel.create({
//       custNo: response.return.custNo,
//       ...addCustomerDto.customer,
//     });

//     return response;
//   }

//   async getServices(custNo: string) {
//     if (!custNo) throw new AppError('Customer number is required', 400);
//     return await this.apiClient.soapCall(
//       '/UtbServices',
//       { custNo },
//       'getServices',
//     );
//   }

//   async getDetails(custNo: string) {
//     if (!custNo) throw new AppError('Customer number is required', 400);
//     return await this.apiClient.soapCall(
//       '/UtbCustomer',
//       { customer: { custNo } },
//       'getCustomer',
//     );
//   }

//   async getBalance(custNo: string) {
//     if (!custNo) throw new AppError('Customer number is required', 400);
//     return await this.apiClient.soapCall(
//       '/UtbCustomer',
//       { customer: { custNo } },
//       'getCurrBalance',
//     );
//   }

//   private async deleteAccount(custNo: string, dob: string) {
//     if (!custNo || !dob)
//       throw new AppError('Customer number and date of birth are required', 400);
//     return await this.apiClient.soapCall(
//       '/UtbCustomer',
//       {
//         customer: {
//           custNo,
//           dob,
//           category_status_customer: 'Disconnected',
//         },
//       },
//       'updateCustomer',
//     );
//   }

//   async deleteCustomer(custNo: string) {
//     const details = await this.getDetails(custNo);
//     if (details.error)
//       throw new AppError(
//         'Failed to retrieve customer details for deletion',
//         400,
//       );
//     const dob = details.return?.dob;
//     if (!dob) throw new AppError('Customer date of birth not found', 400);
//     const result = await this.deleteAccount(custNo, dob);
//     await this.customerModel.deleteOne({ custNo });
//     return result;
//   }
// }

// src/customer/customer.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../schemas/customer.schema';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';
import { AddCustomerDto } from './dto/add-customer.dto';
import { SoapResponse } from '../common/types/soap-response.type';

interface AddCustomerResponse {
  custNo: string;
}
interface CustomerDetailsResponse {
  dob?: string;
}
interface BalanceResponse {
  balance?: string;
}
interface ServicesResponse {
  services?: any[];
}

@Injectable()
export class CustomerService {
  constructor(
    private apiClient: ApiClientService,
    @InjectModel('Customer') private customerModel: Model<Customer>,
  ) {}

  async addCustomer(
    dto: AddCustomerDto,
  ): Promise<SoapResponse<AddCustomerResponse>> {
    const response = await this.apiClient.soapCall<AddCustomerResponse>(
      '/UtbCustomer',
      {
        customer: {
          ...dto.customer,
          preferredContactMethod: 'EMAIL',
          orderNotificationEmail: dto.customer.email,
          internetAccess: 'Y',
          company: `${dto.customer.firstName} ${dto.customer.surname}`,
        },
      },
      'addCustomer',
    );

    if ('error' in response) {
      throw new AppError(
        response.error.message || 'Failed to add customer',
        400,
      );
    }

    await this.customerModel.create({
      custNo: response.return.custNo,
      ...dto.customer,
    });

    return response;
  }

  async getServices(custNo: string): Promise<SoapResponse<ServicesResponse>> {
    if (!custNo) throw new AppError('Customer number required', 400);
    return this.apiClient.soapCall<ServicesResponse>(
      '/UtbServices',
      { custNo },
      'getServices',
    );
  }

  async getDetails(
    custNo: string,
  ): Promise<SoapResponse<CustomerDetailsResponse>> {
    if (!custNo) throw new AppError('Customer number required', 400);
    return this.apiClient.soapCall<CustomerDetailsResponse>(
      '/UtbCustomer',
      { customer: { custNo } },
      'getCustomer',
    );
  }

  async getBalance(custNo: string): Promise<SoapResponse<BalanceResponse>> {
    if (!custNo) throw new AppError('Customer number required', 400);
    return this.apiClient.soapCall<BalanceResponse>(
      '/UtbCustomer',
      { customer: { custNo } },
      'getCurrBalance',
    );
  }

  private async deleteAccount(custNo: string, dob: string) {
    if (!custNo || !dob) throw new AppError('custNo & dob required', 400);
    return this.apiClient.soapCall(
      '/UtbCustomer',
      {
        customer: { custNo, dob, category_status_customer: 'Disconnected' },
      },
      'updateCustomer',
    );
  }

  async deleteCustomer(custNo: string) {
    const details = await this.getDetails(custNo);
    if ('error' in details)
      throw new AppError('Unable to fetch details for deletion', 400);
    const dob = details.return?.dob;
    if (!dob) throw new AppError('DOB missing', 400);

    const result = await this.deleteAccount(custNo, dob);
    await this.customerModel.deleteOne({ custNo });
    return result;
  }
}
