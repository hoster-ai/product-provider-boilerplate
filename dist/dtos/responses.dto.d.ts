import { ProviderInfoDto } from "./provider-info.dto";
export declare class BaseResponse {
    code: number;
    message: string;
}
export declare class InfoResponseDto extends BaseResponse {
    info: ProviderInfoDto;
}
export declare class MetaResponseDto extends BaseResponse {
    meta?: Record<string, any>;
}
export declare class TaskResponseDto extends BaseResponse {
    taskId: String;
}
export declare class ErrorResponseDto extends BaseResponse {
    errors?: string[] | string;
}
export declare class BooleanResponseDto extends BaseResponse {
    result: boolean;
}
