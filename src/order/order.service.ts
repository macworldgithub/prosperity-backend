// // // src/order/order.service.ts
// // import { Injectable } from '@nestjs/common';
// // import { ConfigService } from '@nestjs/config';
// // import { ApiClientService } from '../api-client/api-client.service';
// // import { AppError } from '../common/errors/app-error';
// // import { ActivateNumberDto } from './dto/activate-number.dto';
// // import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
// // import { UpdatePlanDto } from './dto/update-plan.dto';
// // import { InjectQueue } from '@nestjs/bull';
// // import { Queue } from 'bull';

// // @Injectable()
// // export class OrderService {
// //   constructor(
// //     private apiClient: ApiClientService,
// //     private configService: ConfigService,
// //     @InjectQueue('order-activation') private orderQueue: Queue,
// //   ) {}

// //   private getFormattedDate() {
// //     const date = new Date();
// //     date.setDate(27);
// //     const day = '27';
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const year = date.getFullYear();
// //     return `${day}-${month}-${year}`;
// //   }

// //   private validateCustomerData(customerData: any, number: string) {
// //     if (!customerData?.cust?.custNo || !number)
// //       throw new AppError('Invalid customer data or number', 400);
// //     if (!customerData.cust.email)
// //       throw new AppError('Customer email is required', 400);
// //     if (!customerData.planNo)
// //       throw new AppError('Plan number is required', 400);
// //   }

// //   async activateNumber(activateNumberDto: ActivateNumberDto) {
// //     this.validateCustomerData(activateNumberDto, activateNumberDto.number);

// //     const orderRequest = {
// //       createRequest: {
// //         custNo: activateNumberDto.cust.custNo,
// //         orderType: 'SRVC_ORD',
// //         orderAction: 'ADD_WME_NEW',
// //         orderItems: {
// //           wmeNewReqItem: {
// //             lineType: 'R',
// //             lineName: 'SimplyBig Unlimited',
// //             planNo: activateNumberDto.planNo,
// //             orderItemAddress: {
// //               locality: activateNumberDto.cust.suburb,
// //               postcode: activateNumberDto.cust.postcode,
// //               streetName: activateNumberDto.cust.address.split(',')[0],
// //               additionalAddress: activateNumberDto.cust.address.substring(
// //                 0,
// //                 10,
// //               ),
// //             },
// //             msn: activateNumberDto.number,
// //             ...(activateNumberDto.simNo
// //               ? { simNo: activateNumberDto.simNo }
// //               : { isEsim: true, isQRcode: true }),
// //             cycleNo: '28',
// //             spendCode: '80610',
// //             notificationEmail: activateNumberDto.cust.email,
// //           },
// //         },
// //       },
// //     };

// //     const result = await this.apiClient.soapCall(
// //       '/UtbOrder',
// //       orderRequest,
// //       'orderCreate',
// //     );
// //     if (result.return.errorMessage) {
// //       throw new AppError(
// //         result.return.errorMessage || 'Failed to activate number',
// //         400,
// //       );
// //     }

// //     // Enqueue for watching
// //     await this.orderQueue.add(
// //       'watchOrder',
// //       { cust: activateNumberDto.cust, orderNo: result.return.orderId },
// //       {
// //         jobId: `watch-${activateNumberDto.cust.custNo}`,
// //         attempts: 100,
// //         backoff: { type: 'fixed', delay: 60000 },
// //         removeOnComplete: true,
// //         removeOnFail: false,
// //       },
// //     );

// //     return result;
// //   }

// //   async activatePortNumber(activatePortNumberDto: ActivatePortNumberDto) {
// //     this.validateCustomerData(
// //       activatePortNumberDto,
// //       activatePortNumberDto.number,
// //     );

// //     if (
// //       !activatePortNumberDto.numType ||
// //       !['prepaid', 'postpaid'].includes(activatePortNumberDto.numType)
// //     ) {
// //       throw new AppError(
// //         'Invalid number type. Must be either "prepaid" or "postpaid"',
// //         400,
// //       );
// //     }

// //     if (
// //       activatePortNumberDto.numType === 'prepaid' &&
// //       !activatePortNumberDto.cust.dob
// //     ) {
// //       throw new AppError('Date of birth is required for prepaid', 400);
// //     }

// //     if (
// //       activatePortNumberDto.numType === 'postpaid' &&
// //       !activatePortNumberDto.cust.arn
// //     ) {
// //       throw new AppError('ARN is required for postpaid', 400);
// //     }

// //     const wmePortInReqItem = {
// //       lineType: 'R',
// //       planNo: activatePortNumberDto.planNo,
// //       orderItemAddress: {
// //         locality: activatePortNumberDto.cust.suburb || 'BUDDINA',
// //         postcode: activatePortNumberDto.cust.postcode || 4575,
// //         streetName: activatePortNumberDto.cust.address.split(',')[0],
// //         additionalAddress: activatePortNumberDto.cust.address.substring(0, 10),
// //       },
// //       msn: activatePortNumberDto.number.startsWith('0')
// //         ? activatePortNumberDto.number
// //         : '0' + activatePortNumberDto.number,
// //       ...(activatePortNumberDto.simNo
// //         ? { simNo: activatePortNumberDto.simNo }
// //         : { isEsim: true, isQRcode: true }),
// //       cycleNo: '28',
// //       spendCode: '80610',
// //       notificationEmail: activatePortNumberDto.cust.email,
// //       ...(activatePortNumberDto.numType === 'prepaid'
// //         ? { dob: activatePortNumberDto.cust.dob }
// //         : { arn: activatePortNumberDto.cust.arn }),
// //     };

// //     const result = await this.apiClient.soapCall(
// //       '/UtbOrder',
// //       {
// //         createRequest: {
// //           custNo: activatePortNumberDto.cust.custNo,
// //           orderType: 'SRVC_ORD',
// //           orderAction: 'ADD_WME_PORT',
// //           orderItems: { wmePortInReqItem },
// //         },
// //       },
// //       'orderCreate',
// //     );

// //     if (result.return && result.return.errorMessage) {
// //       throw new AppError(
// //         result.return.errorMessage || 'Failed to activate ported number',
// //         400,
// //       );
// //     }

// //     // Enqueue for watching
// //     await this.orderQueue.add(
// //       'watchOrder',
// //       { cust: activatePortNumberDto.cust, orderNo: result.return.orderId },
// //       {
// //         jobId: `watch-${activatePortNumberDto.cust.custNo}`,
// //         attempts: 100,
// //         backoff: { type: 'fixed', delay: 60000 },
// //         removeOnComplete: true,
// //         removeOnFail: false,
// //       },
// //     );

// //     return result;
// //   }

// //   async updatePlan(updatePlanDto: UpdatePlanDto, custNo: string) {
// //     if (!custNo || !updatePlanDto.planNo || !updatePlanDto.lineSeqNo) {
// //       throw new AppError(
// //         'Customer number, plan number, and line sequence number are required',
// //         400,
// //       );
// //     }

// //     return await this.apiClient.soapCall(
// //       '/UtbOrder',
// //       {
// //         createRequest: {
// //           custNo,
// //           orderType: 'SRVC_ORD',
// //           orderAction: 'CHANGE_WME_PLAN',
// //           orderItems: {
// //             wmeModifyPlanReqItem: {
// //               lineSeqNo: updatePlanDto.lineSeqNo,
// //               planno: updatePlanDto.planNo,
// //               custReqDate: this.getFormattedDate(),
// //             },
// //           },
// //         },
// //       },
// //       'orderCreate',
// //     );
// //   }

// //   async queryOrder(orderId: string) {
// //     if (!orderId) throw new AppError('Order ID is required', 400);
// //     return await this.apiClient.soapCall(
// //       '/UtbOrder',
// //       { request: { orderId } },
// //       'orderQuery',
// //     );
// //   }

// //   async getPlans() {
// //     return await this.apiClient.soapCall(
// //       '/UtbPlan',
// //       { group: { groupNo: this.configService.get('groupNo') } },
// //       'getGroupPlans',
// //     );
// //   }
// // }
// // src/order/order.service.ts
// // import { Injectable } from '@nestjs/common';
// // import { ConfigService } from '@nestjs/config';
// // import { ApiClientService } from '../api-client/api-client.service';
// // import { AppError } from '../common/errors/app-error';
// // import { ActivateNumberDto } from './dto/activate-number.dto';
// // import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
// // import { UpdatePlanDto } from './dto/update-plan.dto';
// // import { InjectQueue } from '@nestjs/bull';
// // import { Queue } from 'bull';
// // import { SoapResponse } from '../common/types/soap-response.type';

// // interface OrderCreateResponse {
// //   orderId: string;
// //   errorMessage?: string;
// // }

// // interface OrderQueryResponse {
// //   status?: string;
// // }

// // interface PlanResponse {
// //   plans?: any[];
// // }

// // @Injectable()
// // export class OrderService {
// //   constructor(
// //     private apiClient: ApiClientService,
// //     private configService: ConfigService,
// //     @InjectQueue('order-activation') private orderQueue: Queue,
// //   ) {}

// //   private getFormattedDate() {
// //     const date = new Date();
// //     date.setDate(27);
// //     const day = '27';
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const year = date.getFullYear();
// //     return `${day}-${month}-${year}`;
// //   }

// //   private validateCustomerData(customerData: any, number: string) {
// //     if (!customerData?.cust?.custNo || !number)
// //       throw new AppError('Invalid customer data or number', 400);
// //     if (!customerData.cust.email)
// //       throw new AppError('Customer email is required', 400);
// //     if (!customerData.planNo)
// //       throw new AppError('Plan number is required', 400);
// //   }

// //   async activateNumber(
// //     dto: ActivateNumberDto,
// //   ): Promise<SoapResponse<OrderCreateResponse>> {
// //     this.validateCustomerData(dto, dto.number);

// //     const orderRequest = {
// //       createRequest: {
// //         custNo: dto.cust.custNo,
// //         orderType: 'SRVC_ORD',
// //         orderAction: 'ADD_WME_NEW',
// //         orderItems: {
// //           wmeNewReqItem: {
// //             lineType: 'R',
// //             lineName: 'SimplyBig Unlimited',
// //             planNo: dto.planNo,
// //             orderItemAddress: {
// //               locality: dto.cust.suburb,
// //               postcode: dto.cust.postcode,
// //               streetName: dto.cust.address.split(',')[0],
// //               additionalAddress: dto.cust.address.substring(0, 10),
// //             },
// //             msn: dto.number,
// //             ...(dto.simNo
// //               ? { simNo: dto.simNo }
// //               : { isEsim: true, isQRcode: true }),
// //             cycleNo: '28',
// //             spendCode: '80610',
// //             notificationEmail: dto.cust.email,
// //           },
// //         },
// //       },
// //     };

// //     const result = await this.apiClient.soapCall<OrderCreateResponse>(
// //       '/UtbOrder',
// //       orderRequest,
// //       'orderCreate',
// //     );

// //     // Fixed: safe access using 'return' in result
// //     if ('error' in result) {
// //       throw new AppError(
// //         result.error.message || 'Failed to activate number',
// //         400,
// //       );
// //     }
// //     if (result.return.errorMessage) {
// //       throw new AppError(result.return.errorMessage, 400);
// //     }

// //     await this.orderQueue.add(
// //       'watchOrder',
// //       { cust: dto.cust, orderNo: result.return.orderId },
// //       {
// //         jobId: `watch-${dto.cust.custNo}`,
// //         attempts: 100,
// //         backoff: { type: 'fixed', delay: 60000 },
// //         removeOnComplete: true,
// //         removeOnFail: false,
// //       },
// //     );

// //     return result;
// //   }

// //   async activatePortNumber(
// //     dto: ActivatePortNumberDto,
// //   ): Promise<SoapResponse<OrderCreateResponse>> {
// //     this.validateCustomerData(dto, dto.number);

// //     if (!dto.numType || !['prepaid', 'postpaid'].includes(dto.numType)) {
// //       throw new AppError('Invalid number type', 400);
// //     }
// //     if (dto.numType === 'prepaid' && !dto.cust.dob) {
// //       throw new AppError('DOB required for prepaid', 400);
// //     }
// //     if (dto.numType === 'postpaid' && !dto.cust.arn) {
// //       throw new AppError('ARN required for postpaid', 400);
// //     }

// //     const wmePortInReqItem = {
// //       lineType: 'R',
// //       planNo: dto.planNo,
// //       orderItemAddress: {
// //         locality: dto.cust.suburb || 'BUDDINA',
// //         postcode: dto.cust.postcode || 4575,
// //         streetName: dto.cust.address.split(',')[0],
// //         additionalAddress: dto.cust.address.substring(0, 10),
// //       },
// //       msn: dto.number.startsWith('0') ? dto.number : '0' + dto.number,
// //       ...(dto.simNo ? { simNo: dto.simNo } : { isEsim: true, isQRcode: true }),
// //       cycleNo: '28',
// //       spendCode: '80610',
// //       notificationEmail: dto.cust.email,
// //       ...(dto.numType === 'prepaid'
// //         ? { dob: dto.cust.dob }
// //         : { arn: dto.cust.arn }),
// //     };

// //     const result = await this.apiClient.soapCall<OrderCreateResponse>(
// //       '/UtbOrder',
// //       {
// //         createRequest: {
// //           custNo: dto.cust.custNo,
// //           orderType: 'SRVC_ORD',
// //           orderAction: 'ADD_WME_PORT',
// //           orderItems: { wmePortInReqItem },
// //         },
// //       },
// //       'orderCreate',
// //     );

// //     // Fixed: safe access
// //     if ('error' in result) {
// //       throw new AppError(
// //         result.error.message || 'Failed to activate ported number',
// //         400,
// //       );
// //     }
// //     if (result.return.errorMessage) {
// //       throw new AppError(result.return.errorMessage, 400);
// //     }

// //     await this.orderQueue.add(
// //       'watchOrder',
// //       { cust: dto.cust, orderNo: result.return.orderId },
// //       {
// //         jobId: `watch-${dto.cust.custNo}`,
// //         attempts: 100,
// //         backoff: { type: 'fixed', delay: 60000 },
// //         removeOnComplete: true,
// //         removeOnFail: false,
// //       },
// //     );

// //     return result;
// //   }

// //   async updatePlan(dto: UpdatePlanDto, custNo: string): Promise<SoapResponse> {
// //     if (!custNo || !dto.planNo || !dto.lineSeqNo) {
// //       throw new AppError('custNo, planNo, lineSeqNo required', 400);
// //     }

// //     return this.apiClient.soapCall(
// //       '/UtbOrder',
// //       {
// //         createRequest: {
// //           custNo,
// //           orderType: 'SRVC_ORD',
// //           orderAction: 'CHANGE_WME_PLAN',
// //           orderItems: {
// //             wmeModifyPlanReqItem: {
// //               lineSeqNo: dto.lineSeqNo,
// //               planno: dto.planNo,
// //               custReqDate: this.getFormattedDate(),
// //             },
// //           },
// //         },
// //       },
// //       'orderCreate',
// //     );
// //   }

// //   async queryOrder(orderId: string): Promise<SoapResponse<OrderQueryResponse>> {
// //     if (!orderId) throw new AppError('Order ID required', 400);
// //     return this.apiClient.soapCall<OrderQueryResponse>(
// //       '/UtbOrder',
// //       { request: { orderId } },
// //       'orderQuery',
// //     );
// //   }

// //   async getPlans(): Promise<SoapResponse<PlanResponse>> {
// //     return this.apiClient.soapCall<PlanResponse>(
// //       '/UtbPlan',
// //       { group: { groupNo: this.configService.get('groupNo') } },
// //       'getGroupPlans',
// //     );
// //   }
// // }

// // import { Injectable } from '@nestjs/common';
// // import { ConfigService } from '@nestjs/config';
// // import { ApiClientService } from '../api-client/api-client.service';
// // import { AppError } from '../common/errors/app-error';
// // import { ActivateNumberDto } from './dto/activate-number.dto';
// // import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
// // import { UpdatePlanDto } from './dto/update-plan.dto';
// // import { SoapResponse } from '../common/types/soap-response.type';

// // interface OrderCreateResponse {
// //   orderId: string;
// //   errorMessage?: string;
// // }

// // interface OrderQueryResponse {
// //   status?: string;
// // }

// // interface PlanResponse {
// //   plans?: any[];
// // }

// // @Injectable()
// // export class OrderService {
// //   constructor(
// //     private apiClient: ApiClientService,
// //     private configService: ConfigService,
// //   ) {}

// //   private getFormattedDate() {
// //     const date = new Date();
// //     date.setDate(27);
// //     const day = '27';
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const year = date.getFullYear();
// //     return `${day}-${month}-${year}`;
// //   }

// //   private validateCustomerData(customerData: any, number: string) {
// //     if (!customerData?.cust?.custNo || !number)
// //       throw new AppError('Invalid customer data or number', 400);
// //     if (!customerData.cust.email)
// //       throw new AppError('Customer email is required', 400);
// //     if (!customerData.planNo)
// //       throw new AppError('Plan number is required', 400);
// //   }

// //   async activateNumber(
// //     dto: ActivateNumberDto,
// //   ): Promise<SoapResponse<OrderCreateResponse>> {
// //     this.validateCustomerData(dto, dto.number);

// //     const orderRequest = {
// //       createRequest: {
// //         custNo: dto.cust.custNo,
// //         orderType: 'SRVC_ORD',
// //         orderAction: 'ADD_WME_NEW',

// //         orderItems: {
// //           wmeNewReqItem: {
// //             lineType: 'R',
// //             lineName: 'SimplyBig Unlimited',
// //             planNo: dto.planNo,
// //             agentId: dto.agentId,

// //             orderItemAddress: {
// //               locality: dto.cust.suburb,
// //               postcode: dto.cust.postcode,
// //               streetName: dto.cust.address.split(',')[0],
// //               additionalAddress: dto.cust.address.substring(0, 10),
// //             },
// //             msn: dto.number,
// //             ...(dto.simNo
// //               ? { simNo: dto.simNo }
// //               : { isEsim: true, isQRcode: true }),
// //             cycleNo: '28',
// //             spendCode: '80610',
// //             notificationEmail: dto.cust.email,
// //           },
// //         },
// //       },
// //     };
// //     console.log(orderRequest.createRequest.orderItems.wmeNewReqItem);
// //     const result = await this.apiClient.soapCall<OrderCreateResponse>(
// //       '/UtbOrder',
// //       orderRequest,
// //       'orderCreate',
// //     );

// //     // Fixed: safe access using 'return' in result
// //     if ('error' in result) {
// //       throw new AppError(
// //         result.error.message || 'Failed to activate number',
// //         400,
// //       );
// //     }
// //     if (result.return.errorMessage) {
// //       throw new AppError(result.return.errorMessage, 400);
// //     }

// //     // Queue system removed — simply return the result
// //     return result;
// //   }

// //   async activatePortNumber(
// //     dto: ActivatePortNumberDto,
// //   ): Promise<SoapResponse<OrderCreateResponse>> {
// //     this.validateCustomerData(dto, dto.number);

// //     if (!dto.numType || !['prepaid', 'postpaid'].includes(dto.numType)) {
// //       throw new AppError('Invalid number type', 400);
// //     }
// //     if (dto.numType === 'prepaid' && !dto.cust.dob) {
// //       throw new AppError('DOB required for prepaid', 400);
// //     }
// //     if (dto.numType === 'postpaid' && !dto.cust.arn) {
// //       throw new AppError('ARN required for postpaid', 400);
// //     }

// //     const wmePortInReqItem = {
// //       lineType: 'R',
// //       planNo: dto.planNo,
// //       orderItemAddress: {
// //         locality: dto.cust.suburb || 'BUDDINA',
// //         postcode: dto.cust.postcode || 4575,
// //         streetName: dto.cust.address.split(',')[0],
// //         additionalAddress: dto.cust.address.substring(0, 10),
// //       },
// //       msn: dto.number.startsWith('0') ? dto.number : '0' + dto.number,
// //       ...(dto.simNo ? { simNo: dto.simNo } : { isEsim: true, isQRcode: true }),
// //       cycleNo: '28',
// //       spendCode: '80610',
// //       notificationEmail: dto.cust.email,
// //       ...(dto.numType === 'prepaid'
// //         ? { dob: dto.cust.dob }
// //         : { arn: dto.cust.arn }),
// //     };

// //     const result = await this.apiClient.soapCall<OrderCreateResponse>(
// //       '/UtbOrder',
// //       {
// //         createRequest: {
// //           custNo: dto.cust.custNo,
// //           orderType: 'SRVC_ORD',
// //           orderAction: 'ADD_WME_PORT',
// //           orderItems: { wmePortInReqItem },
// //         },
// //       },
// //       'orderCreate',
// //     );

// //     // Fixed: safe access
// //     if ('error' in result) {
// //       throw new AppError(
// //         result.error.message || 'Failed to activate ported number',
// //         400,
// //       );
// //     }
// //     if (result.return.errorMessage) {
// //       throw new AppError(result.return.errorMessage, 400);
// //     }

// //     // Queue system removed — simply return the result
// //     return result;
// //   }

// //   async updatePlan(dto: UpdatePlanDto, custNo: string): Promise<SoapResponse> {
// //     if (!custNo || !dto.planNo || !dto.lineSeqNo) {
// //       throw new AppError('custNo, planNo, lineSeqNo required', 400);
// //     }

// //     return this.apiClient.soapCall(
// //       '/UtbOrder',
// //       {
// //         createRequest: {
// //           custNo,
// //           orderType: 'SRVC_ORD',
// //           orderAction: 'CHANGE_WME_PLAN',
// //           orderItems: {
// //             wmeModifyPlanReqItem: {
// //               lineSeqNo: dto.lineSeqNo,
// //               planno: dto.planNo,
// //               custReqDate: this.getFormattedDate(),
// //             },
// //           },
// //         },
// //       },
// //       'orderCreate',
// //     );
// //   }

// //   async queryOrder(orderId: string): Promise<SoapResponse<OrderQueryResponse>> {
// //     if (!orderId) throw new AppError('Order ID required', 400);
// //     return this.apiClient.soapCall<OrderQueryResponse>(
// //       '/UtbOrder',
// //       { request: { orderId } },
// //       'orderQuery',
// //     );
// //   }

// //   async getPlans(): Promise<SoapResponse<PlanResponse>> {
// //     return this.apiClient.soapCall<PlanResponse>(
// //       '/UtbPlan',
// //       { group: { groupNo: this.configService.get('groupNo') } },
// //       'getGroupPlans',
// //     );
// //   }
// // }

// // import { Injectable } from '@nestjs/common';
// // import { ConfigService } from '@nestjs/config';
// // import { InjectModel } from '@nestjs/mongoose';
// // import { Model } from 'mongoose';
// // import { Order } from 'src/schemas/order.schema';
// // import { ApiClientService } from '../api-client/api-client.service';
// // import { AppError } from '../common/errors/app-error';
// // import { ActivateNumberDto } from './dto/activate-number.dto';
// // import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
// // import { UpdatePlanDto } from './dto/update-plan.dto';
// // import { SoapResponse } from '../common/types/soap-response.type';

// // interface OrderCreateResponse {
// //   orderId: string;
// //   errorMessage?: string;
// // }

// // interface OrderQueryResponse {
// //   status?: string;
// //   errorMessage?: string;
// // }

// // @Injectable()
// // export class OrderService {
// //   constructor(
// //     private apiClient: ApiClientService,
// //     private configService: ConfigService,
// //     @InjectModel(Order.name) private orderModel: Model<Order>,
// //   ) {}

// //   private getFormattedDate(): string {
// //     const date = new Date();
// //     date.setDate(27);
// //     const day = '27';
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const year = date.getFullYear();
// //     return `${day}-${month}-${year}`;
// //   }

// //   private validateCustomerData(dto: any, number: string) {
// //     if (!dto?.cust?.custNo || !number)
// //       throw new AppError('Invalid customer data or number', 400);
// //     if (!dto.cust?.email) throw new AppError('Customer email is required', 400);
// //     if (!dto.planNo) throw new AppError('Plan number is required', 400);
// //   }

// //   async activateNumber(
// //     dto: ActivateNumberDto,
// //   ): Promise<SoapResponse<OrderCreateResponse>> {
// //     this.validateCustomerData(dto, dto.number);

// //     const requestBody = {
// //       createRequest: {
// //         custNo: dto.cust.custNo,
// //         orderType: 'SRVC_ORD',
// //         orderAction: 'ADD_WME_NEW',
// //         orderItems: {
// //           wmeNewReqItem: {
// //             lineType: 'R',
// //             lineName: 'SimplyBig Unlimited',
// //             planNo: dto.planNo,
// //             agentId: dto.agentId,
// //             orderItemAddress: {
// //               locality: dto.cust.suburb,
// //               postcode: dto.cust.postcode,
// //               streetName: dto.cust.address.split(',')[0]?.trim() || '',
// //               additionalAddress: dto.cust.address.substring(0, 10),
// //             },
// //             msn: dto.number,
// //             ...(dto.simNo
// //               ? { simNo: dto.simNo }
// //               : { isEsim: true, isQRcode: true }),
// //             cycleNo: '28',
// //             spendCode: '80610',
// //             notificationEmail: dto.cust.email,
// //           },
// //         },
// //       },
// //     };

// //     const result = await this.apiClient.soapCall<OrderCreateResponse>(
// //       '/UtbOrder',
// //       requestBody,
// //       'orderCreate',
// //     );

// //     if ('error' in result) {
// //       throw new AppError(
// //         result.error.message || 'Failed to activate number',
// //         400,
// //       );
// //     }
// //     if (result.return?.errorMessage) {
// //       throw new AppError(result.return.errorMessage, 400);
// //     }

// //     // Save EVERYTHING to MongoDB
// //     await this.orderModel.create({
// //       orderId: result.return.orderId,
// //       custNo: dto.cust.custNo,
// //       msn: dto.number,
// //       planNo: dto.planNo,
// //       agentId: dto.agentId,
// //       status: 'PENDING',
// //       errorMessage: result.return.errorMessage || null,
// //       orderType: 'NEW_ACTIVATION',
// //       orderAction: 'ADD_WME_NEW',
// //       simNo: dto.simNo,
// //       isEsim: !dto.simNo,
// //       isQRcode: !dto.simNo,
// //       address: dto.cust.address,
// //       suburb: dto.cust.suburb,
// //       postcode: dto.cust.postcode,
// //       email: dto.cust.email,
// //       rawRequest: requestBody,
// //       rawResponse: result,
// //     });

// //     return result;
// //   }

// //   async activatePortNumber(
// //     dto: ActivatePortNumberDto,
// //   ): Promise<SoapResponse<OrderCreateResponse>> {
// //     this.validateCustomerData(dto, dto.number);

// //     if (!dto.numType || !['prepaid', 'postpaid'].includes(dto.numType)) {
// //       throw new AppError('Invalid number type', 400);
// //     }
// //     if (dto.numType === 'prepaid' && !dto.cust.dob) {
// //       throw new AppError('DOB required for prepaid port', 400);
// //     }
// //     if (dto.numType === 'postpaid' && !dto.cust.arn) {
// //       throw new AppError('ARN required for postpaid port', 400);
// //     }

// //     const msn = dto.number.startsWith('0') ? dto.number : '0' + dto.number;

// //     const requestBody = {
// //       createRequest: {
// //         custNo: dto.cust.custNo,
// //         orderType: 'SRVC_ORD',
// //         orderAction: 'ADD_WME_PORT',
// //         orderItems: {
// //           wmePortInReqItem: {
// //             lineType: 'R',
// //             planNo: dto.planNo,
// //             orderItemAddress: {
// //               locality: dto.cust.suburb || 'BUDDINA',
// //               postcode: dto.cust.postcode || '4575',
// //               streetName: dto.cust.address.split(',')[0]?.trim() || '',
// //               additionalAddress: dto.cust.address.substring(0, 10),
// //             },
// //             msn,
// //             ...(dto.simNo
// //               ? { simNo: dto.simNo }
// //               : { isEsim: true, isQRcode: true }),
// //             cycleNo: '28',
// //             spendCode: '80610',
// //             notificationEmail: dto.cust.email,
// //             ...(dto.numType === 'prepaid'
// //               ? { dob: dto.cust.dob }
// //               : { arn: dto.cust.arn }),
// //           },
// //         },
// //       },
// //     };

// //     const result = await this.apiClient.soapCall<OrderCreateResponse>(
// //       '/UtbOrder',
// //       requestBody,
// //       'orderCreate',
// //     );

// //     if ('error' in result) {
// //       throw new AppError(
// //         result.error.message || 'Failed to activate ported number',
// //         400,
// //       );
// //     }
// //     if (result.return?.errorMessage) {
// //       throw new AppError(result.return.errorMessage, 400);
// //     }

// //     await this.orderModel.create({
// //       orderId: result.return.orderId,
// //       custNo: dto.cust.custNo,
// //       msn,
// //       planNo: dto.planNo,
// //       agentId: dto.agentId || 'UNKNOWN',
// //       status: 'PENDING',
// //       errorMessage: result.return.errorMessage || null,
// //       orderType: 'PORT_IN',
// //       orderAction: 'ADD_WME_PORT',
// //       simNo: dto.simNo,
// //       isEsim: !dto.simNo,
// //       isQRcode: !dto.simNo,
// //       numType: dto.numType,
// //       dob: dto.numType === 'prepaid' ? dto.cust.dob : undefined,
// //       arn: dto.numType === 'postpaid' ? dto.cust.arn : undefined,
// //       address: dto.cust.address,
// //       suburb: dto.cust.suburb,
// //       postcode: dto.cust.postcode,
// //       email: dto.cust.email,
// //       rawRequest: requestBody,
// //       rawResponse: result,
// //     });

// //     return result;
// //   }

// //   async updatePlan(dto: UpdatePlanDto, custNo: string): Promise<SoapResponse> {
// //     if (!custNo || !dto.planNo || !dto.lineSeqNo) {
// //       throw new AppError('custNo, planNo, lineSeqNo are required', 400);
// //     }

// //     const requestBody = {
// //       createRequest: {
// //         custNo,
// //         orderType: 'SRVC_ORD',
// //         orderAction: 'CHANGE_WME_PLAN',
// //         orderItems: {
// //           wmeModifyPlanReqItem: {
// //             lineSeqNo: dto.lineSeqNo,
// //             planno: dto.planNo,
// //             custReqDate: this.getFormattedDate(),
// //           },
// //         },
// //       },
// //     };

// //     const result = await this.apiClient.soapCall(
// //       '/UtbOrder',
// //       requestBody,
// //       'orderCreate',
// //     );

// //     if ('error' in result) {
// //       throw new AppError(result.error.message || 'Failed to update plan', 400);
// //     }
// //     if (result.return?.errorMessage) {
// //       throw new AppError(result.return.errorMessage, 400);
// //     }

// //     await this.orderModel.create({
// //       orderId: result.return.orderId,
// //       custNo,
// //       msn: 'N/A',
// //       planNo: dto.planNo,
// //       agentId: 'SYSTEM',
// //       status: 'PENDING',
// //       errorMessage: result.return.errorMessage || null,
// //       orderType: 'PLAN_CHANGE',
// //       orderAction: 'CHANGE_WME_PLAN',
// //       lineSeqNo: dto.lineSeqNo,
// //       custReqDate: this.getFormattedDate(),
// //       rawRequest: requestBody,
// //       rawResponse: result,
// //     });

// //     return result;
// //   }

// //   async queryOrder(orderId: string): Promise<SoapResponse<OrderQueryResponse>> {
// //     if (!orderId) throw new AppError('Order ID required', 400);

// //     const result = await this.apiClient.soapCall<OrderQueryResponse>(
// //       '/UtbOrder',
// //       { request: { orderId } },
// //       'orderQuery',
// //     );

// //     // Update status in DB if query succeeds
// //     if (!('error' in result) && result.return) {
// //       await this.orderModel.updateOne(
// //         { orderId },
// //         {
// //           $set: {
// //             status: result.return.status || 'UNKNOWN',
// //             errorMessage: result.return.errorMessage || null,
// //             rawResponse: result,
// //           },
// //         },
// //         { upsert: false },
// //       );
// //     }

// //     return result;
// //   }

// //   async getPlans(): Promise<SoapResponse<any>> {
// //     return this.apiClient.soapCall(
// //       '/UtbPlan',
// //       { group: { groupNo: this.configService.get('groupNo') } },
// //       'getGroupPlans',
// //     );
// //   }
// // }

// // src/order/order.service.ts

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

// interface OrderCreateResponse {
//   orderId: string;
//   errorMessage?: string;
// }

// interface OrderQueryResponse {
//   status?: string;
//   errorMessage?: string;
// }

// @Injectable()
// export class OrderService {
//   constructor(
//     private apiClient: ApiClientService,
//     private configService: ConfigService,
//     private googleSheetsService: GoogleSheetsService, // ← Added
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

//   // Helper to update Google Sheets after successful order
//   private async syncOrderToGoogleSheets(
//     custNo: string,
//     orderId: string,
//     msn: string,
//     planNo: string,
//     orderType: 'NEW_ACTIVATION' | 'PORT_IN' | 'PLAN_CHANGE',
//     simType: string = 'eSIM',
//   ) {
//     this.googleSheetsService
//       .updateCustomerRowByCustNo(custNo, {
//         orderId,
//         msn,
//         planNo,
//         orderType,
//         status: 'PENDING',
//         simType,
//         activatedAt: new Date().toISOString().split('T')[0],
//       })
//       .catch((err) => {
//         console.error('Failed to sync order to Google Sheets', {
//           custNo,
//           orderId,
//           error: err.message,
//         });
//       });
//   }

//   async activateNumber(
//     dto: ActivateNumberDto,
//   ): Promise<SoapResponse<OrderCreateResponse>> {
//     this.validateCustomerData(dto, dto.number);

//     const requestBody = {
//       createRequest: {
//         custNo: dto.cust.custNo,
//         orderType: 'SRVC_ORD',
//         orderAction: 'ADD_WME_NEW',
//         orderItems: {
//           wmeNewReqItem: {
//             lineType: 'R',
//             lineName: 'SimplyBig Unlimited',
//             planNo: dto.planNo,
//             agentId: dto.agentId,
//             orderItemAddress: {
//               locality: dto.cust.suburb,
//               postcode: dto.cust.postcode,
//               streetName: dto.cust.address.split(',')[0]?.trim() || '',
//               additionalAddress: dto.cust.address.substring(0, 10),
//             },
//             msn: dto.number,
//             ...(dto.simNo
//               ? { simNo: dto.simNo }
//               : { isEsim: true, isQRcode: true }),
//             cycleNo: '28',
//             spendCode: '80610',
//             notificationEmail: dto.cust.email,
//           },
//         },
//       },
//     };

//     const result = await this.apiClient.soapCall<OrderCreateResponse>(
//       '/UtbOrder',
//       requestBody,
//       'orderCreate',
//     );

//     if ('error' in result)
//       throw new AppError(
//         result.error.message || 'Failed to activate number',
//         400,
//       );
//     if (result.return?.errorMessage)
//       throw new AppError(result.return.errorMessage, 400);

//     const orderId = result.return.orderId;
//     const simType = dto.simNo ? 'Physical SIM' : 'eSIM';

//     // Save to MongoDB
//     await this.orderModel.create({
//       orderId,
//       custNo: dto.cust.custNo,
//       msn: dto.number,
//       planNo: dto.planNo,
//       agentId: dto.agentId,
//       status: 'PENDING',
//       orderType: 'NEW_ACTIVATION',
//       orderAction: 'ADD_WME_NEW',
//       simNo: dto.simNo,
//       isEsim: !dto.simNo,
//       isQRcode: !dto.simNo,
//       address: dto.cust.address,
//       suburb: dto.cust.suburb,
//       postcode: dto.cust.postcode,
//       email: dto.cust.email,
//       rawRequest: requestBody,
//       rawResponse: result,
//     });

//     // Update Google Sheets row (fire-and-forget)
//     await this.syncOrderToGoogleSheets(
//       dto.cust.custNo,
//       orderId,
//       dto.number,
//       dto.planNo,
//       'NEW_ACTIVATION',
//       simType,
//     );

//     return result;
//   }

//   async activatePortNumber(
//     dto: ActivatePortNumberDto,
//   ): Promise<SoapResponse<OrderCreateResponse>> {
//     this.validateCustomerData(dto, dto.number);

//     if (!dto.numType || !['prepaid', 'postpaid'].includes(dto.numType))
//       throw new AppError('Invalid number type', 400);
//     if (dto.numType === 'prepaid' && !dto.cust.dob)
//       throw new AppError('DOB required for prepaid port', 400);
//     if (dto.numType === 'postpaid' && !dto.cust.arn)
//       throw new AppError('ARN required for postpaid port', 400);

//     const msn = dto.number.startsWith('0') ? dto.number : '0' + dto.number;
//     const simType = dto.simNo ? 'Physical SIM' : 'eSIM';

//     const requestBody = {
//       createRequest: {
//         custNo: dto.cust.custNo,
//         orderType: 'SRVC_ORD',
//         orderAction: 'ADD_WME_PORT',
//         orderItems: {
//           wmePortInReqItem: {
//             lineType: 'R',
//             planNo: dto.planNo,
//             orderItemAddress: {
//               locality: dto.cust.suburb || 'BUDDINA',
//               postcode: dto.cust.postcode || '4575',
//               streetName: dto.cust.address.split(',')[0]?.trim() || '',
//               additionalAddress: dto.cust.address.substring(0, 10),
//             },
//             msn,
//             ...(dto.simNo
//               ? { simNo: dto.simNo }
//               : { isEsim: true, isQRcode: true }),
//             cycleNo: '28',
//             spendCode: '80610',
//             notificationEmail: dto.cust.email,
//             ...(dto.numType === 'prepaid'
//               ? { dob: dto.cust.dob }
//               : { arn: dto.cust.arn }),
//           },
//         },
//       },
//     };

//     const result = await this.apiClient.soapCall<OrderCreateResponse>(
//       '/UtbOrder',
//       requestBody,
//       'orderCreate',
//     );

//     if ('error' in result)
//       throw new AppError(result.error.message || 'Failed to port number', 400);
//     if (result.return?.errorMessage)
//       throw new AppError(result.return.errorMessage, 400);

//     const orderId = result.return.orderId;

//     await this.orderModel.create({
//       orderId,
//       custNo: dto.cust.custNo,
//       msn,
//       planNo: dto.planNo,
//       agentId: dto.agentId || 'UNKNOWN',
//       status: 'PENDING',
//       orderType: 'PORT_IN',
//       orderAction: 'ADD_WME_PORT',
//       simNo: dto.simNo,
//       isEsim: !dto.simNo,
//       isQRcode: !dto.simNo,
//       numType: dto.numType,
//       dob: dto.numType === 'prepaid' ? dto.cust.dob : undefined,
//       arn: dto.numType === 'postpaid' ? dto.cust.arn : undefined,
//       address: dto.cust.address,
//       suburb: dto.cust.suburb,
//       postcode: dto.cust.postcode,
//       email: dto.cust.email,
//       rawRequest: requestBody,
//       rawResponse: result,
//     });

//     await this.syncOrderToGoogleSheets(
//       dto.cust.custNo,
//       orderId,
//       msn,
//       dto.planNo,
//       'PORT_IN',
//       simType,
//     );

//     return result;
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

//     if ('error' in result)
//       throw new AppError(result.error.message || 'Failed to update plan', 400);
//     if (result.return?.errorMessage)
//       throw new AppError(result.return.errorMessage, 400);

//     const orderId = result.return.orderId;

//     await this.orderModel.create({
//       orderId,
//       custNo,
//       msn: 'N/A',
//       planNo: dto.planNo,
//       agentId: 'SYSTEM',
//       status: 'PENDING',
//       orderType: 'PLAN_CHANGE',
//       orderAction: 'CHANGE_WME_PLAN',
//       lineSeqNo: dto.lineSeqNo,
//       custReqDate: this.getFormattedDate(),
//       rawRequest: requestBody,
//       rawResponse: result,
//     });

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

//     if (!('error' in result) && result.return?.status) {
//       await this.orderModel.updateOne(
//         { orderId },
//         {
//           $set: {
//             status: result.return.status,
//             errorMessage: result.return.errorMessage || null,
//             rawResponse: result,
//           },
//         },
//       );
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
// src/order/order.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';
import { ActivateNumberDto } from './dto/activate-number.dto';
import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { SoapResponse } from '../common/types/soap-response.type';
import { GoogleSheetsService } from '../google-sheets/google-sheets.service';
import { EmailService } from 'src/common/services/email.service';
interface OrderCreateResponse {
  orderId: string;
  errorMessage?: string;
}

interface OrderQueryResponse {
  status?: string;
  internalStatus?: string;
  errorMessage?: string;
}

@Injectable()
export class OrderService {
  constructor(
    private apiClient: ApiClientService,
    private configService: ConfigService,
    private googleSheetsService: GoogleSheetsService,
    private emailService: EmailService,
    @InjectModel(Order.name) private orderModel: Model<Order>,
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

  // async activateNumber(
  //   dto: ActivateNumberDto,
  // ): Promise<SoapResponse<OrderCreateResponse>> {
  //   this.validateCustomerData(dto, dto.number);

  //   const isEsim = !dto.simNo;
  //   const simType = isEsim ? 'eSIM' : 'Physical SIM';
  //   dto.agentId = '713';
  //   const requestBody = {
  //     createRequest: {
  //       custNo: dto.cust.custNo,
  //       orderType: 'SRVC_ORD',
  //       orderAction: 'ADD_WME_NEW',
  //       orderItems: {
  //         wmeNewReqItem: {
  //           lineType: 'R',
  //           lineName: 'SimplyBig Unlimited',
  //           planNo: dto.planNo,
  //           agentId: dto.agentId,
  //           orderItemAddress: {
  //             locality: dto.cust.suburb,
  //             postcode: dto.cust.postcode,
  //             streetName: dto.cust.address.split(',')[0]?.trim() || '',
  //             additionalAddress: dto.cust.address.substring(0, 10),
  //           },
  //           msn: dto.number,
  //           ...(dto.simNo
  //             ? { simNo: dto.simNo }
  //             : { isEsim: true, isQRcode: true }),
  //           cycleNo: '28',
  //           spendCode: '80610',
  //           notificationEmail: dto.cust.email,
  //         },
  //       },
  //     },
  //   };

  //   const result = await this.apiClient.soapCall<OrderCreateResponse>(
  //     '/UtbOrder',
  //     requestBody,
  //     'orderCreate',
  //   );

  //   if ('error' in result) {
  //     throw new AppError(
  //       result.error.message || 'Failed to activate number',
  //       400,
  //     );
  //   }
  //   if ('return' in result && result.return.errorMessage) {
  //     throw new AppError(result.return.errorMessage, 400);
  //   }

  //   const orderId = result.return.orderId;

  //   await this.orderModel.create({
  //     orderId,
  //     custNo: dto.cust.custNo,
  //     msn: dto.number,
  //     planNo: dto.planNo,
  //     agentId: dto.agentId || 'UNKNOWN',
  //     status: 'PENDING',
  //     orderType: 'NEW_ACTIVATION',
  //     orderAction: 'ADD_WME_NEW',
  //     simNo: dto.simNo,
  //     isEsim,
  //     isQRcode: isEsim,
  //     address: dto.cust.address,
  //     suburb: dto.cust.suburb,
  //     postcode: dto.cust.postcode,
  //     email: dto.cust.email,
  //     rawRequest: requestBody,
  //     rawResponse: result,
  //   });

  //   await this.syncOrderToGoogleSheets(
  //     dto.cust.custNo,
  //     orderId,
  //     dto.number,
  //     dto.planNo,
  //     'NEW_ACTIVATION',
  //     simType,
  //     { simNumber: dto.simNo },
  //   );

  //   return result;
  // }

  // async activatePortNumber(
  //   dto: ActivatePortNumberDto,
  // ): Promise<SoapResponse<OrderCreateResponse>> {
  //   this.validateCustomerData(dto, dto.number);

  //   if (!dto.numType || !['prepaid', 'postpaid'].includes(dto.numType))
  //     throw new AppError('Invalid number type', 400);
  //   if (dto.numType === 'prepaid' && !dto.cust.dob)
  //     throw new AppError('DOB required for prepaid port', 400);
  //   if (dto.numType === 'postpaid' && !dto.cust.arn)
  //     throw new AppError('ARN required for postpaid port', 400);

  //   const msn = dto.number.startsWith('0') ? dto.number : '0' + dto.number;
  //   const isEsim = !dto.simNo;
  //   const simType = isEsim ? 'eSIM' : 'Physical SIM';
  //   dto.agentId = '713';

  //   const requestBody = {
  //     createRequest: {
  //       custNo: dto.cust.custNo,
  //       orderType: 'SRVC_ORD',
  //       orderAction: 'ADD_WME_PORT',
  //       orderItems: {
  //         wmePortInReqItem: {
  //           lineType: 'R',
  //           lineName: 'SimplyBig Unlimited',

  //           planNo: dto.planNo,
  //           agentId: dto.agentId,

  //           orderItemAddress: {
  //             locality: dto.cust.suburb,
  //             postcode: dto.cust.postcode,
  //             streetName: dto.cust.address.split(',')[0]?.trim() || '',
  //             additionalAddress: dto.cust.address.substring(0, 10),
  //           },
  //           msn,
  //           ...(dto.simNo
  //             ? { simNo: dto.simNo }
  //             : { isEsim: true, isQRcode: true }),
  //           cycleNo: '28',
  //           spendCode: '80610',
  //           notificationEmail: dto.cust.email,
  //           ...(dto.numType === 'prepaid'
  //             ? { dob: dto.cust.dob }
  //             : { arn: dto.cust.arn }),
  //         },
  //       },
  //     },
  //   };

  //   const result = await this.apiClient.soapCall<OrderCreateResponse>(
  //     '/UtbOrder',
  //     requestBody,
  //     'orderCreate',
  //   );

  //   if ('error' in result) {
  //     throw new AppError(result.error.message || 'Failed to port number', 400);
  //   }
  //   if ('return' in result && result.return.errorMessage) {
  //     throw new AppError(result.return.errorMessage, 400);
  //   }

  //   const orderId = result.return.orderId;

  //   await this.orderModel.create({
  //     orderId,
  //     custNo: dto.cust.custNo,
  //     msn,
  //     planNo: dto.planNo,
  //     agentId: dto.agentId || 'UNKNOWN',
  //     status: 'PENDING',
  //     orderType: 'PORT_IN',
  //     orderAction: 'ADD_WME_PORT',
  //     simNo: dto.simNo,
  //     isEsim,
  //     isQRcode: isEsim,
  //     numType: dto.numType,
  //     dob: dto.numType === 'prepaid' ? dto.cust.dob : undefined,
  //     arn: dto.numType === 'postpaid' ? dto.cust.arn : undefined,
  //     address: dto.cust.address,
  //     suburb: dto.cust.suburb,
  //     postcode: dto.cust.postcode,
  //     email: dto.cust.email,
  //     rawRequest: requestBody,
  //     rawResponse: result,
  //   });

  //   await this.syncOrderToGoogleSheets(
  //     dto.cust.custNo,
  //     orderId,
  //     msn,
  //     dto.planNo,
  //     'PORT_IN',
  //     simType,
  //     { simNumber: dto.simNo },
  //   );

  //   return result;
  // }
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

    return result;
  }

  // async queryOrder(orderId: string): Promise<SoapResponse<OrderQueryResponse>> {
  //   if (!orderId) throw new AppError('Order ID required', 400);

  //   const result = await this.apiClient.soapCall<OrderQueryResponse>(
  //     '/UtbOrder',
  //     { request: { orderId } },
  //     'orderQuery',
  //   );

  //   if (!('error' in result) && 'return' in result && result.return?.status) {
  //     const status = result.return.status.toUpperCase();

  //     await this.orderModel.updateOne(
  //       { orderId },
  //       {
  //         $set: {
  //           status,
  //           errorMessage: result.return.errorMessage || null,
  //           rawResponse: result,
  //         },
  //       },
  //     );

  //     if (['ACTIVE', 'COMPLETED', 'SUCCESS'].includes(status)) {
  //       const order = await this.orderModel.findOne({ orderId });
  //       if (order) {
  //         this.googleSheetsService
  //           .updateCustomerRowByCustNo(order.custNo, {
  //             status: 'COMPLETED',
  //           })
  //           .catch(console.error);
  //       }
  //     }
  //   }

  //   return result;
  // }
 async queryOrder(orderId: string): Promise<SoapResponse<OrderQueryResponse>> {
  if (!orderId) throw new AppError('Order ID required', 400);

  const result = await this.apiClient.soapCall<OrderQueryResponse>(
    '/UtbOrder',
    { request: { orderId } },
    'orderQuery'
  );

  // If it's an error response, skip logic & return immediately
  if ("error" in result) {
    console.warn("SOAP returned error:", result.error);
    return result;
  }

  // ---- At this point, TypeScript knows "result" has "return" ----
  const ret = result.return;

  // internalStatus is inside orderQueryResponse, not root
  const payload =
    (ret as any).orderQueryResponse ??
    ret;

  const internalStatus =
    payload?.internalStatus ??
    payload?.status ??
    null;

  if (internalStatus) {
    const status = String(internalStatus).toUpperCase();

    // Handle numeric vs string orderId in DB
    const numericOrderId = Number(orderId);
    const filter = isNaN(numericOrderId)
      ? { orderId }
      : { orderId: numericOrderId };

    await this.orderModel.updateOne(
      filter,
      {
        $set: {
          status,
          errorMessage: payload?.errorMessage || null,
          rawResponse: result,
        },
      }
    );

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
