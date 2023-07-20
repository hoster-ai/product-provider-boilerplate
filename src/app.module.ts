import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { HttpModule } from "@nestjs/axios";
import { MongoModule } from "./mongo/mongo.module";


@Module({
  imports: [
    MongoModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
  ],
  controllers: [AppController, /**your Controllers here*/],
  providers: [/**your Services here */],
})
export class AppModule {}
