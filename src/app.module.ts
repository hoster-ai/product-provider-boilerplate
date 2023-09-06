import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { HttpModule } from "@nestjs/axios";
import { TasksService } from "./scheduler.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [AppController /**your Controllers here*/],
  providers: [TasksService /**your Services here */],
})
export class AppModule {}
