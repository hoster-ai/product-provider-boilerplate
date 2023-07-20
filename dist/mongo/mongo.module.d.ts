import { OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
export declare class MongoModule implements OnModuleDestroy {
    private config;
    private connection;
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
