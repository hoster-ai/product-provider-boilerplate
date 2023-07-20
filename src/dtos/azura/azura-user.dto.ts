/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsString,
  IsArray,
  IsDate,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class AzuraUserDto {
  @IsString()
  id?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  new_password?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  locale?: string;

  @IsOptional()
  @IsString()
  theme?: string;

  @IsOptional()
  @IsBoolean()
  show_24_hour_time?: boolean;

  @IsOptional()
  @IsString()
  two_factor_secret?: string;

  @IsOptional()
  @IsDate()
  created_at?: Date | string;

  @IsOptional()
  @IsDate()
  updated_at?: Date | string;

  @IsOptional()
  @IsArray()
  roles?: string[];
}
