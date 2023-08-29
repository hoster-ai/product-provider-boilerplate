import { IsDefined, IsObject, IsOptional } from "class-validator";
import { ProductDataDto as ProductDataDto } from "./product-data.dto";
import { UserDataDto as UserDataDto } from "./user-data.dto";

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

export class ValidateRequestDto {
  userData: UserDataDto;
  productData: ProductDataDto;
  fieldToBeValidated: string;
  fields: Record<string, any>;
}

export class DynamicAddonRequest{

  addonOrAttributeToBeReturned: string;

 
  product_attributes: Record<string, any>;
}