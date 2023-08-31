import { ApiProperty, IntersectionType, OmitType, PartialType } from "@nestjs/swagger";
import { IsDefined, IsObject } from "class-validator";
import { ProductDataDto as ProductDataDto } from "./product-data.dto";
import { UserDataDto as UserDataDto } from "./user-data.dto";

export class RequestDto {
  @IsDefined()
  @IsObject()
  @ApiProperty({
    type: UserDataDto,
    description: "Here the Hoster sends the User's Data",
    title: "User(Customer) Data",
  })
  userData: UserDataDto;

  @IsDefined()
  @IsObject()
  @ApiProperty({
    type: ProductDataDto,
    title: "Product/Service Data",
    description:
      "Here the Hoster sends the User's Product/service Data with any changes made.",
  })
  productData: ProductDataDto;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    type: ProductDataDto,
    title: "Previous Product/Service Data",
    description:
      "Here the Hoster sends the User's Product/Service Data as it was before any changes were requested.",
  })
  previousProductData?: ProductDataDto;
}

export class RequestCreateDto extends OmitType(RequestDto, [
  "previousProductData",
] as const) {}


export class ValidateRequestDto {
  @IsDefined()
  @IsObject()
  @ApiProperty({
    type: UserDataDto,
    description: "Here the Hoster sends the User's Data",
    title: "User(Customer) Data",
  })
  userData: UserDataDto;

  @IsDefined()
  @IsObject()
  @ApiProperty({
    type: ProductDataDto,
    title: "Product/Service Data",
    description:
      "Here the Hoster sends the User's Product/service Data with any changes made.",
  })
  productData: ProductDataDto;
  @ApiProperty({
    type: String,
    description: "id of Addon Feature that requires remote validation.",
    example: "station_name",
  })
  fieldToBeValidated: string;

  @ApiProperty({
    type: Object,
    additionalProperties: true,
    description:
      "Addon Feature fields to be used for Remote Validation.The key is the id of the feature as a string and the value is of any type'",
    example: [
      {
        max_listeners_id: 15,
        hdd_id: "1G",
        station_name_id: "MyStation",
      },
    ],
  })
  fields: Record<string, any>;
}

export class DynamicAddonRequest {
  @ApiProperty({
    type: String,
    description: "id of Addon Feature that requires Dynamic load.",
    example: "station_name",
  })
  addonOrAttributeToBeReturned: string;

  @ApiProperty({
    type: Object,
    additionalProperties: true,
    title: "Product Attributes",
    example: {
      max_listeners: 15,
      hdd: "1G",
      station_name: "MyStation",
    },
    description:
      "Product_attributes are all the attributes of a specific product. These are the attributes of the product as chosen by the seller when creating it. The key is the name of the attribute as a key and the value is of <b>any</b> type",
  })
  product_attributes: Record<string, any>;
}
function IsOptional(): (
  target: RequestDto,
  propertyKey: "previousProductData"
) => void {
  throw new Error("Function not implemented.");
}
