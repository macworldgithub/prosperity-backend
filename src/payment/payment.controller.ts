import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { formatResponse } from '../common/utils/response-formatter';
import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
import { MakePaymentDto } from './dto/make-payment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('api/v1/payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('methods')
  @ApiOperation({ summary: 'Add a new payment method' })
  @ApiBody({ type: AddPaymentMethodDto })
  @ApiResponse({
    status: 201,
    description: 'Payment method added successfully',
  })
  async addPaymentMethod(@Body() addPaymentMethodDto: AddPaymentMethodDto) {
    const result =
      await this.paymentService.addPaymentMethod(addPaymentMethodDto);
    return formatResponse(
      result.return || result,
      'Payment method added successfully',
    );
  }

  @Post('process')
  @ApiOperation({ summary: 'Process a payment' })
  @ApiBody({ type: MakePaymentDto })
  @ApiResponse({ status: 200, description: 'Payment processed successfully' })
  async processPayment(@Body() makePaymentDto: MakePaymentDto) {
    const result = await this.paymentService.makePayment(makePaymentDto);
    return formatResponse(
      result.return || result,
      'Payment processed successfully',
    );
  }
}
