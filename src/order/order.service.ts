// // src/order/order.service.ts
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { ApiClientService } from '../api-client/api-client.service';
// import { AppError } from '../common/errors/app-error';
// import { ActivateNumberDto } from './dto/activate-number.dto';
// import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
// import { UpdatePlanDto } from './dto/update-plan.dto';
// import { InjectQueue } from '@nestjs/bull';
// import { Queue } from 'bull';

// @Injectable()
// export class OrderService {
//   constructor(
//     private apiClient: ApiClientService,
//     private configService: ConfigService,
//     @InjectQueue('order-activation') private orderQueue: Queue,
//   ) {}

//   private getFormattedDate() {
//     const date = new Date();
//     date.setDate(27);
//     const day = '27';
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   }

//   private validateCustomerData(customerData: any, number: string) {
//     if (!customerData?.cust?.custNo || !number)
//       throw new AppError('Invalid customer data or number', 400);
//     if (!customerData.cust.email)
//       throw new AppError('Customer email is required', 400);
//     if (!customerData.planNo)
//       throw new AppError('Plan number is required', 400);
//   }

//   async activateNumber(activateNumberDto: ActivateNumberDto) {
//     this.validateCustomerData(activateNumberDto, activateNumberDto.number);

//     const orderRequest = {
//       createRequest: {
//         custNo: activateNumberDto.cust.custNo,
//         orderType: 'SRVC_ORD',
//         orderAction: 'ADD_WME_NEW',
//         orderItems: {
//           wmeNewReqItem: {
//             lineType: 'R',
//             lineName: 'SimplyBig Unlimited',
//             planNo: activateNumberDto.planNo,
//             orderItemAddress: {
//               locality: activateNumberDto.cust.suburb,
//               postcode: activateNumberDto.cust.postcode,
//               streetName: activateNumberDto.cust.address.split(',')[0],
//               additionalAddress: activateNumberDto.cust.address.substring(
//                 0,
//                 10,
//               ),
//             },
//             msn: activateNumberDto.number,
//             ...(activateNumberDto.simNo
//               ? { simNo: activateNumberDto.simNo }
//               : { isEsim: true, isQRcode: true }),
//             cycleNo: '28',
//             spendCode: '80610',
//             notificationEmail: activateNumberDto.cust.email,
//           },
//         },
//       },
//     };

//     const result = await this.apiClient.soapCall(
//       '/UtbOrder',
//       orderRequest,
//       'orderCreate',
//     );
//     if (result.return.errorMessage) {
//       throw new AppError(
//         result.return.errorMessage || 'Failed to activate number',
//         400,
//       );
//     }

//     // Enqueue for watching
//     await this.orderQueue.add(
//       'watchOrder',
//       { cust: activateNumberDto.cust, orderNo: result.return.orderId },
//       {
//         jobId: `watch-${activateNumberDto.cust.custNo}`,
//         attempts: 100,
//         backoff: { type: 'fixed', delay: 60000 },
//         removeOnComplete: true,
//         removeOnFail: false,
//       },
//     );

//     return result;
//   }

//   async activatePortNumber(activatePortNumberDto: ActivatePortNumberDto) {
//     this.validateCustomerData(
//       activatePortNumberDto,
//       activatePortNumberDto.number,
//     );

//     if (
//       !activatePortNumberDto.numType ||
//       !['prepaid', 'postpaid'].includes(activatePortNumberDto.numType)
//     ) {
//       throw new AppError(
//         'Invalid number type. Must be either "prepaid" or "postpaid"',
//         400,
//       );
//     }

//     if (
//       activatePortNumberDto.numType === 'prepaid' &&
//       !activatePortNumberDto.cust.dob
//     ) {
//       throw new AppError('Date of birth is required for prepaid', 400);
//     }

//     if (
//       activatePortNumberDto.numType === 'postpaid' &&
//       !activatePortNumberDto.cust.arn
//     ) {
//       throw new AppError('ARN is required for postpaid', 400);
//     }

//     const wmePortInReqItem = {
//       lineType: 'R',
//       planNo: activatePortNumberDto.planNo,
//       orderItemAddress: {
//         locality: activatePortNumberDto.cust.suburb || 'BUDDINA',
//         postcode: activatePortNumberDto.cust.postcode || 4575,
//         streetName: activatePortNumberDto.cust.address.split(',')[0],
//         additionalAddress: activatePortNumberDto.cust.address.substring(0, 10),
//       },
//       msn: activatePortNumberDto.number.startsWith('0')
//         ? activatePortNumberDto.number
//         : '0' + activatePortNumberDto.number,
//       ...(activatePortNumberDto.simNo
//         ? { simNo: activatePortNumberDto.simNo }
//         : { isEsim: true, isQRcode: true }),
//       cycleNo: '28',
//       spendCode: '80610',
//       notificationEmail: activatePortNumberDto.cust.email,
//       ...(activatePortNumberDto.numType === 'prepaid'
//         ? { dob: activatePortNumberDto.cust.dob }
//         : { arn: activatePortNumberDto.cust.arn }),
//     };

//     const result = await this.apiClient.soapCall(
//       '/UtbOrder',
//       {
//         createRequest: {
//           custNo: activatePortNumberDto.cust.custNo,
//           orderType: 'SRVC_ORD',
//           orderAction: 'ADD_WME_PORT',
//           orderItems: { wmePortInReqItem },
//         },
//       },
//       'orderCreate',
//     );

//     if (result.return && result.return.errorMessage) {
//       throw new AppError(
//         result.return.errorMessage || 'Failed to activate ported number',
//         400,
//       );
//     }

//     // Enqueue for watching
//     await this.orderQueue.add(
//       'watchOrder',
//       { cust: activatePortNumberDto.cust, orderNo: result.return.orderId },
//       {
//         jobId: `watch-${activatePortNumberDto.cust.custNo}`,
//         attempts: 100,
//         backoff: { type: 'fixed', delay: 60000 },
//         removeOnComplete: true,
//         removeOnFail: false,
//       },
//     );

//     return result;
//   }

//   async updatePlan(updatePlanDto: UpdatePlanDto, custNo: string) {
//     if (!custNo || !updatePlanDto.planNo || !updatePlanDto.lineSeqNo) {
//       throw new AppError(
//         'Customer number, plan number, and line sequence number are required',
//         400,
//       );
//     }

//     return await this.apiClient.soapCall(
//       '/UtbOrder',
//       {
//         createRequest: {
//           custNo,
//           orderType: 'SRVC_ORD',
//           orderAction: 'CHANGE_WME_PLAN',
//           orderItems: {
//             wmeModifyPlanReqItem: {
//               lineSeqNo: updatePlanDto.lineSeqNo,
//               planno: updatePlanDto.planNo,
//               custReqDate: this.getFormattedDate(),
//             },
//           },
//         },
//       },
//       'orderCreate',
//     );
//   }

//   async queryOrder(orderId: string) {
//     if (!orderId) throw new AppError('Order ID is required', 400);
//     return await this.apiClient.soapCall(
//       '/UtbOrder',
//       { request: { orderId } },
//       'orderQuery',
//     );
//   }

//   async getPlans() {
//     return await this.apiClient.soapCall(
//       '/UtbPlan',
//       { group: { groupNo: this.configService.get('groupNo') } },
//       'getGroupPlans',
//     );
//   }
// }
// src/order/order.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';
import { ActivateNumberDto } from './dto/activate-number.dto';
import { ActivatePortNumberDto } from './dto/activate-port-number.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { SoapResponse } from '../common/types/soap-response.type';

interface OrderCreateResponse {
  orderId: string;
  errorMessage?: string;
}

interface OrderQueryResponse {
  status?: string;
}

interface PlanResponse {
  plans?: any[];
}

@Injectable()
export class OrderService {
  constructor(
    private apiClient: ApiClientService,
    private configService: ConfigService,
    @InjectQueue('order-activation') private orderQueue: Queue,
  ) {}

  private getFormattedDate() {
    const date = new Date();
    date.setDate(27);
    const day = '27';
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  private validateCustomerData(customerData: any, number: string) {
    if (!customerData?.cust?.custNo || !number)
      throw new AppError('Invalid customer data or number', 400);
    if (!customerData.cust.email)
      throw new AppError('Customer email is required', 400);
    if (!customerData.planNo)
      throw new AppError('Plan number is required', 400);
  }

  async activateNumber(
    dto: ActivateNumberDto,
  ): Promise<SoapResponse<OrderCreateResponse>> {
    this.validateCustomerData(dto, dto.number);

    const orderRequest = {
      createRequest: {
        custNo: dto.cust.custNo,
        orderType: 'SRVC_ORD',
        orderAction: 'ADD_WME_NEW',
        orderItems: {
          wmeNewReqItem: {
            lineType: 'R',
            lineName: 'SimplyBig Unlimited',
            planNo: dto.planNo,
            orderItemAddress: {
              locality: dto.cust.suburb,
              postcode: dto.cust.postcode,
              streetName: dto.cust.address.split(',')[0],
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
      orderRequest,
      'orderCreate',
    );

    // Fixed: safe access using 'return' in result
    if ('error' in result) {
      throw new AppError(
        result.error.message || 'Failed to activate number',
        400,
      );
    }
    if (result.return.errorMessage) {
      throw new AppError(result.return.errorMessage, 400);
    }

    await this.orderQueue.add(
      'watchOrder',
      { cust: dto.cust, orderNo: result.return.orderId },
      {
        jobId: `watch-${dto.cust.custNo}`,
        attempts: 100,
        backoff: { type: 'fixed', delay: 60000 },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    return result;
  }

  async activatePortNumber(
    dto: ActivatePortNumberDto,
  ): Promise<SoapResponse<OrderCreateResponse>> {
    this.validateCustomerData(dto, dto.number);

    if (!dto.numType || !['prepaid', 'postpaid'].includes(dto.numType)) {
      throw new AppError('Invalid number type', 400);
    }
    if (dto.numType === 'prepaid' && !dto.cust.dob) {
      throw new AppError('DOB required for prepaid', 400);
    }
    if (dto.numType === 'postpaid' && !dto.cust.arn) {
      throw new AppError('ARN required for postpaid', 400);
    }

    const wmePortInReqItem = {
      lineType: 'R',
      planNo: dto.planNo,
      orderItemAddress: {
        locality: dto.cust.suburb || 'BUDDINA',
        postcode: dto.cust.postcode || 4575,
        streetName: dto.cust.address.split(',')[0],
        additionalAddress: dto.cust.address.substring(0, 10),
      },
      msn: dto.number.startsWith('0') ? dto.number : '0' + dto.number,
      ...(dto.simNo ? { simNo: dto.simNo } : { isEsim: true, isQRcode: true }),
      cycleNo: '28',
      spendCode: '80610',
      notificationEmail: dto.cust.email,
      ...(dto.numType === 'prepaid'
        ? { dob: dto.cust.dob }
        : { arn: dto.cust.arn }),
    };

    const result = await this.apiClient.soapCall<OrderCreateResponse>(
      '/UtbOrder',
      {
        createRequest: {
          custNo: dto.cust.custNo,
          orderType: 'SRVC_ORD',
          orderAction: 'ADD_WME_PORT',
          orderItems: { wmePortInReqItem },
        },
      },
      'orderCreate',
    );

    // Fixed: safe access
    if ('error' in result) {
      throw new AppError(
        result.error.message || 'Failed to activate ported number',
        400,
      );
    }
    if (result.return.errorMessage) {
      throw new AppError(result.return.errorMessage, 400);
    }

    await this.orderQueue.add(
      'watchOrder',
      { cust: dto.cust, orderNo: result.return.orderId },
      {
        jobId: `watch-${dto.cust.custNo}`,
        attempts: 100,
        backoff: { type: 'fixed', delay: 60000 },
        removeOnComplete: true,
        removeOnFail: false,
      },
    );

    return result;
  }

  async updatePlan(dto: UpdatePlanDto, custNo: string): Promise<SoapResponse> {
    if (!custNo || !dto.planNo || !dto.lineSeqNo) {
      throw new AppError('custNo, planNo, lineSeqNo required', 400);
    }

    return this.apiClient.soapCall(
      '/UtbOrder',
      {
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
      },
      'orderCreate',
    );
  }

  async queryOrder(orderId: string): Promise<SoapResponse<OrderQueryResponse>> {
    if (!orderId) throw new AppError('Order ID required', 400);
    return this.apiClient.soapCall<OrderQueryResponse>(
      '/UtbOrder',
      { request: { orderId } },
      'orderQuery',
    );
  }

  async getPlans(): Promise<SoapResponse<PlanResponse>> {
    return this.apiClient.soapCall<PlanResponse>(
      '/UtbPlan',
      { group: { groupNo: this.configService.get('groupNo') } },
      'getGroupPlans',
    );
  }
}
