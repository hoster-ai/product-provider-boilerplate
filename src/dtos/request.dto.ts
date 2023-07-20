import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsObject, IsOptional } from "class-validator";
import { ProductDataDto as ProductDataDto } from "./product-data.dto";
import { UserDataDto as UserDataDto } from "./user-data.dto";

export class RequestDto {
  @IsDefined()
  @IsObject()
  @ApiProperty({ type: UserDataDto, description: "Here the Hoster sends the User's Data", title: 'User(Customer) Data' })
  userData: UserDataDto;

  @IsDefined()
  @IsObject()
  @ApiProperty({ type: ProductDataDto, title: 'Product/Service Data', description: "Here the Hoster sends the User's Product/service Data with any changes made." })
  productData: ProductDataDto;

  // @IsOptional()
  @IsDefined()
  @IsObject()
  @ApiProperty({ type: ProductDataDto, title: 'Previous Product/Service Data', description: "Here the Hoster sends the User's Product/Service Data as it was before any changes were requested.", })
  previousProductData?: ProductDataDto;
}

export class AddonsRequestDto {
  @ApiProperty({
    type: String,
    description: "id of Addon Feature that requires remote validation.",
    example: "station_name"
  })
  addonToBeValidated: string;

  @ApiProperty({
    type: Object,
    additionalProperties: true,
    description: "Addon Feature fields to be used for Remote Validation.The key is the id of the feature as a string and the value is of any type'",
    example: [
      {
        max_listeners_id: 15,
        hdd_id: '1G',
        station_name_id: 'MyStation'
      }
    ]
  })
  addonInfo: Record<string, any>;
}

export class ActionFieldsRequestDto {
  @ApiProperty({
    type: String,
    description: "id of specific product feature that requires remote validation.",
    example: "station_name"
  })
  actionFieldToBeValidated: string;

  @ApiProperty({
    type: Object,
    additionalProperties: true,
    description: "Product feature fields to be used for Remote Validation.The key is the id of the feature as a string and the value is of any type",
    example: [
      {
        max_listeners_id: 15,
        hdd_id: '1G',
        station_name_id: 'MyStation'
      }
    ]
  })
  actionFieldinfo: Record<string, any>;
}


