import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { NumberService } from './number.service';
import { formatResponse } from '../common/utils/response-formatter';
import { SelectNumberDto } from './dto/select-number.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('numbers')
@Controller('api/v1/numbers')
export class NumberController {
  constructor(private numberService: NumberService) {}

  @Post('reserve')
  @ApiOperation({ summary: 'Reserve new numbers' })
  @ApiResponse({ status: 200, description: 'Numbers reserved successfully' })
  async reserveNumber() {
    const result = await this.numberService.reserveNumber();
    return formatResponse(result, 'Numbers reserved successfully');
  }

  @Post('select')
  @ApiOperation({ summary: 'Select a specific number' })
  @ApiBody({ type: SelectNumberDto })
  @ApiResponse({ status: 200, description: 'Number selected successfully' })
  async selectNumber(@Body() selectNumberDto: SelectNumberDto) {
    const result = await this.numberService.selectNumber(
      selectNumberDto.number,
    );
    return formatResponse(
      result.return || result,
      'Number selected successfully',
    );
  }

  @Get('check/:number')
  @ApiOperation({ summary: 'Check number availability' })
  @ApiParam({ name: 'number', description: 'Number to check' })
  @ApiResponse({
    status: 200,
    description: 'Number availability checked successfully',
  })
  async checkNumber(@Param('number') number: string) {
    const result = await this.numberService.checkNumber(number);
    return formatResponse(
      result.return || result,
      'Number availability checked successfully',
    );
  }
}
