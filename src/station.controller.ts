import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  HttpCode,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { AzuraClientService } from "./services/azura.client.service";
import { JwtPayloadRequest } from "./dtos/jwt-payload.request";
import { AzuraServerService } from "./services/azura.servers.service";
import { RequestDto } from "./dtos/request.dto";
import { BaseResponse } from "./dtos/responses.dto";
import { AuthGuard } from "./auth/auth.guard";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@UseGuards(AuthGuard)
@ApiTags("azuracast")
@Controller("station")
export class StationController {
  constructor(
    private readonly azuraClientService: AzuraClientService,
    private readonly azuraServerService: AzuraServerService,
  ) {}

  @ApiOperation({summary: 'This method starts a broadcast from a station based oncompany_id and server_id'})
  @HttpCode(200)
  @Post("broadcast/start")
  public async stationBroadcastStart(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<BaseResponse> {
    const stationMetaData = requestBody.productData.meta;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      stationMetaData.server_id,
    );

    return this.actionControll(
      stationMetaData.station_id,
      "frontend/start",
      "POST",
      server.azura_url,
      server.azura_token,
    ).then(() => {
      return {
        code: 200,
        message: "Ok",
      };
    });
  }

  @ApiOperation({summary: 'This method stops a broadcast from a station based oncompany_id and server_id'})
  @HttpCode(200)
  @Post("broadcast/stop")
  public async stationBroadcastStop(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<BaseResponse> {
    const stationMetaData = requestBody.productData.meta;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      stationMetaData.server_id,
    );

    return this.actionControll(
      stationMetaData.station_id,
      "frontend/stop",
      "POST",
      server.azura_url,
      server.azura_token,
    ).then(() => {
      return {
        code: 200,
        message: "Ok",
      };
    });
  }

  @ApiOperation({summary: 'This method restarts a broadcast from a station based oncompany_id and server_id'})
  @HttpCode(200)
  @Post("broadcast/restart")
  public async stationBroadcastRestart(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<BaseResponse> {
    const stationMetaData = requestBody.productData.meta;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      stationMetaData.server_id,
    );

    return this.actionControll(
      stationMetaData.station_id,
      "frontend/restart",
      "POST",
      server.azura_url,
      server.azura_token,
    ).then(() => {
      return {
        code: 200,
        message: "Ok",
      };
    });
  }

  @ApiOperation({summary: 'This method starts the autodj feature from a station based oncompany_id and server_id'})
  @HttpCode(200)
  @Post("autodj/start")
  public async stationAutoDJStart(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<BaseResponse> {
    const stationMetaData = requestBody.productData.meta;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      stationMetaData.server_id,
    );

    return this.actionControll(
      stationMetaData.station_id,
      "backend/start",
      "POST",
      server.azura_url,
      server.azura_token,
    ).then(() => {
      return {
        code: 200,
        message: "Ok",
      };
    });
  }

  @ApiOperation({summary: 'This method stops the autodj feature from a station based oncompany_id and server_id'})
  @HttpCode(200)
  @Post("autodj/stop")
  public async stationAutoDJStop(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<BaseResponse> {
    const stationMetaData = requestBody.productData.meta;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      stationMetaData.server_id,
    );

    return this.actionControll(
      stationMetaData.station_id,
      "backend/stop",
      "POST",
      server.azura_url,
      server.azura_token,
    ).then(() => {
      return {
        code: 200,
        message: "Ok",
      };
    });
  }

  @ApiOperation({summary: 'This method restarts the autodj feature from a station based oncompany_id and server_id'})
  @HttpCode(200)
  @Post("autodj/restart")
  public async stationAutoDJRestart(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<BaseResponse> {
    const stationMetaData = requestBody.productData.meta;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      stationMetaData.server_id,
    );

    return this.actionControll(
      stationMetaData.station_id,
      "backend/restart",
      "POST",
      server.azura_url,
      server.azura_token,
    ).then(() => {
      return {
        code: 200,
        message: "Ok",
      };
    });
  }

  @ApiOperation({summary: 'This method sends back the status of a station based oncompany_id and server_id'})
  @HttpCode(200)
  @Post("status")
  public async stationStatus(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<BaseResponse> {
    const stationMetaData = requestBody.productData.meta;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      stationMetaData.server_id,
    );

    return this.actionControll(
      stationMetaData.station_id,
      "status",
      "GET",
      server.azura_url,
      server.azura_token,
    ).then((status) => {
      return {
        code: 200,
        message: "Ok",
        stationStatus: status,
      };
    });
  }

  private async actionControll<T>(
    station_id: string,
    action:
      | "frontend/start"
      | "frontend/stop"
      | "frontend/restart"
      | "backend/start"
      | "backend/stop"
      | "backend/restart"
      | "status",
    method: "POST" | "GET",
    url: string,
    token: string,
  ): Promise<T> {
    return this.azuraClientService
      .stationServiceControl(station_id, action, method, url, token)
      .catch((err) => {
        throw new HttpException(
          err.response.data.message,
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
