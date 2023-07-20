import { Strategy } from "passport-http-bearer";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  public async validate(token: string): Promise<string | Error> {
    //validate jwt token
    if (!token || token !== process.env.SERVICE_PROVIDER_TOKEN) {
      throw new UnauthorizedException();
    }

    return token;
  }
}
