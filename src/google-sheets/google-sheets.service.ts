// // // src/google-sheets/google-sheets.service.ts

// // import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
// // import { ConfigService } from '@nestjs/config';
// // import { google, sheets_v4 } from 'googleapis';
// // import { GaxiosResponse } from 'gaxios'; // Keep this import for base type

// // @Injectable()
// // export class GoogleSheetsService implements OnModuleInit {
// //   private readonly logger = new Logger(GoogleSheetsService.name);
// //   private sheets!: sheets_v4.Sheets;
// //   private spreadsheetId!: string;

// //   constructor(private configService: ConfigService) {}

// //   async onModuleInit() {
// //     const keyFilePath = this.configService.get<string>(
// //       'GOOGLE_SHEETS_KEY_PATH',
// //     );
// //     const spreadsheetId = this.configService.get<string>(
// //       'GOOGLE_SPREADSHEET_ID',
// //     );

// //     if (!keyFilePath) {
// //       this.logger.error('GOOGLE_SHEETS_KEY_PATH is not set in .env');
// //       return;
// //     }
// //     if (!spreadsheetId) {
// //       this.logger.error('GOOGLE_SPREADSHEET_ID is not set in .env');
// //       return;
// //     }

// //     this.spreadsheetId = spreadsheetId;

// //     try {
// //       const auth = new google.auth.GoogleAuth({
// //         keyFile: keyFilePath,
// //         scopes: ['https://www.googleapis.com/auth/spreadsheets'],
// //       });

// //       const authClient = await auth.getClient();

// //       // FIX: Type assertion to bypass strict auth typing (common in googleapis v130+)
// //       this.sheets = google.sheets({
// //         version: 'v4',
// //         auth: authClient as any, // ← This resolves the overload error
// //       });

// //       this.logger.log('Google Sheets service initialized successfully');
// //     } catch (error) {
// //       this.logger.error('Failed to initialize Google Sheets', error.stack);
// //     }
// //   }

// //   async appendCustomer(row: any[]): Promise<void> {
// //     if (!this.sheets || !this.spreadsheetId) {
// //       this.logger.warn('Google Sheets not initialized – skipping sync');
// //       return;
// //     }

// //     try {
// //       // FIX: Use 'any' for response to avoid GaxiosResponseWithHTTP2 typing conflict
// //       const response: any = await this.sheets.spreadsheets.values.append({
// //         spreadsheetId: this.spreadsheetId,
// //         range: 'Sheet1!A:Z', // Adjust sheet name if needed
// //         valueInputOption: 'RAW',
// //         insertDataOption: 'INSERT_ROWS',
// //         requestBody: {
// //           values: [row],
// //         },
// //       });

// //       this.logger.log(
// //         `Customer synced to Google Sheets → ${row[1] || 'Unknown CustNo'}`,
// //       );
// //     } catch (error) {
// //       this.logger.error('Failed to append to Google Sheets', {
// //         error: error.message,
// //         stack: error.stack,
// //         rowPreview: row.slice(0, 3), // Log first 3 fields for debugging
// //       });
// //       // Don't re-throw – keep customer creation resilient
// //     }
// //   }
// // }

// // src/google-sheets/google-sheets.service.ts

// import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { google, sheets_v4 } from 'googleapis';

// @Injectable()
// export class GoogleSheetsService implements OnModuleInit {
//   private readonly logger = new Logger(GoogleSheetsService.name);
//   private sheets!: sheets_v4.Sheets;
//   private spreadsheetId!: string;

//   constructor(private configService: ConfigService) {}

//   async onModuleInit() {
//     const keyFilePath = this.configService.get<string>(
//       'GOOGLE_SHEETS_KEY_PATH',
//     );
//     const spreadsheetId = this.configService.get<string>(
//       'GOOGLE_SPREADSHEET_ID',
//     );

//     if (!keyFilePath || !spreadsheetId) {
//       this.logger.error(
//         'Missing GOOGLE_SHEETS_KEY_PATH or GOOGLE_SPREADSHEET_ID in .env',
//       );
//       return;
//     }

//     this.spreadsheetId = spreadsheetId;

//     try {
//       const auth = new google.auth.GoogleAuth({
//         keyFile: keyFilePath,
//         scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//       });

//       const authClient = await auth.getClient();

//       this.sheets = google.sheets({
//         version: 'v4',
//         auth: authClient as any,
//       });

//       this.logger.log('Google Sheets service initialized successfully');
//     } catch (error) {
//       this.logger.error(
//         'Failed to initialize Google Sheets client',
//         error.stack,
//       );
//     }
//   }

//   // Range used for all operations
//   private get sheetRange() {
//     return 'Sheet1!A:Z';
//   }

//   // Append new customer row
//   async appendCustomer(row: any[]): Promise<void> {
//     if (!this.sheets || !this.spreadsheetId) {
//       this.logger.warn('Google Sheets not initialized – skipping append');
//       return;
//     }

//     try {
//       await this.sheets.spreadsheets.values.append({
//         spreadsheetId: this.spreadsheetId,
//         range: this.sheetRange,
//         valueInputOption: 'RAW',
//         insertDataOption: 'INSERT_ROWS',
//         requestBody: { values: [row] },
//       });

//       this.logger.log(
//         `Appended new customer to Sheets → CustNo: ${row[1] || 'N/A'}`,
//       );
//     } catch (error: any) {
//       this.logger.error('Failed to append row to Google Sheets', {
//         error: error.message,
//         stack: error.stack,
//         rowPreview: row.slice(0, 5),
//       });
//     }
//   }

//   // Update existing row by custNo (Column B)
//   async updateCustomerRowByCustNo(
//     custNo: string,
//     updates: {
//       orderId?: string;
//       msn?: string;
//       planNo?: string;
//       orderType?: string;
//       status?: string;
//       simType?: string;
//       activatedAt?: string;
//     },
//   ): Promise<void> {
//     if (!this.sheets || !this.spreadsheetId || !custNo) {
//       this.logger.warn(
//         'Sheets not ready or custNo missing – skipping row update',
//       );
//       return;
//     }

//     try {
//       const response = await this.sheets.spreadsheets.values.get({
//         spreadsheetId: this.spreadsheetId,
//         range: this.sheetRange,
//       });

//       const rows = response.data.values;
//       if (!rows || rows.length <= 1) {
//         this.logger.warn('Sheet is empty or has no data rows');
//         return;
//       }

//       // Find row (skip header row)
//       let targetRowIndex = -1;
//       for (let i = 1; i < rows.length; i++) {
//         if (rows[i][1]?.toString().trim() === custNo.toString().trim()) {
//           targetRowIndex = i + 1; // 1-based index for Sheets API
//           break;
//         }
//       }

//       if (targetRowIndex === -1) {
//         this.logger.warn(
//           `custNo ${custNo} not found in Google Sheets – cannot update`,
//         );
//         return;
//       }

//       // Clone the row and apply updates
//       const rowToUpdate = [...(rows[targetRowIndex - 1] || [])];

//       // Column mapping (0-indexed in array, 1-indexed in sheet)
//       const COL = {
//         ORDER_ID: 17, // R
//         MSN: 18, // S
//         PLAN_NO: 19, // T
//         ORDER_TYPE: 20, // U
//         STATUS: 21, // V
//         SIM_TYPE: 22, // W
//         ACTIVATED_AT: 23, // X
//       };

//       if (updates.orderId) rowToUpdate[COL.ORDER_ID] = updates.orderId;
//       if (updates.msn) rowToUpdate[COL.MSN] = updates.msn;
//       if (updates.planNo) rowToUpdate[COL.PLAN_NO] = updates.planNo;
//       if (updates.orderType) rowToUpdate[COL.ORDER_TYPE] = updates.orderType;
//       if (updates.status) rowToUpdate[COL.STATUS] = updates.status || 'PENDING';
//       if (updates.simType) rowToUpdate[COL.SIM_TYPE] = updates.simType;
//       if (updates.activatedAt)
//         rowToUpdate[COL.ACTIVATED_AT] = updates.activatedAt;

//       // Write back the full row
//       await this.sheets.spreadsheets.values.update({
//         spreadsheetId: this.spreadsheetId,
//         range: `Sheet1!A${targetRowIndex}:Z${targetRowIndex}`,
//         valueInputOption: 'RAW',
//         requestBody: { values: [rowToUpdate] },
//       });

//       this.logger.log(
//         `Updated Google Sheets row → custNo: ${custNo} | Order: ${updates.orderId || 'N/A'}`,
//       );
//     } catch (error: any) {
//       this.logger.error('Failed to update customer row in Google Sheets', {
//         custNo,
//         updates,
//         error: error.message,
//         stack: error.stack,
//       });
//     }
//   }
// }

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, sheets_v4 } from 'googleapis';
import { PlanService } from '../plan/plan.service'; // ← ADD THIS IMPORT
@Injectable()
export class GoogleSheetsService implements OnModuleInit {
  private readonly logger = new Logger(GoogleSheetsService.name);
  private sheets!: sheets_v4.Sheets;
  private spreadsheetId!: string;

  constructor(
    private configService: ConfigService,
    private planService: PlanService, // ← INJECT PlanService
  ) {}

  async onModuleInit() {
    const keyFilePath = this.configService.get<string>(
      'GOOGLE_SHEETS_KEY_PATH',
    );
    const spreadsheetId = this.configService.get<string>(
      'GOOGLE_SPREADSHEET_ID',
    );

    if (!keyFilePath || !spreadsheetId) {
      this.logger.warn('Google Sheets config missing');
      return;
    }

    this.spreadsheetId = spreadsheetId;

    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: keyFilePath,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const client = await auth.getClient();
      this.sheets = google.sheets({ version: 'v4', auth: client as any });
      this.logger.log('Google Sheets service ready');
    } catch (err) {
      this.logger.error('Google Sheets init failed', err.stack);
    }
  }

  private get sheetRange() {
    return 'Sheet1!A:AH';
  }

  async appendCustomer(row: any[]): Promise<void> {
    if (!this.sheets || !this.spreadsheetId) return;

    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: this.sheetRange,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: [row] },
      });
    } catch (err: any) {
      this.logger.error('Failed to append customer row', err.message);
    }
  }

  async updateCustomerRowByCustNo(
    custNo: string,
    updates: {
      orderId?: string;
      msn?: string;
      planNo?: string;
      orderType?: 'NEW_ACTIVATION' | 'PORT_IN' | 'PLAN_CHANGE';
      status?: string;
      simType?: 'eSIM' | 'Physical SIM';
      simNumber?: string;
      paymentTokenId?: string; // ADD THIS
    },
  ): Promise<void> {
    if (!this.sheets || !this.spreadsheetId || !custNo) return;

    try {
      const res = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: this.sheetRange,
      });

      const rows = res.data.values;
      if (!rows || rows.length < 2) return;

      let targetRowIndex = -1;
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][26]?.toString().trim() === custNo.trim()) {
          targetRowIndex = i + 1;
          break;
        }
      }
      if (targetRowIndex === -1) return;

      const row = [...rows[targetRowIndex - 1]];

      const COL = {
        UPDATED_AT: 1,
        SIM_TYPE: 3,
        SIM_NUMBER: 4,
        NEW_EXISTING: 5,
        NEW_NUMBER: 6,
        SELECTED_PLAN: 20,
        PROVIDER: 22,
        PAYMENT_TOKEN: 23, // X → paymentToken
        ORDER_ID: 30,
        ACTIVATED: 31,
        PORTING_NUMBER: 27,
      };

      if (updates.orderId) row[COL.ORDER_ID] = updates.orderId;
      if (updates.msn) {
        row[COL.NEW_NUMBER] = updates.msn;
        if (updates.orderType === 'PORT_IN') {
          row[COL.PORTING_NUMBER] = updates.msn;
          row[COL.NEW_EXISTING] = 'Existing';
        } else {
          row[COL.NEW_EXISTING] = 'New';
        }
      }
      // if (updates.planNo) row[COL.SELECTED_PLAN] = updates.planNo;
      if (updates.planNo) {
        try {
          const plan = await this.planService.findOne(Number(updates.planNo));
          row[COL.SELECTED_PLAN] = plan.planName; // ← Save planName instead of planNo
        } catch (err) {
          // If plan not found in DB, fallback to just showing the planNo
          row[COL.SELECTED_PLAN] = updates.planNo;
          this.logger.warn(
            `Plan ${updates.planNo} not found in DB, falling back to planNo`,
          );
        }
      }
      if (updates.simType) row[COL.SIM_TYPE] = updates.simType;
      if (updates.simNumber) row[COL.SIM_NUMBER] = updates.simNumber;

      row[COL.ACTIVATED] = 'Yes';

      if (updates.paymentTokenId) {
        row[COL.PAYMENT_TOKEN] = updates.paymentTokenId;
      }
      row[COL.PROVIDER] = 'FlyingKiwi';
      row[COL.UPDATED_AT] = new Date().toISOString();

      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `Sheet1!A${targetRowIndex}:AH${targetRowIndex}`,
        valueInputOption: 'RAW',
        requestBody: { values: [row] },
      });

      this.logger.log(
        `Updated sheet for custNo: ${custNo} | Order: ${updates.orderId || 'N/A'}`,
      );
    } catch (err: any) {
      this.logger.error('Failed to update Google Sheet row', {
        custNo,
        error: err.message,
      });
    }
  }
}
