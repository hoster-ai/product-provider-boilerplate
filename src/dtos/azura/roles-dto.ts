import { IsArray, IsOptional, IsString } from "class-validator";

export class rolesDto {
  @IsOptional()
  @IsString()
  id?: string;
  @IsString()
  name: string;
  @IsArray()
  permissions: {
    global: string[];
    station: { [id: string]: string[] };
  };
}
