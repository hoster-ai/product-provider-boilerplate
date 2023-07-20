import { AzuraClientService } from "./services/azura.client.service";
import { JwtPayloadRequest } from "./dtos/jwt-payload.request";
import { AzuraServerService } from "./services/azura.servers.service";
import { RequestDto } from "./dtos/request.dto";
import { BaseResponse } from "./dtos/responses.dto";
export declare class StationController {
    private readonly azuraClientService;
    private readonly azuraServerService;
    constructor(azuraClientService: AzuraClientService, azuraServerService: AzuraServerService);
    stationBroadcastStart(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<BaseResponse>;
    stationBroadcastStop(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<BaseResponse>;
    stationBroadcastRestart(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<BaseResponse>;
    stationAutoDJStart(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<BaseResponse>;
    stationAutoDJStop(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<BaseResponse>;
    stationAutoDJRestart(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<BaseResponse>;
    stationStatus(request: Request & JwtPayloadRequest, requestBody: RequestDto): Promise<BaseResponse>;
    private actionControll;
}
