import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";

import { BearerStrategy } from "./bearer.strategy";
import { JwtModule, JwtService } from "@nestjs/jwt";
@Module({
  imports: [PassportModule, JwtModule],
  controllers: [],
  providers: [BearerStrategy, JwtService],
  exports: [BearerStrategy, JwtService],
})
export class AuthModule {}
