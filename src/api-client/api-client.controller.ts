import { Controller } from '@nestjs/common';
import { ApiClientService } from './api-client.service';

@Controller('api-client')
export class ApiClientController {
  constructor(private readonly apiClientService: ApiClientService) {}
}
