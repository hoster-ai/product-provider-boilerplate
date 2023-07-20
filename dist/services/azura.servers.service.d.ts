import { Server } from "../entities/servers.model";
export declare class AzuraServerService {
    private readonly serversModel;
    constructor();
    createServer(server: Server): Promise<Server | null>;
    findServersByCompanyId(company_id: string): Promise<Server[] | null>;
    urlExists(azura_url: string): Promise<boolean>;
    findServer(company_id: string, server_id: string): Promise<Server | null>;
    deleteServer(company_id: string, server_id: string): Promise<boolean>;
    updateServer(server_id: string, server: Server): Promise<boolean>;
    purge(): Promise<boolean>;
}
