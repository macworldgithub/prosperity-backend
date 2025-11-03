// src/plan/plan.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { formatResponse } from '../common/utils/response-formatter';

@ApiTags('Plans')
@Controller('api/v1/plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  // GET /api/v1/plans
  @Get()
  @ApiOperation({ summary: 'Get all active plans' })
  @ApiResponse({ status: 200, description: 'List of plans' })
  async findAll() {
    const plans = await this.planService.getAllPlans();
    return formatResponse(plans, 'Plans retrieved successfully');
  }

  // GET /api/v1/plans/:planNo
  @Get(':planNo')
  @ApiOperation({ summary: 'Get plan by planNo' })
  @ApiParam({ name: 'planNo', example: 11144153 })
  @ApiResponse({ status: 200, description: 'Plan details' })
  async findOne(@Param('planNo') planNo: number) {
    const plan = await this.planService.findOne(planNo);
    return formatResponse(plan, 'Plan found');
  }

  // POST /api/v1/plans
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new plan' })
  @ApiBody({ type: CreatePlanDto })
  @ApiResponse({ status: 201, description: 'Plan created' })
  async create(@Body() createPlanDto: CreatePlanDto) {
    const plan = await this.planService.create(createPlanDto);
    return formatResponse(plan, 'Plan created successfully');
  }

  // PATCH /api/v1/plans/:planNo
  @Patch(':planNo')
  @ApiOperation({ summary: 'Update a plan' })
  @ApiParam({ name: 'planNo', example: 11144153 })
  @ApiBody({ type: UpdatePlanDto })
  @ApiResponse({ status: 200, description: 'Plan updated' })
  async update(
    @Param('planNo') planNo: number,
    @Body() updatePlanDto: UpdatePlanDto,
  ) {
    const plan = await this.planService.update(planNo, updatePlanDto);
    return formatResponse(plan, 'Plan updated successfully');
  }

  // DELETE /api/v1/plans/:planNo
  @Delete(':planNo')
  @HttpCode(200)
  @ApiOperation({ summary: 'Soft delete a plan' })
  @ApiParam({ name: 'planNo', example: 11144153 })
  @ApiResponse({ status: 200, description: 'Plan deleted' })
  async remove(@Param('planNo') planNo: number) {
    await this.planService.remove(planNo);
    return formatResponse(null, 'Plan deleted successfully');
  }

  // POST /api/v1/plans/sync
  @Post('sync')
  @HttpCode(200)
  @ApiOperation({ summary: 'Force sync plans from SOAP service' })
  @ApiResponse({ status: 200, description: 'Sync completed' })
  async sync() {
    const result = await this.planService.syncFromSoap();
    return formatResponse(result, 'Sync completed');
  }
}
