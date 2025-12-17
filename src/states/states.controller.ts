import { Controller, Post, Get } from '@nestjs/common';
import { StatesService } from './states.service';
interface State {
  name: string;
  code: string;
}

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  // POST /states/seed
  @Post('seed')
  addStates(): State[] {
    return this.statesService.addAustralianStates();
  }

  // GET /states
  @Get()
  getStates(): State[] {
    return this.statesService.getAllStates();
  }
}
