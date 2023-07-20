import { IsObject } from "class-validator";

export class JwtPayloadRequest {
  @IsObject()
  user: {
    user_id: string;
    company_id: string;
    admin_rights: boolean;
    sender?: string;
  };
}
