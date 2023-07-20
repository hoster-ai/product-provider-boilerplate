import { ActionFieldsRequestDto, AddonsRequestDto, RequestDto } from "./dtos/request.dto";
import { MetaResponseDto, BooleanResponseDto, InfoResponseDto, TaskResponseDto, ErrorResponseDto } from "./dtos/responses.dto";
import { AzuraService as AzuraService } from "./services/azura.service";
import { AzuraClientService } from "./services/azura.client.service";
import { AzuraServerService } from "./services/azura.servers.service";
import { JwtPayloadRequest } from "./dtos/jwt-payload.request";
declare const RequestCreateDto_base: import("@nestjs/common").Type<Omit<RequestDto, "previousProductData">>;
export declare class RequestCreateDto extends RequestCreateDto_base {
}
declare const RequestOptionalPreviousDto_base: import("@nestjs/common").Type<Omit<RequestDto, "previousProductData"> & Partial<Omit<RequestDto, "userData" | "productData">>>;
export declare class RequestOptionalPreviousDto extends RequestOptionalPreviousDto_base {
}
export declare class AppController {
    private readonly azuraService;
    private readonly azuraClientService;
    private readonly azuraServerService;
    constructor(azuraService: AzuraService, azuraClientService: AzuraClientService, azuraServerService: AzuraServerService);
    info(request: Request & JwtPayloadRequest): Promise<InfoResponseDto | InfoResponseDto>;
    create(request: Request & JwtPayloadRequest, requestBody: RequestCreateDto): Promise<MetaResponseDto | MetaResponseDto | ErrorResponseDto>;
    renew(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<MetaResponseDto | MetaResponseDto | ErrorResponseDto>;
    upgrade(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<MetaResponseDto | MetaResponseDto | ErrorResponseDto>;
    downgrade(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto>;
    suspend(request: Request & JwtPayloadRequest, requestBody: RequestOptionalPreviousDto): Promise<MetaResponseDto | MetaResponseDto | ErrorResponseDto>;
    unsuspend(request: Request & JwtPayloadRequest, requestBody: RequestOptionalPreviousDto): Promise<MetaResponseDto | MetaResponseDto | ErrorResponseDto>;
    upgradable(requestBody: RequestDto): Promise<BooleanResponseDto | ErrorResponseDto>;
    downgradable(requestBody: RequestDto): Promise<BooleanResponseDto | ErrorResponseDto>;
    delete(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<BooleanResponseDto | ErrorResponseDto>;
    validateAddons(requestBody: AddonsRequestDto): Promise<BooleanResponseDto | ErrorResponseDto>;
    validateActionFields(request: Request & JwtPayloadRequest, requestBody: ActionFieldsRequestDto): Promise<BooleanResponseDto | ErrorResponseDto>;
    install(): Promise<BooleanResponseDto | ErrorResponseDto>;
    uninstall(): Promise<BooleanResponseDto | ErrorResponseDto>;
}
export {};
