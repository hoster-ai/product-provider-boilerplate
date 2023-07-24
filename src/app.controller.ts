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

import {
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  IntersectionType,
  OmitType,
  PartialType,
  refs,
} from "@nestjs/swagger";

import {
  ActionFieldsRequestDto,
  AddonsRequestDto,
  RequestDto,
} from "./dtos/request.dto";
import {
  MetaResponseDto,
  BooleanResponseDto,
  InfoResponseDto,
  TaskResponseDto,
  ErrorResponseDto,
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
@ApiBearerAuth("JWT-auth")
@UseGuards(AuthGuard)
@UseInterceptors(senderIsHoster)
@ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
export class AppController {
  constructor() //initialize your services here
  {}

  /**
   * @returns ProviderInfoResponseDto
   */
  @ApiOkResponse({ schema: { oneOf: refs(InfoResponseDto, ErrorResponseDto) } }) //Standard api ok response to be set on swagger
  @ApiTags("Provider") // give the call a tag so that it can be grouped on swagger
  @ApiOperation({
    description:
      "Send every piece of necessary information about the provider's Products to the Hoster",
    summary:
      "Returns all the information about the products in the provider to the HOSTER.",
  }) //Description of the method
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
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto, ErrorResponseDto) },
  })
  @ApiTags("Product")
  @ApiBody({ type: RequestCreateDto })
  @ApiOperation({
    description:
      "Receives all information necessary from the HOSTER so that the Provider may create a Product as ordered by the User(Customer). Replies in one of three different ways,\n1) returns succesful message after the creation of the product which also contains the necessary information(metakeys) about the created product, \n2) A creation pending message containing a task ID indicating the product is in the process of being cretaed, \n3) An Error message indicating the creation of the product has failed and why. ",
    summary: "Create a product.",
  })
  @HttpCode(201)
  @Post("create")
  public async create(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestCreateDto
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      meta: {
        //your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto, ErrorResponseDto) },
  })
  @ApiTags("Product")
  @ApiOperation({
    description:
      "Receives the User(Customer) and Product data from the HOSTER. It uses that data to first check whether or not the specific users subscription is elegible for renewal to the specific product. Replies in one of three different ways, \n1)returns a succesful message after the renewal of the users subscription to the product along with all necessary information(metakeys) about the new parametres of the product, \n2) A renewal pending message containing a task ID indicating the product is in the process of beeing renewed. \n3) An ERROR message indicating the renewal of the product has failed and why.",
    summary: "Renew a product.",
  })
  @Patch("renew")
  @HttpCode(200)
  async renew(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      meta: {
        //your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto, ErrorResponseDto) },
  })
  @ApiTags("Product")
  @ApiOperation({
    description:
      "Receives the User(Customer), current Product and desired upgraded Product data from the HOSTER so that the provider may upgrade the product.Replies in one of three different ways. \n1) returns a succesfull message after the upgrade of the product which also contains the necessary information(metakeys) about the product. \n2) An upgrade pending messag containing a task ID indicating the product is in the process of being upgraded, \n3) An ERROR message indicating the upgrade of the product has failed  and why.",
    summary: "Upgrade a product.",
  })
  @Patch("upgrade")
  @HttpCode(200)
  async upgrade(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      meta: {
        //your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto, ErrorResponseDto) },
  })
  @ApiTags("Product")
  @ApiOperation({
    description:
      "Receives the User(Customer), current Product and desired downgraded product data from the HOSTER so that the provider may downgrade the product.Replies in one of three different ways. \n1) returns a succesfull message after the downgrade of the product which also contains the necessary information(metakeys) about the product. \n2) A downgrade pending message containing a task ID indicating the product is in the process of being downgraded, \n3) An ERROR message indicating the downgrade of the product has failed  and why.",
    summary: "Downgrade a product.",
  })
  @Patch("downgrade")
  @HttpCode(200)
  async downgrade(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      meta: {
        // your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @ApiTags("Product")
  @ApiOperation({
    description:
      "Receives the User(Customer) and product data from the HOSTER. It then does the necessary steps to suspend the users access to the product. Replies in one of three ways. \n1) Returns a succesful message after the succesful suspension of the user from the product which also contains the necessary information(metakeys) about the product. \n2) A suspension pending message containing a task ID indicating the users access to the product is in the process of being suspended. \n3) An ERROR message  indicating the suspension of the users access to the product has failed and why",
    summary: "Suspend the rights to a product.",
  })
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  @Post("suspend")
  async suspend(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestOptionalPreviousDto
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      meta: {
        //your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with MetaResponseDto|TaskResponseDto|ErrorResponseDto
   */
  @ApiTags("Product")
  @ApiOperation({
    description:
      "Receives the User(Customer) and Product data from the HOSTER. It then does the necessary steps to unsuspend the users access to the product. Replies in one of three ways. \n1) Returns a succesful message after the succesful unsuspension of the user from the product which also contains the necessary information(metakeys) about the product. \n2) An unsuspension pending message containing a task ID indicating the users access to the product is in the process of being unsuspended. \n3) An ERROR message  indicating the unsuspension of the users access to the product has failed and why",
    summary: "Restore access to a product.",
  })
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  @Post("unsuspend")
  async unsuspend(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestOptionalPreviousDto
  ): Promise<MetaResponseDto | TaskResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      meta: {
        //your meta data
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with BooleanResponseDto|ErrorResponse
   */
  @ApiTags("Product")
  @ApiOperation({
    description:
      "Receives the User(Customer), Product and desired upgraded Product data from the HOSTER. It checks whether or not the product has the capacity to be upgraded. Replies in one of two ways. \n1) Sends a succesful check message that contains a boolean, which is true if the product is upgradable or FALSE if it is not. \n2) Send an ERROR message indicating the check was unsuccesful and why.",
    summary: "Verify that a product is upgradable.",
  })
  @Post("upgradable")
  @ApiOkResponse({
    schema: { oneOf: refs(BooleanResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  async upgradable(
    @Body() requestBody: RequestDto
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
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
  @ApiTags("Product")
  @ApiOperation({
    description:
      "Receives the User(Customer), Product and desired downgraded Product data from the HOSTER. It checks whether or not the product has the capacity to be downgraded. Replies in one of two ways. \n1) Sends a succesful check message that contains a boolean, which is true if the product is downgradable or FALSE if it is not. \n2) Send an ERROR message indicating the check was unsuccesful and why.",
    summary: "Verify that a product is dowgradable.",
  })
  @Post("downgradable")
  @ApiOkResponse({
    schema: { oneOf: refs(BooleanResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  async downgradable(
    @Body() requestBody: RequestDto
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
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
  @ApiTags("Product")
  @ApiOperation({
    description:
      "Receives the User(Customer) and Product data from the hoster so that the provider may deleta a product. Replies in one of three ways. \n1) Returns a succesfull message after the deletion of the product. \n2) Returns a deletion pending message containing a task ID indicating the product is in the process of being deleted. \n3) returns an Error message indicating the deletion was unsuccesful and why. ",
    summary: "Delete a product.",
  })
  @Post("delete")
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  async delete(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
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
  @ApiTags("Product")
  @ApiOperation({
    description:
      "Receives all addon information of a product and specific addon to be remotely validated. Returns on of two responses. \n1) Returns a succesfull check message  that contains a boolean , which is true if the validation was succesfull or false if the validation failed. \n2) returns an ERROR message indicating that something went wrong with the validation of the addon and why.",
    summary: "Remote validation per each addon.",
  })
  @Post("validate/addons")
  @ApiOkResponse({
    schema: { oneOf: refs(BooleanResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  async validateAddons(
    @Body() requestBody: AddonsRequestDto
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      result: true,
    };
  }

  /**
   * @returns Promise with BooleanResponseDto|ErrorResponse
   */
  @ApiTags("Product")
  @ApiOperation({
    description:
      "Receives all action field(Product feature) information of a product and specific action field to be remotely validated. Returns on of two responses. \n1) Returns a succesfull check message  that contains a boolean , which is true if the validation was succesfull or false if the validation failed. \n2) returns an ERROR message indicating that something went wrong with the validation process of the action field and why.",
    summary: "Remote Validation for each Action Field.",
  })
  @Post("validate/action-fields")
  @ApiOkResponse({
    schema: { oneOf: refs(BooleanResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  async validateActionFields(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: ActionFieldsRequestDto
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      result: true,
    };
  }

  @Post("install")
  @ApiTags("Provider")
  @ApiOperation({ summary: "Install the provider to the Hoster." })
  @ApiNoContentResponse({ description: "No Content" })
  @HttpCode(200)
  async install(): Promise<BooleanResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      result: true,
    };
  }

  @Post("uninstall")
  @ApiTags("Provider")
  @ApiOperation({ summary: "Uninstall the provider from the Hoster." })
  @ApiNoContentResponse({ description: "No Content" })
  @HttpCode(200)
  async uninstall(): Promise<BooleanResponseDto | ErrorResponseDto> {
    //Perform all necessary actions here

    return {
      result: true,
    };
  }
}
