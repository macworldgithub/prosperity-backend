// import { Injectable } from '@nestjs/common';
// import { ApiClientService } from '../api-client/api-client.service';
// import { AppError } from '../common/errors/app-error';

// @Injectable()
// export class NumberService {
//   constructor(private apiClient: ApiClientService) {}

//   async reserveNumber() {
//     const response = await this.apiClient.soapCall(
//       '/UtbPooledResource',
//       {
//         reservePooledResourcesRequest: {
//           resourceType: 'WME_MSN',
//           numResources: '5',
//         },
//       },
//       'reserveResources',
//     );

//     if (!response.return?.success) {
//       throw new AppError('Failed to reserve numbers', 400);
//     }

//     const numbers = response.return.reservedPooledResources.map((num) => ({
//       id: num.reservationId,
//       number: num.resourceValue,
//     }));

//     return { numbers };
//   }

//   async selectNumber(number: string) {
//     if (!number) throw new AppError('Number is required', 400);
//     return await this.apiClient.soapCall(
//       '/UtbPooledResource',
//       {
//         selectPooledResourceRequest: {
//           resourceType: 'WME_MSN',
//           resource: number,
//         },
//       },
//       'selectResource',
//     );
//   }

//   async checkNumber(number: string) {
//     if (!number) throw new AppError('Number is required', 400);
//     return await this.apiClient.soapCall(
//       '/UtbPooledResource',
//       {
//         queryPooledResourcesRequest: {
//           queryValue: number,
//         },
//       },
//       'queryResources',
//     );
//   }
// }

import { Injectable } from '@nestjs/common';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';
import { SoapResponse } from '../common/types/soap-response.type';

interface ReserveResponse {
  success?: boolean;
  reservedPooledResources?: { reservationId: string; resourceValue: string }[];
}

interface SelectResponse {
  success?: boolean;
}

interface CheckResponse {
  available?: boolean;
  // add more fields if you know them from the WSDL
}

@Injectable()
export class NumberService {
  constructor(private readonly apiClient: ApiClientService) {}

  async reserveNumber(): Promise<{
    numbers: { id: string; number: string }[];
  }> {
    const response = await this.apiClient.soapCall<ReserveResponse>(
      '/UtbPooledResource',
      {
        reservePooledResourcesRequest: {
          resourceType: 'WME_MSN',
          numResources: '5',
        },
      },
      'reserveResources',
    );

    if (
      !response ||
      'error' in response ||
      !response.return ||
      !response.return.success
    ) {
      throw new AppError('Failed to reserve numbers', 400);
    }

    const reserved = response.return.reservedPooledResources ?? [];
    const numbers = reserved.map((num) => ({
      id: num.reservationId,
      number: num.resourceValue,
    }));

    return { numbers };
  }

  async selectNumber(number: string): Promise<SoapResponse<SelectResponse>> {
    if (!number) throw new AppError('Number is required', 400);

    return this.apiClient.soapCall<SelectResponse>(
      '/UtbPooledResource',
      {
        selectPooledResourceRequest: {
          resourceType: 'WME_MSN',
          resource: number,
        },
      },
      'selectResource',
    );
  }

  async checkNumber(number: string): Promise<SoapResponse<CheckResponse>> {
    if (!number) throw new AppError('Number is required', 400);

    return this.apiClient.soapCall<CheckResponse>(
      '/UtbPooledResource',
      {
        queryPooledResourcesRequest: {
          queryValue: number,
        },
      },
      'queryResources',
    );
  }
}
