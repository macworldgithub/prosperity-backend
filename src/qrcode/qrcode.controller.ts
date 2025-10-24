import { Controller, Post, Get, Param, Body, Query, Res } from '@nestjs/common';
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
} from '@nestjs/swagger';
import { AppError } from 'src/common/errors/app-error';
@ApiTags('qrcodes')
@Controller('api/v1/qrcodes')
export class QrCodeController {
  constructor(private qrCodeService: QrCodeService) {}

  // @Post('generate')
  // @ApiOperation({ summary: 'Generate QR code for a number' })
  // @ApiBody({ type: Object, description: '{ number: string }' })
  // @ApiResponse({ status: 200, description: 'QR code generated successfully' })
  // async generateQRCode(@Body() body: { number: string }) {
  //   const result = await this.qrCodeService.getQRCode(body.number);
  //   return formatResponse(
  //     result.return || result,
  //     'QR code generated successfully',
  //   );
  // }

  // @Post('order/:orderId')
  // @ApiOperation({ summary: 'Generate QR code from order ID' })
  // @ApiParam({ name: 'orderId', description: 'Order ID' })
  // @ApiResponse({ status: 200, description: 'QR code generated successfully' })
  // async generateQRCodeFromOrder(@Param('orderId') orderId: string) {
  //   const result = await this.qrCodeService.getQRFromOrderId(orderId);
  //   return formatResponse(
  //     result.return || result,
  //     'QR code generated successfully',
  //   );
  // }

  // @Get('image')
  // @ApiOperation({ summary: 'Get QR code image' })
  // @ApiQuery({ name: 'data', description: 'Base64 encoded QR data' })
  // @ApiQuery({
  //   name: 'download',
  //   description: 'If present, force download',
  //   required: false,
  // })
  // @ApiResponse({ status: 200, description: 'QR code image' })
  // async getQRCodeImage(
  //   @Query('data') data: string,
  //   @Query('download') download: string,
  //   @Res() res: Response,
  // ) {
  //   const base64Data = decodeURIComponent(data);
  //   if (!base64Data) throw new AppError('No image data provided', 400);

  //   const imgBuffer = Buffer.from(base64Data, 'base64');

  //   if (download) {
  //     res.setHeader(
  //       'Content-Disposition',
  //       'attachment; filename=JustMobileQRCode.png',
  //     );
  //   }

  //   res.writeHead(200, {
  //     'Content-Type': 'image/png',
  //     'Content-Length': imgBuffer.length,
  //   });
  //   res.end(imgBuffer);
  // }
}
