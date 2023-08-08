import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { CountryEnum } from "../enums/country.enum";

export class UserDataDto {
  @IsOptional()
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsMongoId()
  companyId?: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  telephone: string;

  @IsOptional()
  @IsPhoneNumber(null)
  mobile?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  address1: string;

  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  address2?: string;

  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  address3?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  postcode: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  city: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(CountryEnum)
  country: CountryEnum;

  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  state?: string;
}
