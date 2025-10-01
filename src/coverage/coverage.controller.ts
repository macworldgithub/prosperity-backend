import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { CoverageService } from './coverage.service';
import { CreateCoverageDto } from './dto/create-coverage.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('coverage')
@Controller('coverage')
export class CoverageController {
  constructor(private coverageService: CoverageService) {}

  @Get(':zip')
  @ApiOperation({ summary: 'Get coverage details by ZIP code' })
  @ApiParam({ name: 'zip', description: 'ZIP code to check coverage for', type: String })
  @ApiResponse({ status: 200, description: 'Coverage details for the ZIP code', type: Object })
  @ApiResponse({ status: 404, description: 'Coverage not found for the ZIP code' })
  async getByZip(@Param('zip') zip: string) {
    const coverage = await this.coverageService.findByZip(zip);
    if (!coverage) {
      return { message: 'Coverage not found' };
    }
    return coverage;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new coverage record' })
  @ApiBody({ type: CreateCoverageDto })
  @ApiResponse({ status: 201, description: 'Coverage created successfully', type: Object })
  @ApiResponse({ status: 400, description: 'Invalid coverage data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
  async create(@Body() createCoverageDto: CreateCoverageDto) {
    const coverage = await this.coverageService.create(createCoverageDto);
    return { message: 'Coverage created', coverage };
  }
}