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
  HttpStatus,
  HttpException,
  Patch,
  UseInterceptors,
} from "@nestjs/common";

import { IntersectionType, OmitType, PartialType } from "@nestjs/swagger";

import { ValidateRequestDto, RequestDto, DynamicAddonRequest } from "./dtos/request.dto";
import {
  MetaResponseDto,
  ValidateResponseDto,
  InfoResponseDto,
  TaskResponseDto,
  ErrorResponseDto,
  DynamicAddonResponse,
} from "./dtos/responses.dto";

import { AuthGuard } from "./auth/auth.guard";
import { JwtPayloadRequest } from "./dtos/jwt-payload.request";
import { senderIsHoster } from "./auth/auth.interceptors";

export class RequestCreateDto extends OmitType(RequestDto, [
  "previousProductData",
] as const) {}
export class RequestOptionalPreviousDto extends IntersectionType(
  OmitType(RequestDto, ["previousProductData"] as const),
  PartialType(OmitType(RequestDto, ["productData", "userData"] as const))
) {}

@Controller()
@UseGuards(AuthGuard)
@UseInterceptors(senderIsHoster)
export class AppController {
  constructor() {} //initialize your services here

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

        //...
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
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      item_meta: {
        //your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @Patch("renew")
  @HttpCode(200)
  async renew(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      item_meta: {
        //your meta data
      },
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
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      item_meta: {
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
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      item_meta: {
        // your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @HttpCode(200)
  @Post("suspend")
  async suspend(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestOptionalPreviousDto
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      item_meta: {
        //your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @HttpCode(200)
  @Post("unsuspend")
  async unsuspend(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestOptionalPreviousDto
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      id: "hoster_order_product_id",
      item_meta: {
        //your meta data
      },
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
    @Body() requestBody: RequestDto
  ): Promise<ValidateResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return await Promise.all([])
      .then(() => {
        return {
          result: true,
        };
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }

  /**
   *
   * @param requestBody
   * @returns Promise with BooleanResponseDto|ErrorResponse
   */
  @Post("downgradable")
  @HttpCode(200)
  async downgradable(
    @Body() requestBody: RequestDto
  ): Promise<ValidateResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return await Promise.all([])
      .then(() => {
        return {
          result: true,
        };
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }

  /**
   *
   * @param requestBody
   * @returns Promise with BooleanResponseDto|ErrorResponse
   */
  @Post("delete")
  @HttpCode(200)
  async delete(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<ValidateResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return await Promise.all([])
      .then(() => {
        return {
          result: true,
        };
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });
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
   
    return {};
  }

  @Post("install")
  @HttpCode(200)
  async install(): Promise<null | ErrorResponseDto> {
    //Perform all necessary actions here

    return {};
  }

  @Post("uninstall")
  @HttpCode(200)
  async uninstall(): Promise<null | ErrorResponseDto> {
    //Perform all necessary actions here

    return {};
  }
}
