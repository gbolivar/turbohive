import { IsString, IsOptional, IsNumber } from 'class-validator';

export class QrTaskDataDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsNumber()
  size?: number;
}
