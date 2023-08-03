import { IsDefined, IsObject } from "class-validator";
import { ProductDataDto as ProductDataDto } from "./product-data.dto";
import { UserDataDto as UserDataDto } from "./user-data.dto";

export class RequestDto {
  @IsDefined()
  @IsObject()
  userData: UserDataDto;

  @IsDefined()
  @IsObject()
  productData: ProductDataDto;

  // @IsOptional()
  @IsDefined()
  @IsObject()
  previousProductData?: ProductDataDto;
}

export class ValidateRequestDto {
  fieldToBeValidated: string;

  fields: Record<string, any>;
}

export class DynamicAddonRequest{

  addonOrAttributeToBeReturned: string;

 
  product_attributes: Record<string, any>;
}