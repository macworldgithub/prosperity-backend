import { Injectable } from '@nestjs/common';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';

@Injectable()
export class NumberService {
  constructor(private apiClient: ApiClientService) {}

  async reserveNumber() {
    const response = await this.apiClient.soapCall(
      '/UtbPooledResource',
      {
        reservePooledResourcesRequest: {
          resourceType: 'WME_MSN',
          numResources: '5',
        },
      },
      'reserveResources',
    );

    if (!response.return?.success) {
      throw new AppError('Failed to reserve numbers', 400);
    }

    const numbers = response.return.reservedPooledResources.map((num) => ({
      id: num.reservationId,
      number: num.resourceValue,
    }));

    return { numbers };
  }

  async selectNumber(number: string) {
    if (!number) throw new AppError('Number is required', 400);
    return await this.apiClient.soapCall(
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

  async checkNumber(number: string) {
    if (!number) throw new AppError('Number is required', 400);
    return await this.apiClient.soapCall(
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
