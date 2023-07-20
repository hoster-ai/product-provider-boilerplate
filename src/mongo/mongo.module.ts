import { Module, OnModuleDestroy } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Mongoose, connect, disconnect, set } from "mongoose";
// eslint-disable-next-line @typescript-eslint/no-var-requires

@Module({
  imports: [ConfigModule], //models
  controllers: [],
  providers: [ConfigService], //services
  exports: [],
})
export class MongoModule implements OnModuleDestroy {
  private connection: Mongoose;

  constructor(private config: ConfigService) {}

  async onModuleInit() {
    set("strictQuery", false);
    this.connection = await connect(this.config.get("MONGO_URL"));
  }
  async onModuleDestroy() {
    disconnect();
  }
}
