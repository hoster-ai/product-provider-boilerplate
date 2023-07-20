/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpCode,
  Delete,
  Request,
  Put,
  Param,
  HttpException,
  HttpStatus,
  BadRequestException,
  UseInterceptors,
} from "@nestjs/common";

import { ApiBody, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { MetaResponseDto, BaseResponse } from "./dtos/responses.dto";
import { AzuraServerService } from "./services/azura.servers.service";
import { Server } from "./entities/servers.model";
import { AuthGuard } from "./auth/auth.guard";
import { JwtPayloadRequest } from "./dtos/jwt-payload.request";
import * as mongoose from "mongoose";
import { hasAdminRights } from "./auth/auth.interceptors";
import { AzuraService } from "./services/azura.service";

@UseGuards(AuthGuard)
@UseInterceptors(hasAdminRights)
@Controller("settings")
@ApiTags("azuracast")
@ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
export class ServerSettingsController {
  constructor(
    private readonly azuraServerService: AzuraServerService,
    private readonly azuraService: AzuraService,
  ) {}

  @ApiOperation({summary: 'This method creates a server.'})
  @ApiBody({ type: Server })
  @HttpCode(201)
  @Post("servers")
  public async create(
    @Body() server: Server,
    @Request() request: Request & JwtPayloadRequest,
  ): Promise<Server> {
    const serverModel: Server = {
      company_id: request.user.company_id,
      azura_url: server.azura_url,
      azura_token: server.azura_token,
    };

    return this.azuraServerService.createServer(serverModel).catch((err) => {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    });
  }

  @ApiOperation({summary: 'This method sends back a specific server based on a Company_id'})
  @HttpCode(200)
  @Get("servers")
  public async findServers(
    @Request() request: JwtPayloadRequest,
  ): Promise<Server[]> {
    const company_id = request.user.company_id;
    return this.azuraServerService.findServersByCompanyId(company_id);
  }

  
  @ApiOperation({summary: 'This method sends back a specific server based on a Company_id and Server_id'})
  @HttpCode(200)
  @Get("servers/:server_id")
  public async findServer(
    @Param("server_id") server_id: string,
    @Request() request: Request & JwtPayloadRequest,
  ): Promise<Server> {
    const company_id = request.user.company_id;

    this.validateMongoId(server_id);

    return this.azuraServerService
      .findServer(company_id, server_id)
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @ApiOperation({summary: 'This method deletes a server based on server_Id'})
  @HttpCode(200)
  @Delete("servers/:server_id")
  public async delete(
    @Param("server_id") server_id: string,
    @Request() request: Request & JwtPayloadRequest,
  ): Promise<BaseResponse> {
    const company_id = request.user.company_id;

    this.validateMongoId(server_id);

    // Να γίνει έλεγχος αν υπάρχουν σταθμοί στον συγκεκριμένο Server που θέλουμε να κάνουμε διαγραφή.
    if (await this.azuraService.serverHasStations(server_id)) {
      throw new HttpException(
        "You cannot delete the server while server has stations",
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.azuraServerService
      .deleteServer(company_id, server_id)
      .then(() => {
        return {
          code: 200,
          message: "Ok",
        };
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      });
  }

  @ApiOperation({summary: 'This method updates a server based on Server_id'})
  @ApiBody({ type: Server })
  @HttpCode(200)
  @Put("servers/:server_id")
  public async update(
    @Param("server_id") server_id: string,
    @Body() requestBody: Pick<Server, "azura_url" | "azura_token">,
    @Request() request: Request & JwtPayloadRequest,
  ): Promise<MetaResponseDto> {
    if (await this.azuraServerService.urlExists(requestBody.azura_url)) {
      throw new BadRequestException("Url already in use");
    }

    this.validateMongoId(server_id);

    const updateServerValues: Server = {
      company_id: request.user.company_id,
      azura_url: requestBody.azura_url,
      azura_token: requestBody.azura_token,
    };

    return this.azuraServerService
      .updateServer(server_id, updateServerValues)
      .then(() => {
        return {
          code: 200,
          message: "Ok",
        };
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      });
  }

  private validateMongoId(id: string): void | Error {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException("Invalid server id", HttpStatus.BAD_REQUEST);
    }
  }
}
