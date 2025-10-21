// import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
// import { ApiProperty } from '@nestjs/swagger';
// import { ChatService } from './chat.service';
// import { EscalationRequestDto, QueryRequestDto } from './dto';
// import {
//   ApiTags,
//   ApiOperation,
//   ApiResponse,
//   ApiBody,
//   ApiBadRequestResponse,
//   ApiInternalServerErrorResponse,
//   ApiBearerAuth,
// } from '@nestjs/swagger';
// import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
// import { Request } from 'express'; // Import Request from express

// // Define interface for the user object attached by JwtAuthGuard
// interface AuthenticatedRequest extends Request {
//   user: {
//     userId: string;
//     [key: string]: any; // Allow other properties if needed
//   };
// }

// class QueryResponseDto {
//   @ApiProperty({
//     description: 'The response message from the chatbot',
//     example: 'Hello! How can I assist you today?',
//   })
//   message: string;

//   @ApiProperty({
//     description: 'The session ID for the conversation',
//     example: '123e4567-e89b-12d3-a456-426614174000',
//   })
//   session_id: string;

//   @ApiProperty({
//     description: 'Suggested options or follow-up questions',
//     example: ['Tech Support', 'Sales'],
//     type: [String],
//   })
//   suggestions: string[];
// }

// class EscalateResponseDto {
//   @ApiProperty({
//     description: 'Confirmation message for escalation',
//     example: "Your issue has been escalated to a live agent. We'll contact you soon!",
//   })
//   message: string;
// }

// class WelcomeResponseDto {
//   @ApiProperty({
//     description: 'Welcome message',
//     example: "Welcome to JUSTmobile's Chatbot!",
//   })
//   message: string;
// }

// class ErrorResponseDto {
//   @ApiProperty({
//     description: 'Error status code',
//     example: 500,
//   })
//   statusCode: number;

//   @ApiProperty({
//     description: 'Error message',
//     example: 'Error processing query: Some error message',
//   })
//   message: string;

//   @ApiProperty({
//     description: 'Error type',
//     example: 'Internal server error',
//   })
//   error: string;
// }

// @ApiTags('chat')
// @Controller('chat')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
// export class ChatController {
//   constructor(private readonly chatService: ChatService) {}

//   @Post('query')
//   @ApiOperation({ summary: 'Process a chat query and get a response' })
//   @ApiBody({ type: QueryRequestDto })
//   @ApiResponse({
//     status: 200,
//     description: 'Successful response with message, session ID, and suggestions',
//     type: QueryResponseDto,
//   })
//   @ApiBadRequestResponse({
//     description: 'Invalid request body',
//     type: ErrorResponseDto,
//   })
//   @ApiInternalServerErrorResponse({
//     description: 'Internal server error during query processing',
//     type: ErrorResponseDto,
//   })
//   @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
//   async queryChat(@Req() req: AuthenticatedRequest, @Body() request: QueryRequestDto) {
//     try {
//       const { message, session_id, suggestions } = await this.chatService.processQuery(req.user.userId, request);
//       return { message, session_id, suggestions };
//     } catch (e) {
//       throw new HttpException(`Error processing query: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @Post('escalate')
//   @ApiOperation({ summary: 'Escalate an issue to a live agent' })
//   @ApiBody({ type: EscalationRequestDto })
//   @ApiResponse({
//     status: 200,
//     description: 'Successful escalation confirmation',
//     type: EscalateResponseDto,
//   })
//   @ApiBadRequestResponse({
//     description: 'Invalid request body or email format',
//     type: ErrorResponseDto,
//   })
//   @ApiInternalServerErrorResponse({
//     description: 'Internal server error during escalation',
//     type: ErrorResponseDto,
//   })
//   @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
//   async escalateIssue(@Req() req: AuthenticatedRequest, @Body() request: EscalationRequestDto) {
//     try {
//       const message = await this.chatService.processEscalation(req.user.userId, request);
//       return { message };
//     } catch (e) {
//       throw new HttpException(`Error escalating issue: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   @Get()
//   @ApiOperation({ summary: 'Get a welcome message for the chatbot' })
//   @ApiResponse({
//     status: 200,
//     description: 'Welcome message',
//     type: WelcomeResponseDto,
//   })
//   @ApiResponse({ status: 401, description: 'Unauthorized - Invalid or missing JWT' })
//   async welcome() {
//     return { message: "Welcome to JUSTmobile's Chatbot!" };
//   }
// }
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
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    [key: string]: any;
  };
}

class QueryResponseDto {
  @ApiProperty({
    description: 'The response message from Bele AI assistant',
    example: 'I understand you\'re asking about our mobile plans. We offer plans from $16.14/month with 5GB up to $59.89/month with 150GB. Is there anything else I can help with?',
  })
  message: string;

  @ApiProperty({
    description: 'The session ID for maintaining conversation context',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  session_id: string;

  @ApiProperty({
    description: 'Suggested follow-up questions or actions',
    example: ['View all plans', 'Check coverage', 'Activate eSIM'],
    type: [String],
  })
  suggestions: string[];
}

class EscalateResponseDto {
  @ApiProperty({
    description: 'Confirmation that issue has been escalated to live agent',
    example: "Your issue has been escalated to a live agent. We'll contact you soon!",
  })
  message: string;
}

class WelcomeResponseDto {
  @ApiProperty({
    description: 'Welcome message from Bele AI',
    example: "Welcome to JUSTmobile's Chatbot! I'm Bele, here to help 24/7. How can I assist you?",
  })
  message: string;
}

class ErrorResponseDto {
  @ApiProperty({ description: 'HTTP status code', example: 400 })
  statusCode: number;

  @ApiProperty({ description: 'Error message', example: 'Invalid email format' })
  message: string;

  @ApiProperty({ description: 'Error type', example: 'Bad Request' })
  error: string;
}

@ApiTags('Chat AI (Bele)')
@Controller('chat')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('query')
  @ApiOperation({ 
    summary: 'Send message to Bele AI and receive response',
    description: 'Process user query using JUSTmobile knowledge base. Maintains conversation context via session_id.'
  })
  @ApiBody({ type: QueryRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Successful AI response with conversation context',
    type: QueryResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request format',
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'AI service temporarily unavailable',
    type: ErrorResponseDto,
  })
  async queryChat(@Req() req: AuthenticatedRequest, @Body() request: QueryRequestDto) {
    try {
      const { message, session_id, suggestions } = await this.chatService.processQuery(req.user.userId, request);
      return { message, session_id, suggestions };
    } catch (e) {
      if (e instanceof HttpException) throw e;
      throw new HttpException(`Error processing query: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('escalate')
  @ApiOperation({ 
    summary: 'Escalate unresolved issue to live support agent',
    description: 'Transfers conversation to human agent with full context. Requires valid email format.'
  })
  @ApiBody({ type: EscalationRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Issue successfully escalated to live agent',
    type: EscalateResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid session, email format, or missing required fields',
    type: ErrorResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Escalation email delivery failed',
    type: ErrorResponseDto,
  })
  async escalateIssue(@Req() req: AuthenticatedRequest, @Body() request: EscalationRequestDto) {
    try {
      const message = await this.chatService.processEscalation(req.user.userId, request);
      return { message };
    } catch (e) {
      if (e instanceof HttpException) throw e;
      throw new HttpException(`Error escalating issue: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get welcome message from Bele AI' })
  @ApiResponse({
    status: 200,
    description: 'Initial greeting from chatbot',
    type: WelcomeResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or missing JWT token',
    type: ErrorResponseDto,
  })
  async welcome() {
    return { message: "Welcome to JUSTmobile's Chatbot! I'm Bele, here to help 24/7. How can I assist you?" };
  }
}