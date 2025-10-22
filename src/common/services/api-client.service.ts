import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

@Injectable()
export class ApiClientService {
  private readonly logger = new Logger(ApiClientService.name);
  private readonly config: any;
  private credentialsCache: {
    octane: { userName: string; password: string } | null;
    benzine: { userName: string; password: string } | null;
    lastUpdated: number;
  } = { octane: null, benzine: null, lastUpdated: 0 };

  constructor(private configService: ConfigService) {
    this.config = {
      server: {
        soap: `http://${this.configService.get('EC2IP')}:2000/service`,
        api: `http://${this.configService.get('EC2IP')}:2000/api`,
      },
      endpoints: {
        octane: 'https://api-octane.telcoinabox.com.au/tiabwsv2',
        benzine: 'https://benzine.telcoinabox.com:443/tiab',
      },
      credentials: {
        octane: {
          userName: this.configService.get('octaneUserName'),
          password: this.configService.get('octanePassword'),
        },
        benzine: {
          userName: this.configService.get('benzineUserName'),
          password: this.configService.get('benzinePassword'),
        },
      },
      groupNo: this.configService.get('groupNo'),
    };
  }

  private async getLoginDetails(apiUrl: string) {
    const isBenzine = apiUrl.includes('benzine');
    const cacheKey = isBenzine ? 'benzine' : 'octane';
    const now = Date.now();

    if (
      this.credentialsCache[cacheKey] &&
      now - this.credentialsCache.lastUpdated < 5 * 60 * 1000
    ) {
      return this.credentialsCache[cacheKey];
    }

    const loginDetails = isBenzine
      ? this.config.credentials.benzine
      : this.config.credentials.octane;

    this.credentialsCache[cacheKey] = loginDetails;
    this.credentialsCache.lastUpdated = now;
    return loginDetails;
  }

  async makeSoapRequest(endpoint: string, args: any, methodName: string) {
    const apiUrl = this.config.endpoints.octane;
    const login = await this.getLoginDetails(apiUrl);

    const requestBody = {
      url: `${apiUrl}${endpoint}?wsdl`,
      args: { ...args, login },
      methodName,
    };

    try {
      const response = await fetch(this.config.server.soap, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new HttpException(
          JSON.stringify(data) || 'External API request failed',
          response.status,
        );
      }

      return data;
    } catch (error) {
      this.logger.error('SOAP API Call error:', error);
      throw new HttpException(
        `External service error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async makeApiRequest(endpoint: string, args: any) {
    const apiUrl = this.config.endpoints.octane;
    const login = await this.getLoginDetails(apiUrl);

    const requestBody = {
      url: `${apiUrl}${endpoint}`,
      args: { ...args, login },
    };

    try {
      const response = await fetch(this.config.server.api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new HttpException(
          JSON.stringify(data) || 'External API request failed',
          response.status,
        );
      }

      return data;
    } catch (error) {
      this.logger.error('API Call error:', error);
      throw new HttpException(
        `External service error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
