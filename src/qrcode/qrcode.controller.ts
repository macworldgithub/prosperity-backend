// // import { Controller, Post, Get, Param, Body, Query, Res } from '@nestjs/common';
// // import { QrCodeService } from './qrcode.service';
// // import { formatResponse } from '../common/utils/response-formatter';
// // import { Response } from 'express';
// // import {
// //   ApiTags,
// //   ApiOperation,
// //   ApiResponse,
// //   ApiParam,
// //   ApiQuery,
// //   ApiBody,
// // } from '@nestjs/swagger';
// // import { AppError } from 'src/common/errors/app-error';
// // @ApiTags('qrcodes')
// // @Controller('api/v1/qrcodes')
// // export class QrCodeController {
// //   constructor(private qrCodeService: QrCodeService) {}

// //   @Post('generate')
// //   @ApiOperation({ summary: 'Generate QR code for a number' })
// //   @ApiBody({ type: Object, description: '{ number: string }' })
// //   @ApiResponse({ status: 200, description: 'QR code generated successfully' })
// //   async generateQRCode(@Body() body: { number: string }) {
// //     const result = await this.qrCodeService.getQRCode(body.number);
// //     return formatResponse(
// //       result.return || result,
// //       'QR code generated successfully',
// //     );
// //   }

// //   @Post('order/:orderId')
// //   @ApiOperation({ summary: 'Generate QR code from order ID' })
// //   @ApiParam({ name: 'orderId', description: 'Order ID' })
// //   @ApiResponse({ status: 200, description: 'QR code generated successfully' })
// //   async generateQRCodeFromOrder(@Param('orderId') orderId: string) {
// //     const result = await this.qrCodeService.getQRFromOrderId(orderId);
// //     return formatResponse(
// //       result.return || result,
// //       'QR code generated successfully',
// //     );
// //   }

// //   @Get('image')
// //   @ApiOperation({ summary: 'Get QR code image' })
// //   @ApiQuery({ name: 'data', description: 'Base64 encoded QR data' })
// //   @ApiQuery({
// //     name: 'download',
// //     description: 'If present, force download',
// //     required: false,
// //   })
// //   @ApiResponse({ status: 200, description: 'QR code image' })
// //   async getQRCodeImage(
// //     @Query('data') data: string,
// //     @Query('download') download: string,
// //     @Res() res: Response,
// //   ) {
// //     const base64Data = decodeURIComponent(data);
// //     if (!base64Data) throw new AppError('No image data provided', 400);

// //     const imgBuffer = Buffer.from(base64Data, 'base64');

// //     if (download) {
// //       res.setHeader(
// //         'Content-Disposition',
// //         'attachment; filename=JustMobileQRCode.png',
// //       );
// //     }

// //     res.writeHead(200, {
// //       'Content-Type': 'image/png',
// //       'Content-Length': imgBuffer.length,
// //     });
// //     res.end(imgBuffer);
// //   }
// // }

// // src/qrcode/qrcode.controller.ts
// import {
//   Controller,
//   Post,
//   Get,
//   Param,
//   Body,
//   Query,
//   Res,
//   HttpCode,
// } from '@nestjs/common';
// import { QrCodeService } from './qrcode.service';
// import { formatResponse } from '../common/utils/response-formatter';
// import { Response } from 'express';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiParam,
//   ApiQuery,
//   ApiBody,
//   ApiConsumes,
//   ApiProduces,
// } from '@nestjs/swagger';
// import { AppError } from 'src/common/errors/app-error';
// import Gemerat
// import { GetQrImageQueryDto } from './dto/get-image-query.dto';

// @ApiTags('QR Codes')
// @Controller('api/v1/qrcodes')
// export class QrCodeController {
//   constructor(private qrCodeService: QrCodeService) {}

//   @Post('generate')
//   @HttpCode(200)
//   @ApiOperation({
//     summary: 'Generate QR code from mobile number (MSN)',
//     description:
//       'Fetches eSIM QR code details using the provided mobile number.',
//   })
//   @ApiBody({
//     type: GenerateQrDto,
//     description: 'Request body containing the mobile number',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'QR code data retrieved successfully',
//     schema: {
//       example: {
//         success: true,
//         message: 'QR code generated successfully',
//         data: {
//           qrCodeBase64: 'iVBORw0KGgoAAAANSUhEUgAA...',
//           lpa: 'LPA:1$...',
//           confirmationCode: 'ABC123',
//         },
//       },
//     },
//   })
//   @ApiResponse({
//     status: 400,
//     description: 'Invalid input or failed to generate QR',
//   })
//   async generateQRCode(@Body() body: GenerateQrDto) {
//     const result = await this.qrCodeService.getQRCode(body.number);
//     return formatResponse(
//       result.return || result,
//       'QR code generated successfully',
//     );
//   }

//   @Post('order/:orderId')
//   @HttpCode(200)
//   @ApiOperation({
//     summary: 'Generate QR code from order ID',
//     description: 'Fetches eSIM QR code using the order ID.',
//   })
//   @ApiParam({
//     name: 'orderId',
//     type: String,
//     description: 'Unique order identifier',
//     example: 'ORD-123456',
//   })
//   @ApiResponse({
//     status: 200,
//     description: 'QR code generated successfully from order ID',
//     schema: {
//       example: {
//         success: true,
//         message: 'QR code generated successfully',
//         data: {
//           qrCodeBase64: 'iVBORw0KGgoAAAANSUhEUgAA...',
//           lpa: 'LPA:1$...',
//         },
//       },
//     },
//   })
//   @ApiResponse({ status: 400, description: 'Order ID is required or invalid' })
//   async generateQRCodeFromOrder(@Param('orderId') orderId: string) {
//     const result = await this.qrCodeService.getQRFromOrderId(orderId);
//     return formatResponse(
//       result.return || result,
//       'QR code generated successfully',
//     );
//   }

//   @Get('image')
//   @ApiOperation({
//     summary: 'Serve QR code as PNG image',
//     description:
//       'Returns a PNG image from base64 data. Use `download=true` to force browser download.',
//   })
//   @ApiQuery({
//     name: 'data',
//     type: String,
//     required: true,
//     description: 'URL-encoded base64 string of the QR code image',
//     example: 'iVBORw0KGgoAAAANSUhEUgAA...',
//   })
//   @ApiQuery({
//     name: 'download',
//     type: String,
//     required: false,
//     description: 'Any value (e.g., "true") triggers file download',
//     example: 'true',
//   })
//   @ApiProduces('image/png')
//   @ApiResponse({
//     status: 200,
//     description: 'QR code image served successfully',
//     content: {
//       'image/png': {
//         schema: {
//           type: 'string',
//           format: 'binary',
//         },
//       },
//     },
//   })
//   @ApiResponse({ status: 400, description: 'No image data provided' })
//   async getQRCodeImage(
//     @Query() query: GetQrImageQueryDto,
//     @Res() res: Response,
//   ) {
//     const { data, download } = query;

//     if (!data) {
//       throw new AppError('No image data provided', 400);
//     }

//     const base64Data = decodeURIComponent(data);
//     const imgBuffer = Buffer.from(base64Data, 'base64');

//     if (download) {
//       res.setHeader(
//         'Content-Disposition',
//         'attachment; filename=JustMobileQRCode.png',
//       );
//     }

//     res.set({
//       'Content-Type': 'image/png',
//       'Content-Length': imgBuffer.length,
//       'Cache-Control': 'no-store',
//     });

//     res.status(200).send(imgBuffer);
//   }
// }

// src/qrcode/qrcode.controller.ts
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  Res,
  HttpCode,
} from '@nestjs/common';
import { QrCodeService } from './qrcode.service';
import { formatResponse } from '../common/utils/response-formatter';
import { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiConsumes,
  ApiProduces,
} from '@nestjs/swagger';
import { AppError } from 'src/common/errors/app-error';
import { GenerateQrDto } from './dto/generate-qr.dto';
import { GetQrImageQueryDto } from './dto/get-image-query.dto';

@ApiTags('QR Codes')
@Controller('api/v1/qrcodes')
export class QrCodeController {
  constructor(private qrCodeService: QrCodeService) {}

  @Post('generate')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Generate QR code from mobile number (MSN)',
    description:
      'Fetches eSIM QR code details using the provided mobile number.',
  })
  @ApiBody({
    type: GenerateQrDto,
    description: 'Request body containing the mobile number',
  })
  @ApiResponse({
    status: 200,
    description: 'QR code data retrieved successfully',
    schema: {
      example: {
        success: true,
        message: 'QR code generated successfully',
        data: {
          qrCodeBase64: 'iVBORw0KGgoAAAANSUhEUgAA...',
          lpa: 'LPA:1$...',
          confirmationCode: 'ABC123',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or failed to generate QR',
  })
  async generateQRCode(@Body() body: GenerateQrDto) {
    const result = await this.qrCodeService.getQRCode(body.number);
    return formatResponse(
      result.return || result,
      'QR code generated successfully',
    );
  }

  @Post('order/:orderId')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Generate QR code from order ID',
    description: 'Fetches eSIM QR code using the order ID.',
  })
  @ApiParam({
    name: 'orderId',
    type: String,
    description: 'Unique order identifier',
    example: 'ORD-123456',
  })
  @ApiResponse({
    status: 200,
    description: 'QR code generated successfully from order ID',
    schema: {
      example: {
        success: true,
        message: 'QR code generated successfully',
        data: {
          qrCodeBase64: 'iVBORw0KGgoAAAANSUhEUgAA...',
          lpa: 'LPA:1$...',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Order ID is required or invalid' })
  async generateQRCodeFromOrder(@Param('orderId') orderId: string) {
    const result = await this.qrCodeService.getQRFromOrderId(orderId);
    return formatResponse(
      result.return || result,
      'QR code generated successfully',
    );
  }

  @Get('image')
  @ApiOperation({
    summary: 'Serve QR code as PNG image',
    description:
      'Returns a PNG image from base64 data. Use `download=true` to force browser download.',
  })
  @ApiQuery({
    name: 'data',
    type: String,
    required: true,
    description: 'URL-encoded base64 string of the QR code image',
    example: 'iVBORw0KGgoAAAANSUhEUgAA...',
  })
  @ApiQuery({
    name: 'download',
    type: String,
    required: false,
    description: 'Any value (e.g., "true") triggers file download',
    example: 'true',
  })
  @ApiProduces('image/png')
  @ApiResponse({
    status: 200,
    description: 'QR code image served successfully',
    content: {
      'image/png': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'No image data provided' })
  async getQRCodeImage(
    @Query() query: GetQrImageQueryDto,
    @Res() res: Response,
  ) {
    const { data, download } = query;

    if (!data) {
      throw new AppError('No image data provided', 400);
    }

    const base64Data = decodeURIComponent(data);
    const imgBuffer = Buffer.from(base64Data, 'base64');

    if (download) {
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=JustMobileQRCode.png',
      );
    }

    res.set({
      'Content-Type': 'image/png',
      'Content-Length': imgBuffer.length,
      'Cache-Control': 'no-store',
    });

    res.status(200).send(imgBuffer);
  }
}
