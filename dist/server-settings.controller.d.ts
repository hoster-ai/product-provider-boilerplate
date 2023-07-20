import { MetaResponseDto, BaseResponse } from "./dtos/responses.dto";
import { AzuraServerService } from "./services/azura.servers.service";
import { Server } from "./entities/servers.model";
import { JwtPayloadRequest } from "./dtos/jwt-payload.request";
import { AzuraService } from "./services/azura.service";
export declare class ServerSettingsController {
    private readonly azuraServerService;
    private readonly azuraService;
    constructor(azuraServerService: AzuraServerService, azuraService: AzuraService);
    create(server: Server, request: Request & JwtPayloadRequest): Promise<Server>;
    findServers(request: JwtPayloadRequest): Promise<Server[]>;
    findServer(server_id: string, request: Request & JwtPayloadRequest): Promise<Server>;
    delete(server_id: string, request: Request & JwtPayloadRequest): Promise<BaseResponse>;
    update(server_id: string, requestBody: Pick<Server, "azura_url" | "azura_token">, request: Request & JwtPayloadRequest): Promise<MetaResponseDto>;
    private validateMongoId;
}
