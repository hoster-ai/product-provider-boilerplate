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
    title: "Item Attributes",
    example: {
      max_listeners: 15,
      hdd: '1G',
      station_name: 'MyStation'
    },
    description: 'item_attributes are all the attributes of the specific product. These are the attributes of the product as chosen by the seller when creating it. The key is the name of the attribute as a key and the value is of <b>any</b> type'
  })
  item_attributes: Record<string, any>;

  @IsDefined()
  @ApiProperty({
    type: Object,
    additionalProperties: true,
    title: "Item Addons",
    example: { station_id: "example_id", max_listeners: 15, disc_usage: "1G", },
    description: 'addons are all the addons of the specific product. These are the addons of the product as chosen by the customer during purchase. The key is the name of addon as a key and the value is of <b>any</b>.'
  })
  addons: Record<string, any>;


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
