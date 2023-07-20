import { Server } from "../entities/servers.model";
import { AzuraServerService } from "../services/azura.servers.service";
export declare class FakeServerService {
    private readonly AzuraServerService;
    constructor(AzuraServerService: AzuraServerService);
    createServer(value: number, override?: Partial<Server>): Promise<Server[]>;
    makeServer(override?: Partial<Server>): Server;
}
