import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsOptional,
  IsMongoId,
  IsDefined,
  IsEnum,
  IsIP,
  IsNumber,
} from "class-validator";
import { TimeZones } from "src/enums/timezones.enum";
import { DurationEnum } from "../enums/duration.enum";
import { IpTypeEnum } from "../enums/ip-type.enum";

class IpDto {
  @IsIP()
  @IsDefined()
  @ApiProperty({
    type: String,
    example: "1.1.1.1",
    title: "Ip Address"
  })
  address: string;

  @IsNumber()
  @IsDefined()
  @ApiProperty({
    // type: Number,
    type: String,
    example: "/24",
    title: "IP range",
  })
  range: number;

  @IsEnum(IpTypeEnum)
  @IsDefined()
  @ApiProperty({
    enum: IpTypeEnum,
    example: IpTypeEnum.IPv4,
    title: "Ip Protocol Type"
  })
  type: IpTypeEnum;
}

export class ProductDataDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: "5ce45d7606444f199acfba1e",
    title: 'Id of the product/service owned by the user',
    description: 'Id of the product/service owned by the user'
  })
  id: string;

  @IsDefined()
  @ApiProperty({
    type: Object,
    additionalProperties: true,
    title: "Product options",
    example: {
      max_listeners: 15,
      hdd: '1G',
      station_name: 'MyStation'
    },
    description: 'Options are all the features of the specific product. Theses features include both the features of the product as chosen by the seller when creating the product, as well as any features selected by the user when buying the Prooduct. The <*>(key) is the name of the feature as a key and the value is of <b>any</b> type'
  })
  options: Record<string, any>;

  @IsDefined()
  @ApiProperty({
    type: Object,
    additionalProperties: {type: "string"},
    title: "Product meta",
    example: { station_id: "example_id", max_listeners: 15, disc_usage: "1G", },
    description: 'These are any/all information the provider requires to know about a specific product instance that is owned by a specific user. They are kept by the Hoster, and sent back on every post. The <*>(key) is the name of feature as a key and the value is the (description of the feature or)value of that feature.This information is stored on the Hoster and are sent back to the Provider in every POST'
  })
  meta: Record<string, any>;


  @IsDefined()
  @IsEnum(DurationEnum)
  @ApiProperty({
    enum: DurationEnum,
    title: "Duration in months",
    example: DurationEnum.ONE_YEAR,
    description: 'This is the duration of the subscription the user has to the product in months.'
  })
  duration: DurationEnum;

  @IsOptional()
  @ApiPropertyOptional({
    type: [IpDto],
    title: "The list of IPs connected to this product. Whether they are domains or others."
  })
  ips?: IpDto[];
}
