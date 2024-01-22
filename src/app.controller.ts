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
  Request,
  Patch,
  UseInterceptors,
  Delete,
  Param,
} from "@nestjs/common";

import {
  ValidateRequestDto,
  RequestDto,
  DynamicAddonRequest,
  RequestCreateDto,
  PayPerUseRequest,
} from "./dtos/request.dto";
import {
  SuccessResponseDto,
  ValidateResponseDto,
  InfoResponseDto,
  TaskResponseDto,
  ErrorResponseDto,
  DynamicAddonResponse,
  BooleanResponseDto,
} from "./dtos/responses.dto";

import { AuthGuard } from "./auth/auth.guard";
import { JwtPayloadRequest } from "./dtos/jwt-payload.request";
import { senderIsHoster } from "./auth/auth.interceptors";
import { TasksService } from "./scheduler.service";
import { IntervalEnum } from "./enums/interval.enum";

@Controller()
@UseGuards(AuthGuard)
@UseInterceptors(senderIsHoster)
export class AppController {
  constructor(private readonly cronService: TasksService) {
    this.cronService.addCronJob("default", IntervalEnum.PER_HOUR);
  } //initialize your services here

  /**
   * @returns ProviderInfoResponseDto
   */
  @HttpCode(200)
  @Get("info")
  async info(
    @Request() request: Request & JwtPayloadRequest
  ): Promise<InfoResponseDto | ErrorResponseDto> {
    return {
      info: {
        name: "MyProduct",
        supportedActions: []
      },
    };
  }

  /**
   *
   * @param requestBody RequestCreateDto
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */

  @HttpCode(201)
  @Post("create")
  public async create(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestCreateDto
  ): Promise<SuccessResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      item_data: {
        //your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with BooleanResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @Patch("renew")
  @HttpCode(200)
  async renew(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<BooleanResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      success: true,
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */

  @Patch("upgrade")
  @HttpCode(200)
  async upgrade(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<SuccessResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      item_data: {
        //your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @Patch("downgrade")
  @HttpCode(200)
  async downgrade(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<SuccessResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      item_data: {
        // your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with BooleanResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @HttpCode(200)
  @Post("suspend")
  async suspend(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<BooleanResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      success: true,
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with BooleanResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @HttpCode(200)
  @Post("unsuspend")
  async unsuspend(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<BooleanResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      success: true,
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with BooleanResponseDto|ErrorResponse
   */
  @Post("upgradable")
  @HttpCode(200)
  async upgradable(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      success: true,
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with BooleanResponseDto|ErrorResponse
   */
  @Post("downgradable")
  @HttpCode(200)
  async downgradable(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      success: true,
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with BooleanResponseDto|ErrorResponse
   */
  @Delete(":id")
  @HttpCode(200)
  async delete(
    @Param("id") id: string,
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      success: true,
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with BooleanResponseDto|ErrorResponse
   */
  @Post("validate/addons")
  @HttpCode(200)
  async validateAddons(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: ValidateRequestDto
  ): Promise<ValidateResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      result: true,
    };
  }

  /**
   * @returns Promise with BooleanResponseDto|ErrorResponse
   */
  @Post("validate/action-fields")
  @HttpCode(200)
  async validateActionFields(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: ValidateRequestDto
  ): Promise<ValidateResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      result: true,
    };
  }

  @Post("dynamic-addon")
  @HttpCode(200)
  async returnAddons(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: DynamicAddonRequest
  ): Promise<DynamicAddonResponse | ErrorResponseDto> {
    return { id: "" };
  }

  @Post("install")
  @HttpCode(200)
  async install(): Promise<null | ErrorResponseDto> {
    //Perform all necessary actions here

    return;
  }

  @Post("uninstall")
  @HttpCode(200)
  async uninstall(): Promise<null | ErrorResponseDto> {
    //Perform all necessary actions here

    return;
  }
}
