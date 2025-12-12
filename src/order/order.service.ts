// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Order } from 'src/schemas/order.schema';
// import { ApiClientService } from '../api-client/api-client.service';
// import { AppError } from '../common/errors/app-error';
// import { ActivateNumberDto } from './dto/activate-number.dto';
// import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
// import { UpdatePlanDto } from './dto/update-plan.dto';
// import { SoapResponse } from '../common/types/soap-response.type';
// import { GoogleSheetsService } from '../google-sheets/google-sheets.service';
// import { EmailService } from 'src/common/services/email.service';
// interface OrderCreateResponse {
//   orderId: string;
//   errorMessage?: string;
// }

// interface OrderQueryResponse {
//   status?: string;
//   internalStatus?: string;
//   errorMessage?: string;
// }

// @Injectable()
// export class OrderService {
//   constructor(
//     private apiClient: ApiClientService,
//     private configService: ConfigService,
//     private googleSheetsService: GoogleSheetsService,
//     private emailService: EmailService,
//     @InjectModel(Order.name) private orderModel: Model<Order>,
//   ) {}

//   private getFormattedDate(): string {
//     const date = new Date();
//     date.setDate(27);
//     const day = '27';
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   }

//   private validateCustomerData(dto: any, number: string) {
//     if (!dto?.cust?.custNo || !number)
//       throw new AppError('Invalid customer data or number', 400);
//     if (!dto.cust?.email) throw new AppError('Customer email is required', 400);
//     if (!dto.planNo) throw new AppError('Plan number is required', 400);
//   }

//   // Overloaded helper — allows 'N/A' only for PLAN_CHANGE
//   private async syncOrderToGoogleSheets(
//     custNo: string,
//     orderId: string,
//     msn: string,
//     planNo: string,
//     orderType: 'NEW_ACTIVATION' | 'PORT_IN',
//     simType: 'eSIM' | 'Physical SIM',
//     extras?: { simNumber?: string },
//   ): Promise<void>;
//   private async syncOrderToGoogleSheets(
//     custNo: string,
//     orderId: string,
//     msn: string,
//     planNo: string,
//     orderType: 'PLAN_CHANGE',
//     simType: 'N/A',
//     extras?: { simNumber?: string },
//   ): Promise<void>;
//   private async syncOrderToGoogleSheets(
//     custNo: string,
//     orderId: string,
//     msn: string,
//     planNo: string,
//     orderType: 'NEW_ACTIVATION' | 'PORT_IN' | 'PLAN_CHANGE',
//     simType: 'eSIM' | 'Physical SIM' | 'N/A',
//     extras?: { simNumber?: string },
//   ) {
//     this.googleSheetsService
//       .updateCustomerRowByCustNo(custNo, {
//         orderId,
//         msn,
//         planNo,
//         orderType,
//         simType: simType === 'N/A' ? undefined : simType,
//         simNumber: extras?.simNumber,
//         status: 'PENDING',
//       })
//       .catch((err) => {
//         console.error('Google Sheets sync failed:', {
//           custNo,
//           orderId,
//           error: err.message,
//         });
//       });
//   }

//   async activateNumber(
//     dto: ActivateNumberDto,
//   ): Promise<SoapResponse<OrderCreateResponse>> {
//     try {
//       this.validateCustomerData(dto, dto.number);

//       const isEsim = !dto.simNo;
//       const simType = isEsim ? 'eSIM' : 'Physical SIM';
//       dto.agentId = '713';
//       const requestBody = {
//         createRequest: {
//           custNo: dto.cust.custNo,
//           orderType: 'SRVC_ORD',
//           orderAction: 'ADD_WME_NEW',
//           orderItems: {
//             wmeNewReqItem: {
//               lineType: 'R',
//               lineName: 'SimplyBig Unlimited',
//               planNo: dto.planNo,
//               agentId: dto.agentId,
//               orderItemAddress: {
//                 locality: dto.cust.suburb,
//                 postcode: dto.cust.postcode,
//                 streetName: dto.cust.address.split(',')[0]?.trim() || '',
//                 additionalAddress: dto.cust.address.substring(0, 10),
//               },
//               msn: dto.number,
//               ...(dto.simNo
//                 ? { simNo: dto.simNo }
//                 : { isEsim: true, isQRcode: true }),
//               cycleNo: '28',
//               spendCode: '80610',
//               notificationEmail: dto.cust.email,
//             },
//           },
//         },
//       };

//       const result = await this.apiClient.soapCall<OrderCreateResponse>(
//         '/UtbOrder',
//         requestBody,
//         'orderCreate',
//       );

//       if ('error' in result) {
//         throw new AppError(
//           result.error.message || 'Failed to activate number',
//           400,
//         );
//       }
//       if ('return' in result && result.return.errorMessage) {
//         throw new AppError(result.return.errorMessage, 400);
//       }

//       const orderId = result.return.orderId;

//       await this.orderModel.create({
//         orderId,
//         custNo: dto.cust.custNo,
//         msn: dto.number,
//         planNo: dto.planNo,
//         agentId: dto.agentId || 'UNKNOWN',
//         status: 'PENDING',
//         orderType: 'NEW_ACTIVATION',
//         orderAction: 'ADD_WME_NEW',
//         simNo: dto.simNo,
//         isEsim,
//         isQRcode: isEsim,
//         address: dto.cust.address,
//         suburb: dto.cust.suburb,
//         postcode: dto.cust.postcode,
//         email: dto.cust.email,
//         rawRequest: requestBody,
//         rawResponse: result,
//       });

//       await this.syncOrderToGoogleSheets(
//         dto.cust.custNo,
//         orderId,
//         dto.number,
//         dto.planNo,
//         'NEW_ACTIVATION',
//         simType,
//         { simNumber: dto.simNo },
//       );

//       return result;
//     } catch (error) {
//       await this.emailService.sendFailureEmail(
//         'activateNumber',
//         error.message || 'Unknown error',
//         { dto },
//       );
//       throw error;
//     }
//   }

//   async activatePortNumber(
//     dto: ActivatePortNumberDto,
//   ): Promise<SoapResponse<OrderCreateResponse>> {
//     try {
//       this.validateCustomerData(dto, dto.number);

//       if (!dto.numType || !['prepaid', 'postpaid'].includes(dto.numType))
//         throw new AppError('Invalid number type', 400);
//       if (dto.numType === 'prepaid' && !dto.cust.dob)
//         throw new AppError('DOB required for prepaid port', 400);
//       if (dto.numType === 'postpaid' && !dto.cust.arn)
//         throw new AppError('ARN required for postpaid port', 400);

//       const msn = dto.number.startsWith('0') ? dto.number : '0' + dto.number;
//       const isEsim = !dto.simNo;
//       const simType = isEsim ? 'eSIM' : 'Physical SIM';
//       dto.agentId = '713';

//       const requestBody = {
//         createRequest: {
//           custNo: dto.cust.custNo,
//           orderType: 'SRVC_ORD',
//           orderAction: 'ADD_WME_PORT',
//           orderItems: {
//             wmePortInReqItem: {
//               lineType: 'R',
//               lineName: 'SimplyBig Unlimited',

//               planNo: dto.planNo,
//               agentId: dto.agentId,

//               orderItemAddress: {
//                 locality: dto.cust.suburb,
//                 postcode: dto.cust.postcode,
//                 streetName: dto.cust.address.split(',')[0]?.trim() || '',
//                 additionalAddress: dto.cust.address.substring(0, 10),
//               },
//               msn,
//               ...(dto.simNo
//                 ? { simNo: dto.simNo }
//                 : { isEsim: true, isQRcode: true }),
//               cycleNo: '28',
//               spendCode: '80610',
//               notificationEmail: dto.cust.email,
//               ...(dto.numType === 'prepaid'
//                 ? { dob: dto.cust.dob }
//                 : { arn: dto.cust.arn }),
//             },
//           },
//         },
//       };

//       const result = await this.apiClient.soapCall<OrderCreateResponse>(
//         '/UtbOrder',
//         requestBody,
//         'orderCreate',
//       );

//       if ('error' in result) {
//         throw new AppError(
//           result.error.message || 'Failed to port number',
//           400,
//         );
//       }
//       if ('return' in result && result.return.errorMessage) {
//         throw new AppError(result.return.errorMessage, 400);
//       }

//       const orderId = result.return.orderId;

//       await this.orderModel.create({
//         orderId,
//         custNo: dto.cust.custNo,
//         msn,
//         planNo: dto.planNo,
//         agentId: dto.agentId || 'UNKNOWN',
//         status: 'PENDING',
//         orderType: 'PORT_IN',
//         orderAction: 'ADD_WME_PORT',
//         simNo: dto.simNo,
//         isEsim,
//         isQRcode: isEsim,
//         numType: dto.numType,
//         dob: dto.numType === 'prepaid' ? dto.cust.dob : undefined,
//         arn: dto.numType === 'postpaid' ? dto.cust.arn : undefined,
//         address: dto.cust.address,
//         suburb: dto.cust.suburb,
//         postcode: dto.cust.postcode,
//         email: dto.cust.email,
//         rawRequest: requestBody,
//         rawResponse: result,
//       });

//       await this.syncOrderToGoogleSheets(
//         dto.cust.custNo,
//         orderId,
//         msn,
//         dto.planNo,
//         'PORT_IN',
//         simType,
//         { simNumber: dto.simNo },
//       );

//       return result;
//     } catch (error) {
//       await this.emailService.sendFailureEmail(
//         'activatePortNumber',
//         error.message || 'Unknown error',
//         { dto },
//       );
//       throw error;
//     }
//   }
//   async updatePlan(dto: UpdatePlanDto, custNo: string): Promise<SoapResponse> {
//     if (!custNo || !dto.planNo || !dto.lineSeqNo)
//       throw new AppError('custNo, planNo, lineSeqNo are required', 400);

//     const requestBody = {
//       createRequest: {
//         custNo,
//         orderType: 'SRVC_ORD',
//         orderAction: 'CHANGE_WME_PLAN',
//         orderItems: {
//           wmeModifyPlanReqItem: {
//             lineSeqNo: dto.lineSeqNo,
//             planno: dto.planNo,
//             custReqDate: this.getFormattedDate(),
//           },
//         },
//       },
//     };

//     const result = await this.apiClient.soapCall(
//       '/UtbOrder',
//       requestBody,
//       'orderCreate',
//     );

//     if ('error' in result) {
//       throw new AppError(result.error.message || 'Failed to update plan', 400);
//     }
//     if ('return' in result && result.return.errorMessage) {
//       throw new AppError(result.return.errorMessage, 400);
//     }

//     const orderId = result.return.orderId;

//     await this.orderModel.create({
//       orderId,
//       custNo,
//       msn: 'N/A',
//       planNo: dto.planNo,
//       agentId: '713',
//       status: 'PENDING',
//       orderType: 'PLAN_CHANGE',
//       orderAction: 'CHANGE_WME_PLAN',
//       lineSeqNo: dto.lineSeqNo,
//       custReqDate: this.getFormattedDate(),
//       rawRequest: requestBody,
//       rawResponse: result,
//     });

//     // Now this compiles — 'N/A' is allowed for PLAN_CHANGE
//     await this.syncOrderToGoogleSheets(
//       custNo,
//       orderId,
//       'N/A',
//       dto.planNo,
//       'PLAN_CHANGE',
//       'N/A',
//     );

//     return result;
//   }

//   async queryOrder(orderId: string): Promise<SoapResponse<OrderQueryResponse>> {
//     if (!orderId) throw new AppError('Order ID required', 400);

//     const result = await this.apiClient.soapCall<OrderQueryResponse>(
//       '/UtbOrder',
//       { request: { orderId } },
//       'orderQuery',
//     );

//     // If it's an error response, skip logic & return immediately
//     if ('error' in result) {
//       console.warn('SOAP returned error:', result.error);
//       return result;
//     }

//     // ---- At this point, TypeScript knows "result" has "return" ----
//     const ret = result.return;

//     // internalStatus is inside orderQueryResponse, not root
//     const payload = (ret as any).orderQueryResponse ?? ret;

//     const internalStatus = payload?.internalStatus ?? payload?.status ?? null;

//     if (internalStatus) {
//       const status = String(internalStatus).toUpperCase();

//       // Handle numeric vs string orderId in DB
//       const numericOrderId = Number(orderId);
//       const filter = isNaN(numericOrderId)
//         ? { orderId }
//         : { orderId: numericOrderId };

//       await this.orderModel.updateOne(filter, {
//         $set: {
//           status,
//           errorMessage: payload?.errorMessage || null,
//           rawResponse: result,
//         },
//       });

//       const order = await this.orderModel.findOne(filter);
//       if (order) {
//         this.googleSheetsService
//           .updateCustomerRowByCustNo(order.custNo, { status })
//           .catch(console.error);
//       }
//     }

//     return result;
//   }

//   async getPlans(): Promise<SoapResponse<any>> {
//     return this.apiClient.soapCall(
//       '/UtbPlan',
//       { group: { groupNo: this.configService.get('groupNo') } },
//       'getGroupPlans',
//     );
//   }
// }

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { Customer } from 'src/schemas/customer.schema';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';
import { ActivateNumberDto } from './dto/activate-number.dto';
import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { SoapResponse } from '../common/types/soap-response.type';
import { GoogleSheetsService } from '../google-sheets/google-sheets.service';
import { EmailService } from 'src/common/services/email.service';
import { CustomerService } from '../customer/customer.service';
interface OrderCreateResponse {
  orderId: string;
  errorMessage?: string;
}
interface OrderQueryResponse {
  status?: string;
  internalStatus?: string;
  errorMessage?: string;
}
type OrderQueryReturn =
  | OrderQueryResponse
  | { orderQueryResponse: OrderQueryResponse };
@Injectable()
export class OrderService {
  constructor(
    private apiClient: ApiClientService,
    private configService: ConfigService,
    private googleSheetsService: GoogleSheetsService,
    private emailService: EmailService,
    private customerService: CustomerService,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}
  private getFormattedDate(): string {
    const date = new Date();
    date.setDate(27);
    const day = '27';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  private validateCustomerData(dto: any, number: string) {
    if (!dto?.cust?.custNo || !number)
      throw new AppError('Invalid customer data or number', 400);
    if (!dto.cust?.email) throw new AppError('Customer email is required', 400);
    if (!dto.planNo) throw new AppError('Plan number is required', 400);
  }
  // Overloaded helper — allows 'N/A' only for PLAN_CHANGE
  private async syncOrderToGoogleSheets(
    custNo: string,
    orderId: string,
    msn: string,
    planNo: string,
    orderType: 'NEW_ACTIVATION' | 'PORT_IN',
    simType: 'eSIM' | 'Physical SIM',
    extras?: { simNumber?: string },
  ): Promise<void>;
  private async syncOrderToGoogleSheets(
    custNo: string,
    orderId: string,
    msn: string,
    planNo: string,
    orderType: 'PLAN_CHANGE',
    simType: 'N/A',
    extras?: { simNumber?: string },
  ): Promise<void>;
  private async syncOrderToGoogleSheets(
    custNo: string,
    orderId: string,
    msn: string,
    planNo: string,
    orderType: 'NEW_ACTIVATION' | 'PORT_IN' | 'PLAN_CHANGE',
    simType: 'eSIM' | 'Physical SIM' | 'N/A',
    extras?: { simNumber?: string },
  ) {
    this.googleSheetsService
      .updateCustomerRowByCustNo(custNo, {
        orderId,
        msn,
        planNo,
        orderType,
        simType: simType === 'N/A' ? undefined : simType,
        simNumber: extras?.simNumber,
        status: 'PENDING',
      })
      .catch((err) => {
        console.error('Google Sheets sync failed:', {
          custNo,
          orderId,
          error: err.message,
        });
      });
  }
  private startPollingOrder(
    orderId: string,
    custNo: string,
    customerEmail: string,
  ) {
    let attempts = 0;
    const maxAttempts = 5;
    const intervalMs = 5 * 60 * 1000; // 5 minutes
    const timer = setInterval(async () => {
      attempts++;
      try {
        const response = await this.queryOrder(orderId);
        if ('return' in response) {
          const ret = response.return;
          const payload =
            'orderQueryResponse' in ret ? ret.orderQueryResponse : ret;
          const internalStatus = payload?.internalStatus ?? payload?.status;
          if (internalStatus) {
            const status = internalStatus.toUpperCase();
            if (status === 'COMPLETE') {
              await this.emailService.sendOrderCompletionEmail(
                customerEmail,
                orderId,
              );
              clearInterval(timer);
              return;
            } else if (status === 'REJECTED') {
              await this.emailService.sendOrderFailureEmail(
                customerEmail,
                orderId,
                payload?.errorMessage || 'Order rejected',
              );
              clearInterval(timer);
              return;
            }
          }
        }
        if (attempts >= maxAttempts) {
          clearInterval(timer);
          await this.emailService.sendFailureEmail(
            'Order Polling',
            `Order ${orderId} not completed after ${maxAttempts} attempts`,
            { orderId, custNo },
          );
        }
      } catch (err) {
        console.error('Polling error:', err);
        if (attempts >= maxAttempts) {
          clearInterval(timer);
        }
      }
    }, intervalMs);
  }
  async activateNumber(
    dto: ActivateNumberDto,
  ): Promise<SoapResponse<OrderCreateResponse>> {
    try {
      this.validateCustomerData(dto, dto.number);
      const isEsim = !dto.simNo;
      const simType = isEsim ? 'eSIM' : 'Physical SIM';
      dto.agentId = '713';
      const requestBody = {
        createRequest: {
          custNo: dto.cust.custNo,
          orderType: 'SRVC_ORD',
          orderAction: 'ADD_WME_NEW',
          orderItems: {
            wmeNewReqItem: {
              lineType: 'R',
              lineName: 'SimplyBig Unlimited',
              planNo: dto.planNo,
              agentId: dto.agentId,
              orderItemAddress: {
                locality: dto.cust.suburb,
                postcode: dto.cust.postcode,
                streetName: dto.cust.address.split(',')[0]?.trim() || '',
                additionalAddress: dto.cust.address.substring(0, 10),
              },
              msn: dto.number,
              ...(dto.simNo
                ? { simNo: dto.simNo }
                : { isEsim: true, isQRcode: true }),
              cycleNo: '28',
              spendCode: '80610',
              notificationEmail: dto.cust.email,
            },
          },
        },
      };
      const result = await this.apiClient.soapCall<OrderCreateResponse>(
        '/UtbOrder',
        requestBody,
        'orderCreate',
      );
      if ('error' in result) {
        throw new AppError(
          result.error.message || 'Failed to activate number',
          400,
        );
      }
      if ('return' in result && result.return.errorMessage) {
        throw new AppError(result.return.errorMessage, 400);
      }
      const orderId = result.return.orderId;
      await this.orderModel.create({
        orderId,
        custNo: dto.cust.custNo,
        msn: dto.number,
        planNo: dto.planNo,
        agentId: dto.agentId || 'UNKNOWN',
        status: 'PENDING',
        orderType: 'NEW_ACTIVATION',
        orderAction: 'ADD_WME_NEW',
        simNo: dto.simNo,
        isEsim,
        isQRcode: isEsim,
        address: dto.cust.address,
        suburb: dto.cust.suburb,
        postcode: dto.cust.postcode,
        email: dto.cust.email,
        rawRequest: requestBody,
        rawResponse: result,
      });
      await this.syncOrderToGoogleSheets(
        dto.cust.custNo,
        orderId,
        dto.number,
        dto.planNo,
        'NEW_ACTIVATION',
        simType,
        { simNumber: dto.simNo },
      );
      this.startPollingOrder(orderId, dto.cust.custNo, dto.cust.email);
      return result;
    } catch (error) {
      await this.emailService.sendFailureEmail(
        'activateNumber',
        error.message || 'Unknown error',
        { dto },
      );
      throw error;
    }
  }
  async activatePortNumber(
    dto: ActivatePortNumberDto,
  ): Promise<SoapResponse<OrderCreateResponse>> {
    try {
      this.validateCustomerData(dto, dto.number);
      if (!dto.numType || !['prepaid', 'postpaid'].includes(dto.numType))
        throw new AppError('Invalid number type', 400);
      if (dto.numType === 'prepaid' && !dto.cust.dob)
        throw new AppError('DOB required for prepaid port', 400);
      if (dto.numType === 'postpaid' && !dto.cust.arn)
        throw new AppError('ARN required for postpaid port', 400);
      const msn = dto.number.startsWith('0') ? dto.number : '0' + dto.number;
      const isEsim = !dto.simNo;
      const simType = isEsim ? 'eSIM' : 'Physical SIM';
      dto.agentId = '713';
      const requestBody = {
        createRequest: {
          custNo: dto.cust.custNo,
          orderType: 'SRVC_ORD',
          orderAction: 'ADD_WME_PORT',
          orderItems: {
            wmePortInReqItem: {
              lineType: 'R',
              lineName: 'SimplyBig Unlimited',
              planNo: dto.planNo,
              agentId: dto.agentId,
              orderItemAddress: {
                locality: dto.cust.suburb,
                postcode: dto.cust.postcode,
                streetName: dto.cust.address.split(',')[0]?.trim() || '',
                additionalAddress: dto.cust.address.substring(0, 10),
              },
              msn,
              ...(dto.simNo
                ? { simNo: dto.simNo }
                : { isEsim: true, isQRcode: true }),
              cycleNo: '28',
              spendCode: '80610',
              notificationEmail: dto.cust.email,
              ...(dto.numType === 'prepaid'
                ? { dob: dto.cust.dob }
                : { arn: dto.cust.arn }),
            },
          },
        },
      };
      const result = await this.apiClient.soapCall<OrderCreateResponse>(
        '/UtbOrder',
        requestBody,
        'orderCreate',
      );
      if ('error' in result) {
        throw new AppError(
          result.error.message || 'Failed to port number',
          400,
        );
      }
      if ('return' in result && result.return.errorMessage) {
        throw new AppError(result.return.errorMessage, 400);
      }
      const orderId = result.return.orderId;
      await this.orderModel.create({
        orderId,
        custNo: dto.cust.custNo,
        msn,
        planNo: dto.planNo,
        agentId: dto.agentId || 'UNKNOWN',
        status: 'PENDING',
        orderType: 'PORT_IN',
        orderAction: 'ADD_WME_PORT',
        simNo: dto.simNo,
        isEsim,
        isQRcode: isEsim,
        numType: dto.numType,
        dob: dto.numType === 'prepaid' ? dto.cust.dob : undefined,
        arn: dto.numType === 'postpaid' ? dto.cust.arn : undefined,
        address: dto.cust.address,
        suburb: dto.cust.suburb,
        postcode: dto.cust.postcode,
        email: dto.cust.email,
        rawRequest: requestBody,
        rawResponse: result,
      });
      await this.syncOrderToGoogleSheets(
        dto.cust.custNo,
        orderId,
        msn,
        dto.planNo,
        'PORT_IN',
        simType,
        { simNumber: dto.simNo },
      );
      this.startPollingOrder(orderId, dto.cust.custNo, dto.cust.email);
      return result;
    } catch (error) {
      await this.emailService.sendFailureEmail(
        'activatePortNumber',
        error.message || 'Unknown error',
        { dto },
      );
      throw error;
    }
  }
  async updatePlan(dto: UpdatePlanDto, custNo: string): Promise<SoapResponse> {
    if (!custNo || !dto.planNo || !dto.lineSeqNo)
      throw new AppError('custNo, planNo, lineSeqNo are required', 400);
    const requestBody = {
      createRequest: {
        custNo,
        orderType: 'SRVC_ORD',
        orderAction: 'CHANGE_WME_PLAN',
        orderItems: {
          wmeModifyPlanReqItem: {
            lineSeqNo: dto.lineSeqNo,
            planno: dto.planNo,
            custReqDate: this.getFormattedDate(),
          },
        },
      },
    };
    const result = await this.apiClient.soapCall(
      '/UtbOrder',
      requestBody,
      'orderCreate',
    );
    if ('error' in result) {
      throw new AppError(result.error.message || 'Failed to update plan', 400);
    }
    if ('return' in result && result.return.errorMessage) {
      throw new AppError(result.return.errorMessage, 400);
    }
    const orderId = result.return.orderId;
    await this.orderModel.create({
      orderId,
      custNo,
      msn: 'N/A',
      planNo: dto.planNo,
      agentId: '713',
      status: 'PENDING',
      orderType: 'PLAN_CHANGE',
      orderAction: 'CHANGE_WME_PLAN',
      lineSeqNo: dto.lineSeqNo,
      custReqDate: this.getFormattedDate(),
      rawRequest: requestBody,
      rawResponse: result,
    });
    // Now this compiles — 'N/A' is allowed for PLAN_CHANGE
    await this.syncOrderToGoogleSheets(
      custNo,
      orderId,
      'N/A',
      dto.planNo,
      'PLAN_CHANGE',
      'N/A',
    );
    const customer = await this.customerModel.findOne({ custNo });
    if (customer && customer.email) {
      this.startPollingOrder(orderId, custNo, customer.email);
    }
    return result;
  }
  async queryOrder(orderId: string): Promise<SoapResponse<OrderQueryReturn>> {
    if (!orderId) throw new AppError('Order ID required', 400);
    const result = await this.apiClient.soapCall<OrderQueryReturn>(
      '/UtbOrder',
      { request: { orderId } },
      'orderQuery',
    );
    // If it's an error response, skip logic & return immediately
    if ('error' in result) {
      console.warn('SOAP returned error:', result.error);
      return result;
    }
    // ---- At this point, TypeScript knows "result" has "return" ----
    const ret = result.return;
    // internalStatus is inside orderQueryResponse, not root
    const payload = 'orderQueryResponse' in ret ? ret.orderQueryResponse : ret;
    const internalStatus = payload?.internalStatus ?? payload?.status ?? null;
    if (internalStatus) {
      const status = String(internalStatus).toUpperCase();
      // Handle numeric vs string orderId in DB
      const numericOrderId = Number(orderId);
      const filter = isNaN(numericOrderId)
        ? { orderId }
        : { orderId: numericOrderId };
      await this.orderModel.updateOne(filter, {
        $set: {
          status,
          errorMessage: payload?.errorMessage || null,
          rawResponse: result,
        },
      });
      const order = await this.orderModel.findOne(filter);
      if (order) {
        this.googleSheetsService
          .updateCustomerRowByCustNo(order.custNo, { status })
          .catch(console.error);
      }
    }
    return result;
  }
  async getPlans(): Promise<SoapResponse<any>> {
    return this.apiClient.soapCall(
      '/UtbPlan',
      { group: { groupNo: this.configService.get('groupNo') } },
      'getGroupPlans',
    );
  }
}
