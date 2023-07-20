/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { prop, modelOptions } from "@typegoose/typegoose";
import { IsMongoId, IsString, Matches } from "class-validator";

@modelOptions({
  options: {
    allowMixed: 0,
  },
})
export class Server {
  @IsMongoId()
  @ApiProperty({
    type: String,
    example: "43254d88awwefg8",
    title: "ServerId"
  })
  _id?: string;

  @prop({ type: String, required: true })
  @ApiProperty({
    type: String,
    example: "43254d88awwefg8",
    title: "CompanyId"
  })
  @IsString()
  company_id: string;

  @prop({ type: String, required: true })
  @IsString()
  @ApiProperty({
    type: String,
    example: "example.mine.gr/this",
    title: "AzuraUrl"
  })
  azura_url: string;

  @prop({ type: String, required: true })
  @Matches(/^[a-fA-F0-9]+\:[a-fA-F0-9]{32}$/)
  @IsString()
  @ApiProperty({
    type: String,
    example: "43254d88awwefg8",
    title: "AzuraToken"
  })
  azura_token: string;
}
