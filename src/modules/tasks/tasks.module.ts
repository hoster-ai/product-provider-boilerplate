import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { AuthModule } from "../../auth/auth.module";
import { TasksService } from "./scheduler.service";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [
    /**your Controllers here*/
  ],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
