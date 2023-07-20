/* eslint-disable prettier/prettier */
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { LabelTypeEnum } from "../enums/label.type.enum";


export class FieldDto {
  @ApiProperty({
    description:
      "Id of the product/service feature.",
    example: "max_listeners",
  })
  id: string;

  @ApiProperty({
    description: "Name of the product/service feature.",
    example: "Max listeners",
    title: "Product Feature Name"
  })
  label: string;

  @ApiProperty({
    description:
      "Description of the product/service feature.",
    nullable: true,
    example: "Fill the value of the max listeners.",
    title: "Product Feature Description"
  })
  description?: string;

  @ApiProperty({
    // type: String || Number || Object|| null,
    oneOf: [
      { type: 'string' },
      { type: 'number' },
      { type: 'object', additionalProperties:true },
      { type: 'null'  }
    ],
    description: "Set default value of the product/service feature.",
    default: null,
    example: { listeners: 5, disc: "1G",},
    title: "Default Feature Value"

  })
  default?: string | number | Record<string,any>;

  @ApiProperty({
    type: String || Number || Object || null,
    description: "The input value of the product/service feature that user will fill.",
    example: { listeners: 10, disc: "4GB",},
    oneOf: [
      { type: 'string' },
      { type: 'number' },
      { type: 'object', additionalProperties:true }
    ],
    title: "Product Feature Value"
  })
  value: string | number | Record<string,any>;

  @ApiProperty({
    description: "product/service feature input type. i.e Radio,Text,Selector",
    example: LabelTypeEnum.RADIO_BOX,
    title: "Feature Input Type"
  })
  type: LabelTypeEnum;

  @ApiProperty({
    description: "product/service feature is required or not.",
    example: true,
    title: "Required"
  })
  required: boolean;

  @ApiProperty({
    description: "Set the product/service feature tag as disabled or not.",
    example: false,
    title: "Disabled"
  })
  disabled: boolean;

  @ApiProperty({
    description: "Set the product/service feature as hidden or not.",
    example: false,
    title: "Hidden"
  })
  hidden: boolean;

  @ApiProperty({
    description:
      "Set if regex validation is nessecary for the product/service feature.",
    example: "[A-Za-z]{3}",
    title: "Regex Validation Requirement"
  })
  regexValidation: string;

  @ApiProperty({
    description: "The error message return after regex validation.",
    nullable: true,
    example: "Please enter up to 15 digits for a contact number",
    title: "Error Regex Mesage"
  })
  regexValidationErrorMessage?: string;

  @ApiProperty({
    description:
      "If remote validation is set to true means the value of product/service feature the user entered awaits validation from the validation end point of the provider.",
    example: true,
    title: "Remote Validation"
  })
  remoteValidation: boolean;

}
