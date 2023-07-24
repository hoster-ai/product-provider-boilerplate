import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { ProviderInfoDto } from "./provider-info.dto";



export class InfoResponseDto {
  @ApiProperty({
    type: ProviderInfoDto,
  })
  info: ProviderInfoDto;
}

export class MetaResponseDto  {
  @ApiProperty({
    type: Object,
    additionalProperties: { type: 'string' },
    example: [{
      station_id: 'This is your Station Id',
      name: "This is your Station Name",
      login_email: "This is your Station Login Email for login via browser",
      login_password: "This is your Station Login Password for login via browser",
      login_url: "This is the Station Login Url",
      source_password: "This is your source password for streaming",
      port: "This is the Port used to connect to the specific azuracast station",
      mount_point: "This is the mountpoint of the specific Station",
    }],
    required: true,
    readOnly: true,
    description: "These are all necessary information of the product and are returned during product creation. The <*>(key) is the name of the information and the value(string) is the description of it. For example when an azuracast station product is created the returnMetaKeys will be station_id,name, login_url,login_email,login_password,source_password,port,mount_point.This information is stored on the Hoster and are sent back to the Provider in every POST"
  
  })
  meta?: Record<string, any>;
}

export class TaskResponseDto {
  @ApiProperty({
    type: String,
    required:true,
    readOnly: true,
    description: "This is the taskId returned by the provider when an operation cannot be done immediately by the provider, thus indicating that the operation has started."
  })
  taskId: String;
}

export class ErrorResponseDto  {
  @ApiResponseProperty({
    type: [String] || String,
    example: "Not implemented",
  })
  errors?: string[] | string;
}

export class BooleanResponseDto {
  @ApiResponseProperty({
    type: Boolean,
    example: true,
  })
  result: boolean;
}
