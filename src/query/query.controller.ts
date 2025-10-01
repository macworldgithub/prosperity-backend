import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { QueryService } from './query.service';
import { ProcessQueryDto } from './dto/process-query.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('query')
@Controller('query')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class QueryController {
  constructor(private queryService: QueryService) {}

  @Post()
  @ApiOperation({ summary: 'Process a user query in a specific context (billQuery, addressUpdate, coverageCheck)' })
  @ApiBody({ type: ProcessQueryDto })
  @ApiResponse({ status: 200, description: 'Query processed successfully with response message', type: Object })
  @ApiResponse({ status: 400, description: 'Invalid query or context' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
  @ApiResponse({ status: 404, description: 'User or related data not found' })
  async process(@Body() processQueryDto: ProcessQueryDto, @Req() req) {
    return this.queryService.processQuery(processQueryDto.query, processQueryDto.context, req.user.userId);
  }
}