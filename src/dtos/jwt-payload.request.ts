import { IsObject } from "class-validator";

export class JwtPayloadRequest {
  @IsObject()
  user: {
    company_id: string;
    integration_id?: string;
  };
}
