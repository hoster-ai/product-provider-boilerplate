import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
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
  @ApiProperty({
    type: String,
    description: "Id of the User",
    example: "5ce45d7606444f199acfba1e",
  })
  id: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    description: "Id of the company",
    example: "5ce45d7606444f199acfba1e",
  })
  companyId?: string;

  @IsDefined()
  @IsEmail()
  @ApiProperty({
    type: String,
    title: "Email",
    example: "email@example.com",
    description: "Email of the User/company"
  })
  email: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    title: "First Name",
    example: "Fname",
    description: "User's First name"
  })
  firstName: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    type: String,
    title: "Last Name",
    example: "Lname",
    description: "User's Last name"
  })
  lastName: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    type: Boolean,
    title: "Is company",
    example: false,
    default: false,
    description: "Indicates whether the user is a company or not"
  })
  isCompany?: boolean;

  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @ApiProperty({
    type: String,
    title: "Company Name",
    description: "The name of the Company. Is null or empty string if is not company"
  })
  companyName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber(null)
  @ApiProperty({
    type: String,
    title: "Telephone",
    example: "+30.2100000000",
    description: "User's phone number"
  })
  telephone: string;

  @IsOptional()
  @IsPhoneNumber(null)
  @ApiPropertyOptional({
    type: String,
    title: "Mobile",
    example: "+30.6900000000",
    description: "User's Mobile number"
  })
  mobile?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @ApiProperty({
    type: String,
    title: "Address 1",
    example: "Leof. Kon/nou Karamanli 45",
    description: "User's Main Address"
  })
  address1: string;

  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  @ApiPropertyOptional({
    type: String,
    title: "Address 2",
    example: "Leof. Kon/nou Karamanli 45",
    description: "User's Secondary Address"
  })
  address2?: string;

  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  @ApiPropertyOptional({
    type: String,
    title: "Address 3",
    example: "Leof. Kon/nou Karamanli 45",
    description: "User's Tertiary Address"
  })
  address3?: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  @ApiProperty({
    type: String,
    title: "Postal Code",
    example: "545454",
    description: "User's Postal code"
  })
  postcode: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @ApiProperty({
    type: String,
    title: "City",
    description: "User's City"
  })
  city: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEnum(CountryEnum)
  @ApiProperty({
    enum: CountryEnum,
    title: "Country Code",
    example: "GB",
    description: "User's country code"
  })
  country: CountryEnum;

  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  @ApiPropertyOptional({
    type: String,
    title: "State",
    description: "User's State"
  })
  state?: string;

  @IsOptional()
  @MaxLength(3)
  @ApiPropertyOptional({
    type: String,
    title: "Currency",
    example: "Euro",
    description: "User's selected currency"
  })
  currency?: string;
}
