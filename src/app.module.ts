import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { HttpModule } from "@nestjs/axios";
import { ScheduleModule } from "@nestjs/schedule";
import { CronService } from "./cron.service";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController /**your Controllers here*/],
  providers: [CronService /**your Services here */],
})
export class AppModule {}
