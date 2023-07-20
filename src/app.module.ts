import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { HttpModule } from "@nestjs/axios";
import { MongoModule } from "./mongo/mongo.module";
import { AzuraService } from "./services/azura.service";
import { AzuraClientService } from "./services/azura.client.service";
import { AzuraServerService } from "./services/azura.servers.service";
import { ServerSettingsController } from "./server-settings.controller";
import { StationController } from "./station.controller";

@Module({
  imports: [
    MongoModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [AppController, ServerSettingsController, StationController],
  providers: [AzuraClientService, AzuraService, AzuraServerService],
})
export class AppModule {}
