// // src/chat/dto.ts
// import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class QueryRequestDto {
//   @ApiProperty({
//     description: 'The query string from the user',
//     example: 'What are your mobile plans?',
//   })
//   @IsNotEmpty()
//   @IsString()
//   query: string;

//   @ApiProperty({
//     description: 'The session ID for the ongoing conversation (optional)',
//     example: '123e4567-e89b-12d3-a456-426614174000',
//     required: false,
//   })
//   @IsOptional()
//   @IsString()
//   session_id?: string;
// }

// export class EscalationRequestDto {
//   @ApiProperty({
//     description: 'The session ID for the conversation to escalate',
//     example: '123e4567-e89b-12d3-a456-426614174000',
//   })
//   @IsNotEmpty()
//   @IsString()
//   session_id: string;

//   @ApiProperty({
//     description: 'The full name of the customer',
//     example: 'John Doe',
//   })
//   @IsNotEmpty()
//   @IsString()
//   full_name: string;

//   @ApiProperty({
//     description: 'The email address of the customer',
//     example: 'john.doe@example.com',
//   })
//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   @ApiProperty({
//     description: 'The phone number of the customer',
//     example: '+1234567890',
//   })
//   @IsNotEmpty()
//   @IsString()
//   phone: string;

//   @ApiProperty({
//     description: 'A brief description of the issue to escalate',
//     example: 'Billing issue with incorrect charges',
//   })
//   @IsNotEmpty()
//   @IsString()
//   issue_description: string;
// }
// import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class QueryRequestDto {
//   @ApiProperty({
//     description: 'Customer query or message to Bele AI',
//     example: 'Why is my first bill higher than expected?',
//     minLength: 1,
//   })
//   @IsNotEmpty()
//   @IsString()
//   query: string;

//   @ApiProperty({
//     description: 'Session ID to maintain conversation context (optional for new conversations)',
//     example: '123e4567-e89b-12d3-a456-426614174000',
//     required: false,
//   })
//   @IsOptional()
//   @IsString()
//   session_id?: string;
// }

// export class EscalationRequestDto {
//   @ApiProperty({
//     description: 'Active session ID requiring escalation',
//     example: '123e4567-e89b-12d3-a456-426614174000',
//     minLength: 1,
//   })
//   @IsNotEmpty()
//   @IsString()
//   session_id: string;

//   @ApiProperty({
//     description: 'Customer\'s full name',
//     example: 'Jane Smith',
//     minLength: 1,
//   })
//   @IsNotEmpty()
//   @IsString()
//   full_name: string;

//   @ApiProperty({
//     description: 'Customer\'s email address (must be valid format)',
//     example: 'jane.smith@email.com',
//   })
//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   @ApiProperty({
//     description: 'Customer\'s phone number (Australian format preferred)',
//     example: '+61 400 123 456',
//   })
//   @IsNotEmpty()
//   @IsString()
//   phone: string;

//   @ApiProperty({
//     description: 'Brief description of the unresolved issue',
//     example: 'Billing dispute - double charged for first month',
//     minLength: 5,
//   })
//   @IsNotEmpty()
//   @IsString()
//   issue_description: string;
// }
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryRequestDto {
  @ApiProperty({
    description: 'Customer query or message to Bele AI',
    example: 'Who are you?',
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  query: string;

  @ApiProperty({
    description:
      'Session ID to maintain conversation context (optional for new conversations)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsString()
  session_id?: string;

  @ApiProperty({
    description:
      'Brand context (e.g., "justmobile", "flying-kiwi", "prosperity-tech")',
    example: 'flying-kiwi',
    required: false,
  })
  @IsOptional()
  @IsString()
  brand?: string;
}

export class EscalationRequestDto {
  @ApiProperty({
    description: 'Active session ID requiring escalation',
    example: '123e4567-e89b-12d3-a456-426614174000',
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  session_id: string;

  @ApiProperty({
    description: "Customer's full name",
    example: 'Jane Smith',
    minLength: 1,
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    description: "Customer's email address (must be valid format)",
    example: 'jane.smith@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Customer's phone number (Australian format preferred)",
    example: '+61 400 123 456',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Brief description of the unresolved issue',
    example: 'Billing dispute - double charged for first month',
    minLength: 5,
  })
  @IsNotEmpty()
  @IsString()
  issue_description: string;
}
