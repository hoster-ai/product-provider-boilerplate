import {
  IsOptional,
  IsMongoId,
  IsDefined,
  IsEnum,
  IsIP,
  IsNumber,
} from "class-validator";
import { DurationEnum } from "../enums/duration.enum";
import { IpTypeEnum } from "../enums/ip-type.enum";

class IpDto {
  @IsIP()
  @IsDefined()
  address: string;

  @IsNumber()
  @IsDefined()
  range: number;

  @IsEnum(IpTypeEnum)
  @IsDefined()
  type: IpTypeEnum;
}

export class ProductDataDto {
  @IsOptional()
  @IsMongoId()
  id: string;

  @IsDefined()
  item_attributes: Record<string, any>;

  @IsDefined()
  addons: Record<string, any>;


  @IsDefined()
  @IsEnum(DurationEnum)
  duration: DurationEnum;

  @IsOptional()
  ips?: IpDto[];
}
