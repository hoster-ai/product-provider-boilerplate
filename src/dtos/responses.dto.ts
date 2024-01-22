import { IntegrationInfoDto } from "./provider-info.dto";
import { IsMongoId } from "class-validator";
import { FieldDto } from "./field.dto";

export class InfoResponseDto {
  info: IntegrationInfoDto;
}

export class SuccessResponseDto {
  @IsMongoId()
  id: string;

  item_data?: Record<string, any>;
}

export class TaskResponseDto {
  id: string;

  taskId: String;
}

export class ErrorResponseDto {
  id: string;
  errors?: string[] | string;
}

export class BooleanResponseDto {
  @IsMongoId()
  id: string;

  success?: boolean = true;
}

export class ValidateResponseDto {
  result: boolean;

  message?: string;

  fields?: FieldDto[];
}

export class DynamicAddonResponse {
  field: FieldDto;
}
