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
import { GoogleSheetsService } from 'src/google-sheets/google-sheets.service';
import { EmailService } from 'src/common/services/email.service';
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
interface UnbilledCallDetailItem {
  actualTariffCode?: string;
  charge?: string;
  csn?: string;
  dateEnd?: string;
  dateStart?: string;
  detail?: string;
  duration?: string;
  itemType?: string;
  lineSeqNo?: string;
  origin?: string;
  tariffCode?: string;
  vspCost?: string;
}

interface UnbilledCallsDetailResponse {
  calls?: UnbilledCallDetailItem[];
}
@Injectable()
export class CustomerService {
  constructor(
    private apiClient: ApiClientService,
    private googleSheetsService: GoogleSheetsService, // Add this
    private emailService: EmailService,
    @InjectModel('Customer') private customerModel: Model<Customer>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  // async addCustomer(
  //   dto: AddCustomerDto,
  // ): Promise<SoapResponse<AddCustomerResponse>> {
  //   const prefContact = (
  //     dto.customer.preferredContactMethod || 'Email'
  //   ).toUpperCase();
  //   dto.customer.agent_id = '713';
  //   const response = await this.apiClient.soapCall<AddCustomerResponse>(
  //     '/UtbCustomer',
  //     {
  //       customer: {
  //         ...dto.customer,
  //         preferredContactMethod: prefContact,
  //         orderNotificationEmail:
  //           dto.customer.orderNotificationEmail ?? dto.customer.email,
  //         internetAccess: 'Y',
  //         company: `${dto.customer.firstName} ${dto.customer.surname}`,
  //         sal: dto.customer.sal,
  //         dob_port: dto.customer.dob_port,
  //         custAuthorityType: dto.customer.custAuthorityType,
  //         custAuthorityNo: dto.customer.custAuthorityNo,
  //         agent_id: dto.customer.agent_id,
  //       },
  //     },
  //     'addCustomer',
  //   );

  //   if ('error' in response) {
  //     throw new AppError(
  //       response.error.message || 'Failed to add customer',
  //       400,
  //     );
  //   }

  //   const custNo = response.return.custNo;
  //   const now = new Date();
  //   const createdAt = now.toISOString();
  //   const updatedAt = now.toISOString();

  //   // EXACT 34-column order (A to AH) — using only real fields from your DTO
  //   const sheetRow = [
  //     createdAt, // A: createdAt
  //     updatedAt, // B: updatedAt
  //     dto.customer.agent_id || '', // C: agentId
  //     '', // D: simType → filled on activation
  //     '', // E: simNumber → ICCID
  //     'New', // F: New/Existing → default New
  //     '', // G: newNumber → filled on activation
  //     '', // H: existingNumber
  //     '', // I: availableNumbers
  //     dto.customer.firstName, // J: firstName
  //     dto.customer.surname, // K: surname
  //     dto.customer.email, // L: email
  //     dto.customer.sal || '', // M: sal
  //     dto.customer.preferredContactMethod || 'Email', // N: preferredContactMethod
  //     dto.customer.dob_port || dto.customer.dob || '', // O: dob
  //     'Individual', // P: custType → hardcoded for now
  //     dto.customer.suburb, // Q: suburb
  //     dto.customer.state, // R: state
  //     dto.customer.postcode, // S: postcode
  //     dto.customer.phone, // T: phoneNumber
  //     '', // U: selectedPlan → filled on activation
  //     '', // V: isUpgraded
  //     '', // W: provider → only on port-in
  //     '', // X: paymentToken → not in your flow
  //     'Yes', // Y: isNumberVerified → assumed
  //     '', // Z: selectedNumber → temporary
  //     custNo, // AA: custNo
  //     '', // AB: portingNumber → filled on port-in
  //     dto.customer.custAuthorityNo || '', // AC: arn
  //     dto.customer.dob_port || '', // AD: dob_port
  //     '', // AE: orderNo → filled on activation
  //     '', // AF: Activated?
  //     '', // AG: Added to Master Sheet?
  //     '', // AH: Cx Informed?
  //   ];

  //   // Save locally
  //   const savedCustomer = await this.customerModel.create({
  //     custNo,
  //     ...dto.customer,
  //     orderNotificationEmail:
  //       dto.customer.orderNotificationEmail ?? dto.customer.email,
  //     agent_id: dto.customer.agent_id,
  //   });

  //   // Sync address to User collection
  //   const existingUser = await this.userModel.findOne({
  //     email: dto.customer.email,
  //   });
  //   if (existingUser) {
  //     await this.userModel.updateOne(
  //       { _id: existingUser._id },
  //       {
  //         $set: {
  //           street: dto.customer.address,
  //           suburb: dto.customer.suburb,
  //           state: dto.customer.state,
  //           postcode: dto.customer.postcode,
  //           custNo,
  //         },
  //       },
  //     );
  //   }

  //   // Fire-and-forget Google Sheets append
  //   this.googleSheetsService.appendCustomer(sheetRow).catch((err) => {
  //     console.error('Failed to append to Google Sheets', {
  //       custNo,
  //       error: err.message,
  //     });
  //   });

  //   return response;
  // }
  async addCustomer(
    dto: AddCustomerDto,
  ): Promise<SoapResponse<AddCustomerResponse>> {
    try {
      const prefContact = (
        dto.customer.preferredContactMethod || 'Email'
      ).toUpperCase();
      dto.customer.agent_id = '713';
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
            agent_id: dto.customer.agent_id,
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

      const custNo = response.return.custNo;
      const now = new Date();
      const createdAt = now.toISOString();
      const updatedAt = now.toISOString();

      // EXACT 34-column order (A to AH) — using only real fields from your DTO
      const sheetRow = [
        createdAt, // A: createdAt
        updatedAt, // B: updatedAt
        dto.customer.agent_id || '', // C: agentId
        '', // D: simType → filled on activation
        '', // E: simNumber → ICCID
        'New', // F: New/Existing → default New
        '', // G: newNumber → filled on activation
        '', // H: existingNumber
        '', // I: availableNumbers
        dto.customer.firstName, // J: firstName
        dto.customer.surname, // K: surname
        dto.customer.email, // L: email
        dto.customer.sal || '', // M: sal
        dto.customer.preferredContactMethod || 'Email', // N: preferredContactMethod
        dto.customer.dob_port || dto.customer.dob || '', // O: dob
        'Individual', // P: custType → hardcoded for now
        dto.customer.suburb, // Q: suburb
        dto.customer.state, // R: state
        dto.customer.postcode, // S: postcode
        dto.customer.phone, // T: phoneNumber
        '', // U: selectedPlan → filled on activation
        '', // V: isUpgraded
        '', // W: provider → only on port-in
        '', // X: paymentToken → not in your flow
        'Yes', // Y: isNumberVerified → assumed
        '', // Z: selectedNumber → temporary
        custNo, // AA: custNo
        '', // AB: portingNumber → filled on port-in
        dto.customer.custAuthorityNo || '', // AC: arn
        dto.customer.dob_port || '', // AD: dob_port
        '', // AE: orderNo → filled on activation
        '', // AF: Activated?
        '', // AG: Added to Master Sheet?
        '', // AH: Cx Informed?
      ];

      // Save locally
      const savedCustomer = await this.customerModel.create({
        custNo,
        ...dto.customer,
        orderNotificationEmail:
          dto.customer.orderNotificationEmail ?? dto.customer.email,
        agent_id: dto.customer.agent_id,
      });

      // Sync address to User collection
      const existingUser = await this.userModel.findOne({
        email: dto.customer.email,
      });
      if (existingUser) {
        await this.userModel.updateOne(
          { _id: existingUser._id },
          {
            $set: {
              street: dto.customer.address,
              suburb: dto.customer.suburb,
              state: dto.customer.state,
              postcode: dto.customer.postcode,
              custNo,
            },
          },
        );
      }

      // Fire-and-forget Google Sheets append
      this.googleSheetsService.appendCustomer(sheetRow).catch((err) => {
        console.error('Failed to append to Google Sheets', {
          custNo,
          error: err.message,
        });
      });

      return response;
    } catch (error) {
      await this.emailService.sendFailureEmail(
        'addCustomer',
        error.message || 'Unknown error',
        { dto },
      );
      throw error;
    }
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
  // Add to your CustomerService class
  async getMobileBalance(
    custNo: string,
    lineSeqNo: string = '1',
  ): Promise<SoapResponse<any>> {
    if (!custNo) {
      throw new AppError('Customer number required', 400);
    }

    // Clean custNo (remove CUST prefix if present - backend expects numeric)
    const numericCustNo = parseInt(custNo.replace(/\D+/g, ''), 10);
    if (isNaN(numericCustNo)) {
      throw new AppError('Invalid customer number format', 400);
    }

    const response = await this.apiClient.soapCall<any>(
      '/UtbMobile',
      {
        queryBalanceRequest: {
          custNo: numericCustNo,
          lineSeqNo: parseInt(lineSeqNo, 10),
        },
      },
      'queryBalance',
    );

    // Proper handling of your existing SoapResponse union type
    if ('error' in response) {
      throw new AppError(
        response.error.message || 'Failed to fetch mobile balance',
        400,
      );
    }

    // Success case: response is { return: { success: true, queryItems: [...], ... } }
    const result = 'return' in response ? response.return : response;

    if (!result.success) {
      throw new AppError(
        result.errorMessage || 'Mobile balance query failed',
        400,
      );
    }

    return { return: result }; // wrap back consistently if needed, or just return result
  }
  async getUnbilledCallsSummary(
    custNo: string,
  ): Promise<SoapResponse<UnbilledCallsSummaryResponse>> {
    if (!custNo) {
      throw new AppError('Customer number required', 400);
    }

    // Clean to numeric if prefixed with CUST
    const numericCustNo = parseInt(custNo.replace(/\D+/g, ''), 10);
    if (isNaN(numericCustNo)) {
      throw new AppError('Invalid customer number format', 400);
    }

    const response =
      await this.apiClient.soapCall<UnbilledCallsSummaryResponse>(
        '/UtbCall',
        { custNo: numericCustNo },
        'getUnbilledCallsSummary',
      );
    console.log(response);
    // Unified error handling (matches your existing pattern)
    if ('error' in response) {
      throw new AppError(
        response.error.message || 'Failed to fetch unbilled calls summary',
        400,
      );
    }

    return response;
  }
  async getUnbilledCallsDetail(
    custNo: string,
    csn: string,
  ): Promise<SoapResponse<UnbilledCallsDetailResponse>> {
    if (!custNo || !csn) {
      throw new AppError(
        'Customer number and CSN (service number) are required',
        400,
      );
    }

    const numericCustNo = parseInt(custNo.replace(/\D+/g, ''), 10);
    if (isNaN(numericCustNo)) {
      throw new AppError('Invalid customer number format', 400);
    }

    const response = await this.apiClient.soapCall<UnbilledCallsDetailResponse>(
      '/UtbCall',
      {
        custNo: numericCustNo,
        csn: csn.trim(),
      },
      'getUnbilledCallsDetail',
    );
    console.log('Unbilled Calls Detail Response:', response);

    if ('error' in response) {
      throw new AppError(
        response.error.message || 'Failed to fetch unbilled call details',
        400,
      );
    }

    return response;
  }
}
