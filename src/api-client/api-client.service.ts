// import { Injectable, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { CredentialsService } from '../credentials/credentials.service';
// import { AppError } from '../common/errors/app-error';

// @Injectable()
// export class ApiClientService {
//   private readonly logger = new Logger(ApiClientService.name);
//   private config: any;
//   private credentialsCache = {
//     octane: null,
//     benzine: null,
//     lastUpdated: null,
//   };

//   constructor(
//     private configService: ConfigService,
//     private credentialsService: CredentialsService,
//   ) {
//     this.config = {
//       server: {
//         base: `http://${this.configService.get('EC2IP') || 'localhost'}:2000`,
//         soap: `http://${this.configService.get('EC2IP') || 'localhost'}:2000/service`,
//         api: `http://${this.configService.get('EC2IP') || 'localhost'}:2000/api`,
//       },
//       endpoints: {
//         octane: 'https://api-octane.telcoinabox.com.au/tiabwsv2',
//         benzine: 'https://benzine.telcoinabox.com:443/tiab',
//       },
//       credentials: {
//         octane: {
//           userName: this.configService.get('octaneUserName'),
//         },
//         benzine: {
//           userName: this.configService.get('benzineUserName'),
//         },
//       },
//       groupNo: this.configService.get('groupNo'),
//     };
//   }

//   async getLoginDetails(apiUrl: string) {
//     const isBenzine = apiUrl.includes('benzine');
//     const key = isBenzine ? 'benzine' : 'octane';
//     const userName = this.config.credentials[key].userName;

//     const now = Date.now();
//     if (
//       this.credentialsCache[key] &&
//       now - this.credentialsCache.lastUpdated < 5 * 60 * 1000
//     ) {
//       this.logger.log(`Using cached credentials for: ${userName}`);
//       return this.credentialsCache[key];
//     }

//     this.logger.log(`Fetching credentials for: ${userName}`);
//     const password = await this.credentialsService.getPassword(userName);

//     if (!password) {
//       throw new AppError(`Password not found for username: ${userName}`, 404);
//     }

//     this.credentialsCache[key] = { userName, password };
//     this.credentialsCache.lastUpdated = now;

//     return { userName, password };
//   }

//   async makeRequest(
//     endpoint: string,
//     args: any,
//     methodName: string | null = null,
//     isApi = false,
//   ) {
//     const server = isApi ? this.config.server.api : this.config.server.soap;
//     const apiUrl =
//       this.config.endpoints[
//         endpoint.includes('benzine') ? 'benzine' : 'octane'
//       ];
//     const login = await this.getLoginDetails(apiUrl);
//     const requestBody = {
//       url: isApi ? `${apiUrl}${endpoint}` : `${apiUrl}${endpoint}?wsdl`,
//       args: { ...args, login },
//       ...(methodName && { methodName }),
//     };

//     try {
//       this.logger.log('Making API Call:', { url: server, body: requestBody });
//       const response = await fetch(server, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody),
//       });
//       const data = await response.json();
//       this.logger.log('API Call Result:', data);
//       if (!response.ok) {
//         throw new AppError(
//           JSON.stringify(data) || 'External API request failed',
//           response.status,
//         );
//       }
//       return data;
//     } catch (error) {
//       this.logger.error('API Call error:', error);
//       if (error instanceof AppError) throw error;
//       throw new AppError(`External service error: ${error.message}`, 500);
//     }
//   }

//   async soapCall(endpoint: string, args: any, methodName: string) {
//     return this.makeRequest(endpoint, args, methodName, false);
//   }

//   async apiCall(endpoint: string, args: any) {
//     return this.makeRequest(endpoint, args, null, true);
//   }
// }

// src/api-client/api-client.service.ts
// import { Injectable, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { CredentialsService } from '../credentials/credentials.service';
// import { AppError } from '../common/errors/app-error';

// @Injectable()
// export class ApiClientService {
//   private readonly logger = new Logger(ApiClientService.name);
//   private config: any;
//   private credentialsCache: {
//     octane: { userName: string; password: string } | null;
//     benzine: { userName: string; password: string } | null;
//     lastUpdated: number | null;
//   } = {
//     octane: null,
//     benzine: null,
//     lastUpdated: null,
//   };

//   constructor(
//     private configService: ConfigService,
//     private credentialsService: CredentialsService,
//   ) {
//     this.config = {
//       server: {
//         base: `http://${this.configService.get('EC2IP') || 'localhost'}:2000`,
//         soap: `http://${this.configService.get('EC2IP') || 'localhost'}:2000/service`,
//         api: `http://${this.configService.get('EC2IP') || 'localhost'}:2000/api`,
//       },
//       endpoints: {
//         octane: 'https://api-octane.telcoinabox.com.au/tiabwsv2',
//         benzine: 'https://benzine.telcoinabox.com:443/tiab',
//       },
//       credentials: {
//         octane: {
//           userName: this.configService.get('octaneUserName'),
//         },
//         benzine: {
//           userName: this.configService.get('benzineUserName'),
//         },
//       },
//       groupNo: this.configService.get('groupNo'),
//     };
//   }

//   async getLoginDetails(apiUrl: string) {
//     const isBenzine = apiUrl.includes('benzine');
//     const key = isBenzine ? 'benzine' : 'octane';
//     const userName = this.config.credentials[key].userName;

//     const now = Date.now();
//     if (
//       this.credentialsCache[key] &&
//       this.credentialsCache.lastUpdated !== null &&
//       now - this.credentialsCache.lastUpdated < 5 * 60 * 1000
//     ) {
//       this.logger.log(`Using cached credentials for: ${userName}`);
//       return this.credentialsCache[key];
//     }

//     this.logger.log(`Fetching credentials for: ${userName}`);
//     // const password = await this.credentialsService.getPassword(userName);
//     const password = 'BNMHJK678%^$&4d';

//     if (!password) {
//       throw new AppError(`Password not found for username: ${userName}`, 404);
//     }

//     this.credentialsCache[key] = { userName, password };
//     this.credentialsCache.lastUpdated = now;

//     return { userName, password };
//   }

//   async makeRequest(
//     endpoint: string,
//     args: any,
//     methodName: string | null = null,
//     isApi = false,
//   ) {
//     const server = isApi ? this.config.server.api : this.config.server.soap;
//     const apiUrl =
//       this.config.endpoints[
//         endpoint.includes('benzine') ? 'benzine' : 'octane'
//       ];
//     const login = await this.getLoginDetails(apiUrl);
//     const requestBody = {
//       url: isApi ? `${apiUrl}${endpoint}` : `${apiUrl}${endpoint}?wsdl`,
//       args: { ...args, login },
//       ...(methodName && { methodName }),
//     };

//     try {
//       this.logger.log('Making API Call:', { url: server, body: requestBody });
//       const response = await fetch(server, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestBody),
//       });
//       const data = await response.json();
//       this.logger.log('API Call Result:', data);
//       if (!response.ok) {
//         throw new AppError(
//           JSON.stringify(data) || 'External API request failed',
//           response.status,
//         );
//       }
//       return data;
//     } catch (error) {
//       this.logger.error('API Call error:', error);
//       if (error instanceof AppError) throw error;
//       throw new AppError(`External service error: ${error.message}`, 500);
//     }
//   }

//   async soapCall(endpoint: string, args: any, methodName: string) {
//     return this.makeRequest(endpoint, args, methodName, false);
//   }

//   async apiCall(endpoint: string, args: any) {
//     return this.makeRequest(endpoint, args, null, true);
//   }
// }

// src/api-client/api-client.service.ts
// import { Injectable, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { CredentialsService } from '../credentials/credentials.service';
// import { AppError } from '../common/errors/app-error';
// import * as soap from 'soap';
// import { SoapResponse } from '../common/types/soap-response.type';

// @Injectable()
// export class ApiClientService {
//   private readonly logger = new Logger(ApiClientService.name);
//   private config: any;
//   private credentialsCache: {
//     octane: { userName: string; password: string } | null;
//     benzine: { userName: string; password: string } | null;
//     lastUpdated: number | null;
//   } = { octane: null, benzine: null, lastUpdated: null };

//   constructor(
//     private configService: ConfigService,
//     private credentialsService: CredentialsService,
//   ) {
//     this.config = {
//       endpoints: {
//         octane: 'https://api-octane.telcoinabox.com.au/tiabwsv2',
//         benzine: 'https://benzine.telcoinabox.com:443/tiab',
//       },
//       credentials: {
//         octane: { userName: this.configService.get('octaneUserName') },
//         benzine: { userName: this.configService.get('benzineUserName') },
//       },
//     };
//   }

//   private async getLoginDetails(apiUrl: string) {
//     const isBenzine = apiUrl.includes('benzine');
//     const key = isBenzine ? 'benzine' : 'octane';
//     const userName = this.config.credentials[key].userName;

//     const now = Date.now();
//     if (
//       this.credentialsCache[key] &&
//       this.credentialsCache.lastUpdated &&
//       now - this.credentialsCache.lastUpdated < 5 * 60 * 1000
//     ) {
//       this.logger.log(`Using cached credentials for: ${userName}`);
//       return this.credentialsCache[key]!;
//     }

//     this.logger.log(`Fetching credentials for: ${userName}`);
//     // const password = await this.credentialsService.getPassword(userName);
//     const password = this.configService.get('octanePassword');
//     // const password = 'BNMHJK678%^$&4d';
//     if (!password)
//       throw new AppError(`Password not found for ${userName}`, 404);

//     this.credentialsCache[key] = { userName, password };
//     this.credentialsCache.lastUpdated = now;
//     return this.credentialsCache[key]!;
//   }

//   /** Generic SOAP call – returns typed response */
//   async soapCall<T = any>(
//     endpoint: string,
//     args: any,
//     methodName: string,
//   ): Promise<SoapResponse<T>> {
//     const isBenzine = endpoint.includes('benzine');
//     const baseUrl = this.config.endpoints[isBenzine ? 'benzine' : 'octane'];
//     const wsdlUrl = `${baseUrl}${endpoint}?wsdl`;
//     const login = await this.getLoginDetails(baseUrl);

//     this.logger.log(`SOAP client → ${wsdlUrl}`);
//     const client = await soap.createClientAsync(wsdlUrl).catch((err) => {
//       throw new AppError(`WSDL load failed: ${err.message}`, 502);
//     });

//     const fullArgs = { ...args, login };

//     return new Promise((resolve, reject) => {
//       client[methodName](fullArgs, (err: any, result: any) => {
//         if (err) {
//           this.logger.error(`SOAP ${methodName} error`, err);
//           return reject(new AppError(err.message || 'SOAP call failed', 500));
//         }
//         this.logger.log(`SOAP ${methodName} success`, result);
//         resolve(result as SoapResponse<T>);
//       });
//     });
//   }
// }

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CredentialsService } from '../credentials/credentials.service';
import { AppError } from '../common/errors/app-error';
import * as soap from 'soap';
import { SoapResponse } from '../common/types/soap-response.type';
import fetch from 'node-fetch';
@Injectable()
export class ApiClientService {
  private readonly logger = new Logger(ApiClientService.name);
  private config: any;
  private credentialsCache: {
    octane: { userName: string; password: string } | null;
    benzine: { userName: string; password: string } | null;
    lastUpdated: number | null;
  } = { octane: null, benzine: null, lastUpdated: null };

  constructor(
    private configService: ConfigService,
    private credentialsService: CredentialsService,
  ) {
    this.config = {
      endpoints: {
        octane: 'https://api-octane.telcoinabox.com.au/tiabwsv2',
        benzine: 'https://benzine.telcoinabox.com:443/tiab',
      },
      credentials: {
        octane: { userName: this.configService.get('octaneUserName') },
        benzine: { userName: this.configService.get('benzineUserName') },
      },
    };
  }

  private async getLoginDetails(apiUrl: string) {
    const isBenzine = apiUrl.includes('benzine');
    const key = isBenzine ? 'benzine' : 'octane';
    const userName = this.config.credentials[key].userName;

    const now = Date.now();
    if (
      this.credentialsCache[key] &&
      this.credentialsCache.lastUpdated &&
      now - this.credentialsCache.lastUpdated < 5 * 60 * 1000
    ) {
      this.logger.log(`Using cached credentials for: ${userName}`);
      return this.credentialsCache[key]!;
    }

    this.logger.log(`Fetching credentials for: ${userName}`);
    const password = this.configService.get('octanePassword');
    if (!password)
      throw new AppError(`Password not found for ${userName}`, 404);

    this.credentialsCache[key] = { userName, password };
    this.credentialsCache.lastUpdated = now;
    return this.credentialsCache[key]!;
  }

  /** Generic SOAP call – returns typed response */
  async soapCall<T = any>(
    endpoint: string,
    args: any,
    methodName: string,
  ): Promise<SoapResponse<T>> {
    const isBenzine = true;
    const baseUrl = this.config.endpoints[isBenzine ? 'benzine' : 'octane'];
    const wsdlUrl = `${baseUrl}${endpoint}?wsdl`;
    const login = await this.getLoginDetails(baseUrl);

    this.logger.log(`SOAP client → ${wsdlUrl}`);
    const client = await soap.createClientAsync(wsdlUrl).catch((err) => {
      throw new AppError(`WSDL load failed: ${err.message}`, 502);
    });

    const fullArgs = { ...args, login };

    return new Promise((resolve, reject) => {
      client[methodName](fullArgs, (err: any, result: any) => {
        if (err) {
          this.logger.error(`SOAP ${methodName} error`, err);
          return reject(new AppError(err.message || 'SOAP call failed', 500));
        }
        this.logger.log(`SOAP ${methodName} success`, result);
        resolve(result as SoapResponse<T>);
      });
    });
  }

  /** ✅ Generic REST API Call (used by Payment & QRCode Services) */
  /** ✅ Generic REST API Call (used by Payment & QRCode Services) */
  // async apiCall<T = any>(
  //   path: string,
  //   body?: any,
  //   method: string = 'POST',
  // ): Promise<T> {
  //   const { default: fetch } = await import('node-fetch'); // 👈 dynamic import fix

  //   const baseUrl = this.configService.get('apiBaseUrl');
  //   const url = `${baseUrl}${path}`;

  //   this.logger.log(`API call → ${method} ${url}`);

  //   const response = await fetch(url, {
  //     method,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Basic ${Buffer.from(
  //         `${this.configService.get('octaneUserName')}:${this.configService.get(
  //           'octanePassword',
  //         )}`,
  //       ).toString('base64')}`,
  //     },
  //     body: body ? JSON.stringify(body) : undefined,
  //   }).catch((err) => {
  //     this.logger.error(`API call failed: ${err.message}`);
  //     throw new AppError(`API call failed: ${err.message}`, 500);
  //   });

  //   if (!response.ok) {
  //     const errorText = await response.text();
  //     this.logger.error(`API error response: ${errorText}`);
  //     throw new AppError(
  //       `API responded with status ${response.status}`,
  //       response.status,
  //     );
  //   }

  //   const data = (await response.json()) as T;
  //   this.logger.log(`API ${method} success`, data);
  //   return data;
  // }
  async apiCall<T = any>(
    path: string,
    body?: any,
    method: string = 'POST',
  ): Promise<T> {
    const baseUrl = this.configService.get('apiBaseUrl');
    const url = `${baseUrl}${path}`;

    this.logger.log(`API call → ${method} ${url}`);

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${this.configService.get('octaneUserName')}:${this.configService.get('octanePassword')}`,
        ).toString('base64')}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`API error response: ${errorText}`);
      throw new AppError(
        `API responded with status ${response.status}`,
        response.status,
      );
    }

    const data = (await response.json()) as T;
    this.logger.log(`API ${method} success`, data);
    return data;
  }
}
