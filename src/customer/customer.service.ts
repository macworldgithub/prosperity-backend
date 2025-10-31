// // // import { Injectable } from '@nestjs/common';
// // // import { InjectModel } from '@nestjs/mongoose';
// // // import { Model } from 'mongoose';
// // // import { Customer } from '../schemas/customer.schema';
// // // import { ApiClientService } from '../api-client/api-client.service';
// // // import { AppError } from '../common/errors/app-error';
// // // import { AddCustomerDto } from './dto/add-customer.dto';

// // // @Injectable()
// // // export class CustomerService {
// // //   constructor(
// // //     private apiClient: ApiClientService,
// // //     @InjectModel('Customer') private customerModel: Model<Customer>,
// // //   ) {}

// // //   async addCustomer(addCustomerDto: AddCustomerDto) {
// // //     const response = await this.apiClient.soapCall(
// // //       '/UtbCustomer',
// // //       {
// // //         customer: {
// // //           ...addCustomerDto.customer,
// // //           preferredContactMethod: 'EMAIL',
// // //           orderNotificationEmail: addCustomerDto.customer.email,
// // //           internetAccess: 'Y',
// // //           company:
// // //             addCustomerDto.customer.firstName + addCustomerDto.customer.surname,
// // //         },
// // //       },
// // //       'addCustomer',
// // //     );

// // //     if (response.error) {
// // //       throw new AppError(
// // //         response.error.message || 'Failed to add customer',
// // //         400,
// // //       );
// // //     }

// // //     // Store in local DB
// // //     await this.customerModel.create({
// // //       custNo: response.return.custNo,
// // //       ...addCustomerDto.customer,
// // //     });

// // //     return response;
// // //   }

// // //   async getServices(custNo: string) {
// // //     if (!custNo) throw new AppError('Customer number is required', 400);
// // //     return await this.apiClient.soapCall(
// // //       '/UtbServices',
// // //       { custNo },
// // //       'getServices',
// // //     );
// // //   }

// // //   async getDetails(custNo: string) {
// // //     if (!custNo) throw new AppError('Customer number is required', 400);
// // //     return await this.apiClient.soapCall(
// // //       '/UtbCustomer',
// // //       { customer: { custNo } },
// // //       'getCustomer',
// // //     );
// // //   }

// // //   async getBalance(custNo: string) {
// // //     if (!custNo) throw new AppError('Customer number is required', 400);
// // //     return await this.apiClient.soapCall(
// // //       '/UtbCustomer',
// // //       { customer: { custNo } },
// // //       'getCurrBalance',
// // //     );
// // //   }

// // //   private async deleteAccount(custNo: string, dob: string) {
// // //     if (!custNo || !dob)
// // //       throw new AppError('Customer number and date of birth are required', 400);
// // //     return await this.apiClient.soapCall(
// // //       '/UtbCustomer',
// // //       {
// // //         customer: {
// // //           custNo,
// // //           dob,
// // //           category_status_customer: 'Disconnected',
// // //         },
// // //       },
// // //       'updateCustomer',
// // //     );
// // //   }

// // //   async deleteCustomer(custNo: string) {
// // //     const details = await this.getDetails(custNo);
// // //     if (details.error)
// // //       throw new AppError(
// // //         'Failed to retrieve customer details for deletion',
// // //         400,
// // //       );
// // //     const dob = details.return?.dob;
// // //     if (!dob) throw new AppError('Customer date of birth not found', 400);
// // //     const result = await this.deleteAccount(custNo, dob);
// // //     await this.customerModel.deleteOne({ custNo });
// // //     return result;
// // //   }
// // // }

// // // src/customer/customer.service.ts
// // import { Injectable } from '@nestjs/common';
// // import { InjectModel } from '@nestjs/mongoose';
// // import { Model } from 'mongoose';
// // import { Customer } from '../schemas/customer.schema';
// // import { ApiClientService } from '../api-client/api-client.service';
// // import { AppError } from '../common/errors/app-error';
// // import { AddCustomerDto } from './dto/add-customer.dto';
// // import { SoapResponse } from '../common/types/soap-response.type';

// // interface AddCustomerResponse {
// //   custNo: string;
// // }
// // interface CustomerDetailsResponse {
// //   dob?: string;
// // }
// // interface BalanceResponse {
// //   balance?: string;
// // }
// // interface ServicesResponse {
// //   services?: any[];
// // }

// // @Injectable()
// // export class CustomerService {
// //   constructor(
// //     private apiClient: ApiClientService,
// //     @InjectModel('Customer') private customerModel: Model<Customer>,
// //   ) {}

// //   // async addCustomer(
// //   //   dto: AddCustomerDto,
// //   // ): Promise<SoapResponse<AddCustomerResponse>> {
// //   //   const response = await this.apiClient.soapCall<AddCustomerResponse>(
// //   //     '/UtbCustomer',
// //   //     {
// //   //       customer: {
// //   //         ...dto.customer,
// //   //         preferredContactMethod: 'EMAIL',
// //   //         orderNotificationEmail: dto.customer.email,
// //   //         internetAccess: 'Y',
// //   //         company: `${dto.customer.firstName} ${dto.customer.surname}`,
// //   //       },
// //   //     },
// //   //     'addCustomer',
// //   //   );

// //   //   if ('error' in response) {
// //   //     throw new AppError(
// //   //       response.error.message || 'Failed to add customer',
// //   //       400,
// //   //     );
// //   //   }

// //   //   await this.customerModel.create({
// //   //     custNo: response.return.custNo,
// //   //     ...dto.customer,
// //   //   });

// //   //   return response;
// //   // }

// //   async addCustomer(
// //     dto: AddCustomerDto,
// //   ): Promise<SoapResponse<AddCustomerResponse>> {
// //     // Normalize preferred contact for the SOAP backend (it expects uppercase)
// //     const prefContact = (
// //       dto.customer.preferredContactMethod || 'Email'
// //     ).toUpperCase();

// //     const response = await this.apiClient.soapCall<AddCustomerResponse>(
// //       '/UtbCustomer',
// //       {
// //         customer: {
// //           ...dto.customer,
// //           // ensure SOAP backend receives expected format
// //           preferredContactMethod: prefContact,
// //           // prefer explicit orderNotificationEmail when provided
// //           orderNotificationEmail:
// //             dto.customer.orderNotificationEmail ?? dto.customer.email,
// //           internetAccess: 'Y',
// //           company: `${dto.customer.firstName} ${dto.customer.surname}`,
// //           // forward newly added optional fields to the SOAP payload
// //           sal: dto.customer.sal,
// //           dob_port: dto.customer.dob_port,
// //           custAuthorityType: dto.customer.custAuthorityType,
// //           custAuthorityNo: dto.customer.custAuthorityNo,
// //         },
// //       },
// //       'addCustomer',
// //     );

// //     if ('error' in response) {
// //       throw new AppError(
// //         response.error.message || 'Failed to add customer',
// //         400,
// //       );
// //     }

// //     // Persist to MongoDB including new fields
// //     await this.customerModel.create({
// //       custNo: response.return.custNo,
// //       ...dto.customer,
// //       orderNotificationEmail:
// //         dto.customer.orderNotificationEmail ?? dto.customer.email,
// //     });

// //     return response;
// //   }

// //   async getServices(custNo: string): Promise<SoapResponse<ServicesResponse>> {
// //     if (!custNo) throw new AppError('Customer number required', 400);
// //     return this.apiClient.soapCall<ServicesResponse>(
// //       '/UtbServices',
// //       { custNo },
// //       'getServices',
// //     );
// //   }

// //   async getDetails(
// //     custNo: string,
// //   ): Promise<SoapResponse<CustomerDetailsResponse>> {
// //     if (!custNo) throw new AppError('Customer number required', 400);
// //     return this.apiClient.soapCall<CustomerDetailsResponse>(
// //       '/UtbCustomer',
// //       { customer: { custNo } },
// //       'getCustomer',
// //     );
// //   }

// //   async getBalance(custNo: string): Promise<SoapResponse<BalanceResponse>> {
// //     if (!custNo) throw new AppError('Customer number required', 400);
// //     return this.apiClient.soapCall<BalanceResponse>(
// //       '/UtbCustomer',
// //       { customer: { custNo } },
// //       'getCurrBalance',
// //     );
// //   }

// //   private async deleteAccount(custNo: string, dob: string) {
// //     if (!custNo || !dob) throw new AppError('custNo & dob required', 400);
// //     return this.apiClient.soapCall(
// //       '/UtbCustomer',
// //       {
// //         customer: { custNo, dob, category_status_customer: 'Disconnected' },
// //       },
// //       'updateCustomer',
// //     );
// //   }

// //   async deleteCustomer(custNo: string) {
// //     const details = await this.getDetails(custNo);
// //     if ('error' in details)
// //       throw new AppError('Unable to fetch details for deletion', 400);
// //     const dob = details.return?.dob;
// //     if (!dob) throw new AppError('DOB missing', 400);

// //     const result = await this.deleteAccount(custNo, dob);
// //     await this.customerModel.deleteOne({ custNo });
// //     return result;
// //   }
// // }

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Customer } from '../schemas/customer.schema';
// import { ApiClientService } from '../api-client/api-client.service';
// import { AppError } from '../common/errors/app-error';
// import { AddCustomerDto } from './dto/add-customer.dto';
// import { SoapResponse } from '../common/types/soap-response.type';

// interface AddCustomerResponse {
//   custNo: string;
// }
// interface CustomerDetailsResponse {
//   dob?: string;
// }
// interface BalanceResponse {
//   balance?: string;
// }
// interface ServicesResponse {
//   services?: any[];
// }

// @Injectable()
// export class CustomerService {
//   constructor(
//     private apiClient: ApiClientService,
//     @InjectModel('Customer') private customerModel: Model<Customer>,
//   ) {}

//   async addCustomer(
//     dto: AddCustomerDto,
//   ): Promise<SoapResponse<AddCustomerResponse>> {
//     // Normalize preferred contact for the SOAP backend (it expects uppercase)
//     const prefContact = (
//       dto.customer.preferredContactMethod || 'Email'
//     ).toUpperCase();

//     const response = await this.apiClient.soapCall<AddCustomerResponse>(
//       '/UtbCustomer',
//       {
//         customer: {
//           ...dto.customer,
//           // ensure SOAP backend receives expected format
//           preferredContactMethod: prefContact,
//           // prefer explicit orderNotificationEmail when provided
//           orderNotificationEmail:
//             dto.customer.orderNotificationEmail ?? dto.customer.email,
//           internetAccess: 'Y',
//           company: `${dto.customer.firstName} ${dto.customer.surname}`,
//           // forward newly added optional fields to the SOAP payload
//           sal: dto.customer.sal,
//           dob_port: dto.customer.dob_port,
//           custAuthorityType: dto.customer.custAuthorityType,
//           custAuthorityNo: dto.customer.custAuthorityNo,
//         },
//       },
//       'addCustomer',
//     );

//     if ('error' in response) {
//       throw new AppError(
//         response.error.message || 'Failed to add customer',
//         400,
//       );
//     }

//     // Persist to MongoDB including new fields
//     await this.customerModel.create({
//       custNo: response.return.custNo,
//       ...dto.customer,
//       orderNotificationEmail:
//         dto.customer.orderNotificationEmail ?? dto.customer.email,
//     });

//     return response;
//   }

//   async getServices(custNo: string): Promise<SoapResponse<ServicesResponse>> {
//     if (!custNo) throw new AppError('Customer number required', 400);
//     return this.apiClient.soapCall<ServicesResponse>(
//       '/UtbServices',
//       { custNo },
//       'getServices',
//     );
//   }

//   async getDetails(
//     custNo: string,
//   ): Promise<SoapResponse<CustomerDetailsResponse>> {
//     if (!custNo) throw new AppError('Customer number required', 400);
//     return this.apiClient.soapCall<CustomerDetailsResponse>(
//       '/UtbCustomer',
//       { customer: { custNo } },
//       'getCustomer',
//     );
//   }

//   async getBalance(custNo: string): Promise<SoapResponse<BalanceResponse>> {
//     if (!custNo) throw new AppError('Customer number required', 400);
//     return this.apiClient.soapCall<BalanceResponse>(
//       '/UtbCustomer',
//       { customer: { custNo } },
//       'getCurrBalance',
//     );
//   }

//   private async deleteAccount(custNo: string, dob: string) {
//     if (!custNo || !dob) throw new AppError('custNo & dob required', 400);
//     return this.apiClient.soapCall(
//       '/UtbCustomer',
//       {
//         customer: { custNo, dob, category_status_customer: 'Disconnected' },
//       },
//       'updateCustomer',
//     );
//   }

//   async deleteCustomer(custNo: string) {
//     const details = await this.getDetails(custNo);
//     if ('error' in details)
//       throw new AppError('Unable to fetch details for deletion', 400);
//     const dob = details.return?.dob;
//     if (!dob) throw new AppError('DOB missing', 400);

//     const result = await this.deleteAccount(custNo, dob);
//     await this.customerModel.deleteOne({ custNo });
//     return result;
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../schemas/customer.schema';
import { User } from '../schemas/user.schema';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';
import { AddCustomerDto } from './dto/add-customer.dto';
import { SoapResponse } from '../common/types/soap-response.type';
import * as bcrypt from 'bcrypt';

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
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async addCustomer(
    dto: AddCustomerDto,
  ): Promise<SoapResponse<AddCustomerResponse>> {
    // Normalize preferred contact for the SOAP backend (it expects uppercase)
    const prefContact = (
      dto.customer.preferredContactMethod || 'Email'
    ).toUpperCase();

    const response = await this.apiClient.soapCall<AddCustomerResponse>(
      '/UtbCustomer',
      {
        customer: {
          ...dto.customer,
          preferredContactMethod: prefContact,
          orderNotificationEmail:
            dto.customer.orderNotificationEmail ?? dto.customer.email,
          internetAccess: 'Y',
          company: `${dto.customer.firstName} ${dto.customer.surname}`,
          sal: dto.customer.sal,
          dob_port: dto.customer.dob_port,
          custAuthorityType: dto.customer.custAuthorityType,
          custAuthorityNo: dto.customer.custAuthorityNo,
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

    // === 1. Persist minimal customer data locally ===
    const savedCustomer = await this.customerModel.create({
      custNo: response.return.custNo,
      ...dto.customer,
      orderNotificationEmail:
        dto.customer.orderNotificationEmail ?? dto.customer.email,
    });

    // === 2. Sync address to User (create or update) ===
    const addressPayload = {
      street: dto.customer.address,
      suburb: dto.customer.suburb,
      state: dto.customer.state,
      postcode: dto.customer.postcode,
    };

    const existingUser = await this.userModel.findOne({
      email: dto.customer.email,
    });

    if (existingUser) {
      await this.userModel.updateOne(
        { _id: existingUser._id },
        {
          $set: {
            ...addressPayload,
            custNo: response.return.custNo,
          },
        },
      );
    } else {
      // Create new User with minimal required fields
      const tempPin = await bcrypt.hash('0000', await bcrypt.genSalt());
      await this.userModel.create({
        name: `${dto.customer.firstName} ${dto.customer.surname}`,
        email: dto.customer.email,
        custNo: response.return.custNo,
        pin: tempPin,
        biometricEn暫Enrolled: false,
        ...addressPayload,
      });
    }

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
    await this.userModel.updateOne({ custNo }, { $unset: { custNo: '' } }); // optional: unlink
    return result;
  }
}
