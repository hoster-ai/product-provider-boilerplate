import { IsDefined, IsObject, IsOptional } from "class-validator";
import { ProductDataDto as ProductDataDto } from "./product-data.dto";
import { UserDataDto as UserDataDto } from "./user-data.dto";
import { OmitType, PartialType } from "@nestjs/swagger";
import { UnitDto } from "./unit.dto";

export class RequestDto {
  @IsDefined()
  @IsObject()
  userData: UserDataDto;

  @IsDefined()
  @IsObject()
  productData: ProductDataDto;

  @IsOptional()
  @IsObject()
  previousProductData?: ProductDataDto;
}

export class RequestCreateDto extends OmitType(RequestDto, [
  "previousProductData",
]) {}

export class ValidateRequestDto {
  userData: UserDataDto;
  productData: ProductDataDto;
  fieldToBeValidated: string;
  fields: Record<string, any>;
}

export class PayPerUseRequest {
  item_id: string;

  units: Record<keyof UnitDto["id"], number>[];
}

export class DynamicAddonRequest {
  addonOrAttributeToBeReturned: string;

  product_attributes: Record<string, any>;
}
