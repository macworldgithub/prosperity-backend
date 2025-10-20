import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { EscalationRequestDto, QueryRequestDto } from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request } from 'express'; // Import Request from express

// Define interface for the user object attached by JwtAuthGuard
interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    [key: string]: any; // Allow other properties if needed
  };
}

class QueryResponseDto {
  @ApiProperty({
    description: 'The response message from the chatbot',
    example: 'Hello! How can I assist you today?',
  })
  message: string;

  @ApiProperty({
    description: 'The session ID for the conversation',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  session_id: string;

  @ApiProperty({
    description: 'Suggested options or follow-up questions',
    example: ['Tech Support', 'Sales'],
    type: [String],
  })
  suggestions: string[];
}

class EscalateResponseDto {
  @ApiProperty({
    description: 'Confirmation message for escalation',
    example: "Your issue has been escalated to a live agent. We'll contact you soon!",
  })
  message: string;
}

class WelcomeResponseDto {
  @ApiProperty({
    description: 'Welcome message',
    example: "Welcome to JUSTmobile's Chatbot!",
  })
  message: string;
}

class ErrorResponseDto {
  @ApiProperty({
    description: 'Error status code',
    example: 500,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Error message',
    example: 'Error processing query: Some error message',
  })
  message: string;

  @ApiProperty({
    description: 'Error type',
    example: 'Internal server error',
  })
  error: string;
}

@ApiTags('chat')
@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('query')
  @ApiOperation({ summary: 'Process a chat query and get a response' })
  @ApiBody({ type: QueryRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Successful response with message, session ID, and suggestions',
    type: QueryResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error during query processing',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
  async queryChat(@Req() req: AuthenticatedRequest, @Body() request: QueryRequestDto) {
    try {
      const { message, session_id, suggestions } = await this.chatService.processQuery(req.user.userId, request);
      return { message, session_id, suggestions };
    } catch (e) {
      throw new HttpException(`Error processing query: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('escalate')
  @ApiOperation({ summary: 'Escalate an issue to a live agent' })
  @ApiBody({ type: EscalationRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Successful escalation confirmation',
    type: EscalateResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request body or email format',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error during escalation',
    type: ErrorResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
  async escalateIssue(@Req() req: AuthenticatedRequest, @Body() request: EscalationRequestDto) {
    try {
      const message = await this.chatService.processEscalation(req.user.userId, request);
      return { message };
    } catch (e) {
      throw new HttpException(`Error escalating issue: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get a welcome message for the chatbot' })
  @ApiResponse({
    status: 200,
    description: 'Welcome message',
    type: WelcomeResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
  async welcome() {
    return { message: "Welcome to JUSTmobile's Chatbot!" };
  }
}