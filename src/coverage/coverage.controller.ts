import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CoverageService } from './coverage.service';
import { CreateCoverageDto } from './dto/create-coverage.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('coverage')
@Controller('coverage')
export class CoverageController {
  constructor(private coverageService: CoverageService) {}

  @Get(':zip')
  @ApiOperation({ summary: 'Get coverage locations by ZIP code' })
  @ApiParam({
    name: 'zip',
    description: 'ZIP code to check coverage for',
    type: String,
  })
  // returns an array of coverage objects
  @ApiResponse({
    status: 200,
    description: 'Coverage locations for the ZIP code',
    type: [Object],
  })
  @ApiResponse({
    status: 404,
    description: 'No coverage found for the ZIP code',
  })
  async getByZip(@Param('zip') zip: string) {
    const coverages = await this.coverageService.findByZip(zip);
    if (!coverages || coverages.length === 0) {
      return { message: 'Coverage not found' };
    }
    return coverages;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new coverage record' })
  @ApiBody({ type: CreateCoverageDto })
  @ApiResponse({
    status: 201,
    description: 'Coverage created successfully',
    type: Object,
  })
  @ApiResponse({ status: 400, description: 'Invalid coverage data' })
  async create(@Body() createCoverageDto: CreateCoverageDto) {
    const coverage = await this.coverageService.create(createCoverageDto);
    return { message: 'Coverage created', coverage };
  }
}
