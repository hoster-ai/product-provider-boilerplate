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
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  IntersectionType,
  OmitType,
  PartialType,
  getSchemaPath,
  refs,
} from "@nestjs/swagger";

import { ActionFieldsRequestDto, AddonsRequestDto, RequestDto, } from "./dtos/request.dto";
import { rolesDto } from "./dtos/azura/roles-dto";
import {
  MetaResponseDto,
  BooleanResponseDto,
  InfoResponseDto,
  TaskResponseDto,
  ErrorResponseDto,
} from "./dtos/responses.dto";

import { LabelTypeEnum } from "./enums/label.type.enum";
import { AzuraService as AzuraService } from "./services/azura.service";
import { AzuraClientService } from "./services/azura.client.service";
import { TimeZones } from "./enums/timezones.enum";
import { createStationDto } from "./dtos/azura/create-data.station.dto";
import { GlobalPermissions } from "./enums/global-permissions.enum";
import { StationPermissions } from "./enums/station-permissions.enum";
import { AzuraServerService } from "./services/azura.servers.service";
import { AuthGuard } from "./auth/auth.guard";
import { JwtPayloadRequest } from "./dtos/jwt-payload.request";
import { senderIsHoster } from "./auth/auth.interceptors";
import { HttpStatusCode } from "axios";
export class RequestCreateDto extends OmitType(RequestDto, ['previousProductData'] as const) {}
export class RequestOptionalPreviousDto extends IntersectionType(OmitType(RequestDto, ['previousProductData'] as const), PartialType(OmitType(RequestDto, ['productData','userData'] as const))) {}



// @ApiBearerAuth("JWT-auth")
@Controller()
@UseGuards(AuthGuard)
@ApiBearerAuth("JWT-auth")
@UseInterceptors(senderIsHoster)
@ApiUnauthorizedResponse({ status: 401, description: "Unauthorized" })
export class AppController {
  constructor(
    private readonly azuraService: AzuraService,
    private readonly azuraClientService: AzuraClientService,
    private readonly azuraServerService: AzuraServerService,
  ) { }

  /**
   * @returns ProviderInfoResponseDto
   */
  @ApiOkResponse({
    schema: { oneOf: refs(InfoResponseDto, ErrorResponseDto) },
  })
  @ApiTags("Provider")
  @ApiOperation({
    description: "Send every piece of necessary information about the provider's Products to the Hoster",
    summary: "Returns all the information about the products in the provider to the HOSTER.",
  })
  @HttpCode(200)
  @Get("info")
  async info(
    @Request()
    request: Request & JwtPayloadRequest,
  ): Promise<InfoResponseDto | InfoResponseDto> {
    let azura_servers = {};
    await this.azuraServerService
      .findServersByCompanyId(request.user.company_id)
      .then((res) => {
        res.map((server) => {
          azura_servers[server._id] = {
            azura_url: server.azura_url,
          };
        });
      });

    return {
      code: 200,
      message: "Ok",
      info: {
        name: "",
        actionFields: [
          {
            id: "server_id",
            label: "Azuracast Server",
            value: azura_servers,
            type: LabelTypeEnum.SELECT,
            required: true,
            disabled: false,
            hidden: false,
            regexValidation: "",
            remoteValidation: false,
            regexValidationErrorMessage: "",
            description: "",
            default: null,
          },
          {
            id: "timezone",
            label: "Timezone",
            value: { ...TimeZones },
            type: LabelTypeEnum.SELECT,
            required: true,
            disabled: false,
            hidden: false,
            regexValidation: "",
            remoteValidation: false,
            regexValidationErrorMessage: "",
            description: "",
            default: null,
          },
          {
            id: "max_listeners",
            label: "Max Listeners",
            value: null,
            type: LabelTypeEnum.TEXT_BOX,
            required: true,
            disabled: false,
            hidden: false,
            regexValidation: "",
            remoteValidation: false,
            regexValidationErrorMessage: "",
            description: "",
            default: null,
          },
          {
            id: "station_media_storage",
            label: "Station media storage",
            value: 0,
            type: LabelTypeEnum.TEXT_BOX,
            required: true,
            disabled: false,
            hidden: false,
            regexValidation: "",
            remoteValidation: false,
            regexValidationErrorMessage: "",
            description: "",
            default: null,
          },
          {
            id: "station_recordings_storage",
            label: "Station recordings storage",
            value: 0,
            type: LabelTypeEnum.TEXT_BOX,
            required: true,
            disabled: false,
            hidden: false,
            regexValidation: "",
            remoteValidation: false,
            regexValidationErrorMessage: "",
            description: "",
            default: null,
          },
          {
            id: "station_podcasts_storage",
            label: "Station podcasts storage",
            value: 0,
            type: LabelTypeEnum.TEXT_BOX,
            required: true,
            disabled: false,
            hidden: false,
            regexValidation: "",
            remoteValidation: false,
            regexValidationErrorMessage: "",
            description: "",
            default: null,
          },
          {
            id: "station_global_permissions",
            label: "Station podcasts storage",
            value: { ...GlobalPermissions },
            type: LabelTypeEnum.MULTI_SELECT,
            required: true,
            disabled: false,
            hidden: false,
            regexValidation: "",
            remoteValidation: false,
            regexValidationErrorMessage: "",
            description: "",
            default: null,
          },
          {
            id: "station_permissions",
            label: "Station podcasts storage",
            value: { ...StationPermissions },
            type: LabelTypeEnum.MULTI_SELECT,
            required: true,
            disabled: false,
            hidden: false,
            regexValidation: "",
            remoteValidation: false,
            regexValidationErrorMessage: "",
            description: "",
            default: null,
          },
        ], // Εδώ θα βρίσκονται όλα τα πεδία που πρέπει να συμπληρώσει ο διαχειριστής για να καταχωρήσει ένα νέο προϊόν σταθμού.
        productTabs: [
          {
            label: "Station Actions",
            url: `${process.env.URL}/product-tabs/front`,
          },
        ],
        listActions: [],
        settings: [
          {
            label: "Azuracast Servers",
            url: `${process.env.URL}/settings/front`,
          },
        ],
        returnMetaKeys: {
          station_id: 'This is your Station Id',
          name: "This is your Station Name",
          login_email: "This is your Station Login Email for login via browser",
          login_password: "This is your Station Login Password for login via browser",
          login_url: "This is the Station Login Url",
          source_password: "This is your source password for streaming",
          port: "This is the Port used to connect to the specific azuracast station",
          mount_point: "This is the mountpoint of the specific Station",

        },
      },
    };
  }


  /**
   *
   * @param requestBody RequestDto
   * @returns Promise with ResponseDto
   */
  @ApiTags("Product")
  @ApiBody({ type: RequestCreateDto })
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto, ErrorResponseDto) },
  })
  @ApiOperation({ description: 'Recieves all information necessary from the HOSTER so that the Provider may create a Product as ordered by the User(Customer). Replies in one of three different ways,\n1) returns succesful message after the creation of the product which also contains the necessary information(metakeys) about the created product, \n2) A creation pending message containing a task ID indicating the product is in the process of being cretaed, \n3) An Error message indicating the creation of the product has failed and why. ', summary: "Create a product." })
  @HttpCode(201)
  @Post("create")
  public async create(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestCreateDto,
  ): Promise<MetaResponseDto | MetaResponseDto | ErrorResponseDto> {
    const stationMetaData = requestBody.productData.meta;

    const stationDto: createStationDto = {
      name: stationMetaData.name,
      short_name: this.azuraService.nameToShortName(stationMetaData.name),
      timezone: stationMetaData.timezone,
      frontend_config: { max_listeners: stationMetaData.max_listeners },
    };
    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      stationMetaData.server_id,
    );

    // Http request: Δημιουργώ στο Azura ένα Station.
    const station = await this.azuraClientService
      .createStation(stationDto, server.azura_url, server.azura_token)

      .catch((err) => {
        throw new HttpException(
          "Δεν ήταν δυνατή η καταχώρησει του σταθμού στο Azura.",
          HttpStatus.BAD_REQUEST,
        );
      });

    // Ψάχνω το mount point του station.

    const stationMount = await this.azuraClientService.findStationMount(
      station.id,
      server.azura_url,
      server.azura_token,
    );

    // Azura
    const rolesDto: rolesDto = {
      name: station.short_name,
      permissions: {
        global: stationMetaData.station_global_permissions,
        station: {
          [station.id]: stationMetaData.station_permissions,
        },
      },
    };

    /* Οι νέες τιμές χώρου σε GB από τα Storages */
    const mediaStorageValue =
      requestBody.productData.meta.station_media_storage;
    const podcastsStorageValue =
      requestBody.productData.meta.station_podcasts_storage;
    const recordingStorageValue =
      requestBody.productData.meta.station_recordings_storage;

    /* Αλλάζω τις τιμές των storages που δημιουργήθηκαν 
       αυτόματα κατά την δημιουργεία του Station με τις νέες τιμές που όρισε ο χρήστης */
    const updateMediaStorage = this.azuraClientService.updateStorage(
      station.media_storage_location,
      mediaStorageValue,
      server.azura_url,
      server.azura_token,
    );

    const updatePodcastsStorage = this.azuraClientService.updateStorage(
      station.podcasts_storage_location,
      podcastsStorageValue,
      server.azura_url,
      server.azura_token,
    );

    const updateRecordingsStorage = this.azuraClientService.updateStorage(
      station.recordings_storage_location,
      recordingStorageValue,
      server.azura_url,
      server.azura_token,
    );

    // HTTP: Restart όλες τις υπηρεσίες που σχετίζονται με τη ραδιοφωνική εκπομπή (είναι απαραίτητο βήμα για να ενεργοποιηθεί ο σταθμός)
    const restartStationServices =
      this.azuraClientService.stationServiceControl(
        station.id,
        "restart",
        "POST",
        server.azura_url,
        server.azura_token,
      );

    await Promise.all([
      updateMediaStorage,
      updatePodcastsStorage,
      updateRecordingsStorage,
      restartStationServices,
    ]);

    // Http request: Δημιουργώ στο Azura ένα ρόλο με πλήρες δικαιώματα για το Station που δημιουργήθηκε

    const role = await this.azuraClientService
      .setRole(rolesDto, server.azura_url, server.azura_token)
      .catch((err) => {
        throw new HttpException(
          "Δεν ήταν δυνατή η καταχώρησει του ρόλου στο Azura ",
          HttpStatus.BAD_REQUEST,
        );
      });

    // Ψάχνω στην βάση δεδομένων αν υπάρχει ο χρήστης με βάση το user_id του.
    let user = await this.azuraService.findUserByUserID(
      requestBody.userData.id,
    );

    // Εάν ο χρήστης υπάρχει τότε μπαίνει στην If
    if (user) {
      // Προσθέτω το νέο station στον ήδη υπάρχων χρήστη και κρατάω τα δεδομένα.
      user = await this.azuraService.addStation(user, {
        server_id: server._id.toString(),
        station_short_name: station.short_name,
        station_id: station.id.toString(),
        role_id: role.id.toString(),
        station_storage: {
          media_storage_location_id: station.media_storage_location.toString(),
          recordings_storage_location_id:
            station.recordings_storage_location.toString(),
          podcasts_storage_location_id:
            station.podcasts_storage_location.toString(),
        },
      });

      // Ψάχνω όλα τα role_id από όλα τα stations του χρήστη.
      const roles = await this.azuraService.findUserRoles(user);
      //Http request: Κάνω Update τα roles του χρήστη στο Azura με τα νέα roles_id
      await this.azuraClientService
        .addRole(
          user.azura_user_id,
          roles,
          server.azura_url,
          server.azura_token,
        )
        .catch(() => {
          throw new HttpException(
            "Δεν ήταν δυνατή η ανανέωση του ρόλου στο Azura.1",
            HttpStatus.BAD_REQUEST,
          );
        });
    } else {
      // Http request: Δημιουργώ νέο χρήστη στο Azura εφόσον δεν υπάρχει ήδη.
      const created_user = await this.azuraClientService
        .createAzuraUser(
          {
            name: station.name,
            email: requestBody.userData.email,
            roles: [role.id],
          },
          server.azura_url,
          server.azura_token,
        )
        .catch((err) => {
          throw new HttpException(err.message, HttpStatus.NOT_FOUND);
        });

      // Δημιουργώ νέο χρήστη στην βάση δεδομένων εφόσον δεν υπάρχει ήδη.

      user = await this.azuraService.createUser({
        email: created_user.email,
        user_id: request.user.user_id.toString(),
        azura_user_id: created_user.id.toString(),
        stations: [
          {
            server_id: server._id.toString(),
            station_short_name: station.short_name,
            station_id: station.id.toString(),
            role_id: role.id.toString(),
            station_storage: {
              media_storage_location_id:
                station.media_storage_location.toString(),
              recordings_storage_location_id:
                station.recordings_storage_location.toString(),
              podcasts_storage_location_id:
                station.podcasts_storage_location.toString(),
            },
          },
        ],
      });
    }

    return {
      code: 201,
      message: "Ok",
      meta: {
        station_id: station.id, URL,
        name: station.name,
        login_url: `${process.env.URL}/login`,
        login_email: user.email,
        login_password: station.frontend_config.admin_pw,
        source_password: station.frontend_config.source_pw,
        port: station.frontend_config.port,
        mount_point: stationMount[0].name,
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with ResponseDto
   */
  @ApiTags("Product")
  @ApiOperation({ description: 'Recieves the User(Customer) and Product data from the HOSTER. It uses that data to first check whether or not the specific users subscription is elegible for renewal to the specific product. Replies in one of three different ways, \n1)returns a succesful message after the renewal of the users subscription to the product along with all necessary information(metakeys) about the new parametres of the product, \n2) A renewal pending message containing a task ID indicating the product is in the process of beeing renewed. \n3) An ERROR message indicating the renewal of the product has failed and why.', summary: "Renew a product." })
  @Patch("renew")
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  async renew(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<MetaResponseDto | MetaResponseDto | ErrorResponseDto> {
    // Απαραίτητο είναι το (requestBody.productData.meta.id)
    // Ανοίγουμε τον σταθμό που έχει κλείσει
    const server_id = requestBody.productData.meta.server_id;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      server_id,
    );

    const station = await this.azuraClientService
      .updateStation(
        requestBody.productData.meta.station_id,
        {
          is_enabled: true,
        },
        server.azura_url,
        server.azura_token,
      )
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      });

    return {
      code: 200,
      message: "Ok",
      meta: {
        station_id: station.id,
        name: station.name,
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with ResponseDto
   */
  @ApiTags("Product")
  @ApiOperation({ description: 'Recieves the User(Customer), current Product and desired upgraded Product data from the HOSTER so that the provider may upgrade the product.Replies in one of three different ways. \n1) returns a succesfull message after the upgrade of the product which also contains the necessary information(metakeys) about the product. \n2) An upgrade pending messag containing a task ID indicating the product is in the process of being upgraded, \n3) An ERROR message indicating the upgrade of the product has failed  and why.', summary: "Upgrade a product." })
  @Patch("upgrade")
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto,ErrorResponseDto) },
  })
  @HttpCode(200)
  async upgrade(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<MetaResponseDto | MetaResponseDto | ErrorResponseDto> {
    const server_id = requestBody.productData.meta.server_id;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      server_id,
    );

    // Http request: Βρίσκω το station του azura από το server για να πάρω τα id's από τα storages.
    const station = await this.azuraClientService.findStation(
      requestBody.productData.meta.station_id,
      server.azura_url,
      server.azura_token,
    );

    /* Οι νέες τιμές χώρου σε GB από τα Storages */
    const mediaStorageValue =
      requestBody.productData.meta.station_media_storage;
    const podcastsStorageValue =
      requestBody.productData.meta.station_podcasts_storage;
    const recordingStorageValue =
      requestBody.productData.meta.station_recordings_storage;

    /* Αλλάζω τις τιμές των storages που δημιουργήθηκαν 
         αυτόματα κατά την δημιουργεία του Station με τις νέες τιμές που όρισε ο χρήστης */

    const updateMediaStorage = this.azuraClientService.updateStorage(
      station.media_storage_location,
      mediaStorageValue,
      server.azura_url,
      server.azura_token,
    );

    const updatePodcastsStorage = this.azuraClientService.updateStorage(
      station.podcasts_storage_location,
      podcastsStorageValue,
      server.azura_url,
      server.azura_token,
    );
    const updateRecordingsStorage = this.azuraClientService.updateStorage(
      station.recordings_storage_location,
      recordingStorageValue,
      server.azura_url,
      server.azura_token,
    );

    const updateStation = this.azuraClientService.updateStation(
      requestBody.productData.meta.station_id,
      requestBody.productData.meta,
      server.azura_url,
      server.azura_token,
    );

    await Promise.all([
      updateMediaStorage,
      updatePodcastsStorage,
      updateRecordingsStorage,
      updateStation,
    ]);

    return {
      code: 200,
      message: "Ok",
      meta: { station_id: station.id, name: station.name },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with ResponseDto
   */
  @ApiTags("Product")
  @ApiOperation({ description: 'Recieves the User(Customer), current Product and desired downgraded product data from the HOSTER so that the provider may downgrade the product.Replies in one of three different ways. \n1) returns a succesfull message after the downgrade of the product which also contains the necessary information(metakeys) about the product. \n2) A downgrade pending message containing a task ID indicating the product is in the process of being downgraded, \n3) An ERROR message indicating the downgrade of the product has failed  and why.', summary: "Downgrade a product." })
  @Patch("downgrade")
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto,ErrorResponseDto) },
  })
  @HttpCode(200)
  async downgrade(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<MetaResponseDto | TaskResponseDto| ErrorResponseDto> {
    this.upgrade(request, requestBody);

    return {
      code: 200,
      message: "Ok",
      meta: {
        station_id: requestBody.productData.meta.station_id,
        name: requestBody.productData.meta.name,
      },
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise with ResponseDto
   */
  @ApiTags("Product")
  @ApiOperation({ description: 'Receives the User(Customer) and product data from the HOSTER. It then does the necessary steps to suspend the users access to the product. Replies in one of three ways. \n1) Returns a succesful message after the succesful suspension of the user from the product which also contains the necessary information(metakeys) about the product. \n2) A suspension pending message containing a task ID indicating the users access to the product is in the process of being suspended. \n3) An ERROR message  indicating the suspension of the users access to the product has failed and why', summary: "Suspend the rights to a product." })
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto,ErrorResponseDto) },
  })
  @HttpCode(200)
  @Post("suspend")
  async suspend(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestOptionalPreviousDto,
  ): Promise<MetaResponseDto | MetaResponseDto | ErrorResponseDto> {
    const server_id = requestBody.productData.meta.server_id;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      server_id,
    );

    return this.azuraClientService
      .suspend(requestBody.productData.meta.station_id, server)
      .then((station) => {
        return {
          code: 200,
          message: "Ok",
          meta: {
            station_id: station.id,
            name: station.name,
          },
        };
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      });
  }

  /**
   *
   * @param requestBody
   * @returns Promise with ResponseDto
   */
  @ApiTags("Product")
  @ApiOperation({ description: 'Recieves the User(Customer) and Product data from the HOSTER. It then does the necessary steps to unsuspend the users access to the product. Replies in one of three ways. \n1) Returns a succesful message after the succesful unsuspension of the user from the product which also contains the necessary information(metakeys) about the product. \n2) An unsuspension pending message containing a task ID indicating the users access to the product is in the process of being unsuspended. \n3) An ERROR message  indicating the unsuspension of the users access to the product has failed and why', summary: "Restore access to a product." })
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto,ErrorResponseDto) },
  })
  @HttpCode(200)
  @Post("unsuspend")
  async unsuspend(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestOptionalPreviousDto,
  ): Promise<MetaResponseDto | MetaResponseDto | ErrorResponseDto> {
    const server_id = requestBody.productData.meta.server_id;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      server_id,
    );

    return this.azuraClientService
      .unsuspend(requestBody.productData.meta.station_id, server)
      .then((station) => {
        return {
          code: 200,
          message: "Ok",
          meta: {
            station_id: station.id,
            name: station.name,
          },
        };
      })
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      });
  }

  /**
   *
   * @param requestBody
   * @returns Promise boolean
   */
  @ApiTags("Product")
  @ApiOperation({ description: 'Recieves the User(Customer), Product and desired upgraded Product data from the HOSTER. It checks whether or not the product has the capacity to be upgraded. Replies in one of two ways. \n1) Sends a succesful check message that contains a boolean, which is true if the product is upgradable or FALSE if it is not. \n2) Send an ERROR message indicating the check was unsuccesful and why.', summary: "Verify that a product is upgradable." })
  @Post("upgradable")
  @ApiOkResponse({
    schema: { oneOf: refs(BooleanResponseDto, ErrorResponseDto) },
  }) 
  @HttpCode(200)
  async upgradable(
    @Body() requestBody: RequestDto,
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
    return this.downgradable(requestBody);
  }

  /**
   *
   * @param requestBody
   * @returns Promise boolean
   */
  @ApiTags("Product")
  @ApiOperation({ description: 'Recieves the User(Customer), Product and desired downgraded Product data from the HOSTER. It checks whether or not the product has the capacity to be downgraded. Replies in one of two ways. \n1) Sends a succesful check message that contains a boolean, which is true if the product is downgradable or FALSE if it is not. \n2) Send an ERROR message indicating the check was unsuccesful and why.', summary: "Verify that a product is dowgradable." })
  @Post("downgradable")
  @ApiOkResponse({
    schema: { oneOf: refs(BooleanResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  async downgradable(
    @Body() requestBody: RequestDto,
  ): Promise<BooleanResponseDto|ErrorResponseDto> {
    const server_id = requestBody.previousProductData.meta.server_id;
    const company_id = requestBody.userData.companyId;

    const server = await this.azuraServerService.findServer(
      company_id,
      server_id,
    );
    // Οι παρακάτω τιμές είναι ο χώρος από τα storages του νέου σταθμού
    const valueMediaStorageToUpgrade =
      requestBody.productData.meta.station_media_storage;
    const valueRecordingsStorageToUpgrade =
      requestBody.productData.meta.station_recordings_storage;
    const valuePodcastsStorageToUpgrade =
      requestBody.productData.meta.station_podcasts_storage;
    // Το station_id είναι το id του σταθμού που θέλουμε να υποβαθμίσουμε
    const station_id = requestBody.previousProductData.meta.station_id;
    // βρίσκουμε το object που περιέχει μέσα όλες τις πληροφορίες του σταθμού όπως τα storage id's
    const station = await this.azuraClientService.findStation(
      station_id,
      server.azura_url,
      server.azura_token,
    );

    if (station.is_streamer_live) {
      throw new HttpException(
        "You can not upgrade/downgrade your station while is live",
        HttpStatusCode.BadRequest,
      );
    }

    //Καλούμε όλα τα storages που είναι αποθηκευμένα στο azura από το σταθμό.
    const mediaStorage = this.azuraClientService
      .findStorage(
        station.media_storage_location,
        server.azura_url,
        server.azura_token,
      )
      .then((response) => {
        if (
          parseInt(response.storageUsed) > parseInt(valueMediaStorageToUpgrade)
        ) {
          throw new HttpException(
            "Δεν μπορείτε να υποβιβάσετε το πακέτο σας",
            HttpStatus.BAD_REQUEST,
          );
        }
      });
    const recordingsSorage = this.azuraClientService
      .findStorage(
        station.recordings_storage_location,
        server.azura_url,
        server.azura_token,
      )
      .then((response) => {
        if (
          parseInt(response.storageUsed) >
          parseInt(valueRecordingsStorageToUpgrade)
        ) {
          throw new HttpException(
            "Δεν μπορείτε να υποβιβάσετε το πακέτο σας",
            HttpStatus.BAD_REQUEST,
          );
        }
      });

    const podcastsStorage = this.azuraClientService
      .findStorage(
        station.podcasts_storage_location,
        server.azura_url,
        server.azura_token,
      )
      .then((response) => {
        if (
          parseInt(response.storageUsed) >
          parseInt(valuePodcastsStorageToUpgrade)
        ) {
          throw new HttpException(
            "Δεν μπορείτε να υποβιβάσετε το πακέτο σας",
            HttpStatus.BAD_REQUEST,
          );
        }
      });

    return await Promise.all([mediaStorage, recordingsSorage, podcastsStorage])
      .then(() => {
        return {
          code: 200,
          message: "Ok",
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
   * @returns Promise boolean
   */
  @ApiTags("Product")
  @ApiOperation({ description: 'Recieves the User(Customer) and Product data from the hoster so that the provider may deleta a product. Replies in one of three ways. \n1) Returns a succesfull message after the deletion of the product. \n2) Returns a deletion pending message containing a task ID indicating the product is in the process of being deleted. \n3) returns an Error message indicating the deletion was unsuccesful and why. ', summary: "Delete a product." })
  @Post("delete")
  @ApiOkResponse({
    schema: { oneOf: refs(MetaResponseDto, TaskResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  async delete(
    @Request() request: Request & JwtPayloadRequest,
    @Body() requestBody: RequestDto,
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
    const server_id = requestBody.productData.meta.server_id;

    const server = await this.azuraServerService.findServer(
      request.user.company_id,
      server_id,
    );
    //Για να αφαιρεθεί ένα Station σωστά χρειαζόμαστε από το requestBody το (requestBody.productData.meta.id)
    // Ψάχνω το Station Object στην βάση δεδομένων με το Id του station.

    const station = await this.azuraService.findUserByStationId(
      requestBody.productData.meta.station_id,
    );

    // Αν δεν βρεθεί χρήστης ή Station σταματάμε εδώ.
    if (!station) {
      throw new HttpException("Δεν βρέθηκε ο σταθμός", HttpStatus.NOT_FOUND);
    }
    // Http request: Διαγράφω το Station από το Azura και κρατάω τα δεδομένα του.

    const deleteStation = this.azuraClientService
      .deleteStation(
        requestBody.productData.meta.station_id,
        server.azura_url,
        server.azura_token,
      )
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
    // Ψάχνω και αφαιρώ το Station Object από τον χρήστη στην βάση δεδομένων εάν βρεθεί το station Object.
    const deleteStationObject = this.azuraService
      .removeStationFromUser(station, station.stations[0])
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
    // Http: διαγράφω τον ρόλο του station από το Azura.
    const deleteStationRole = this.azuraClientService
      .deleteRole(
        station.stations[0].role_id,
        server.azura_url,
        server.azura_token,
      )
      .catch((err) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });

    await Promise.all([deleteStation, deleteStationObject, deleteStationRole]);

    return {
      code: 200,
      message: "Ok",
      result: true,
    };
  }

  /**
   *
   * @param requestBody
   * @returns Promise boolean
   */
  @ApiTags("Product")
  @ApiOperation({ description: 'Recieves all addon information of a product and specific addon to be remotely validated. Returns on of two responses. \n1) Returns a succesfull check message  that contains a boolean , which is true if the validation was succesfull or false if the validation failed. \n2) returns an ERROR message indicating that something went wrong with the validation of the addon and why.', summary: "Remote validation per each addon." })
  @Post("validate/addons")
  @ApiOkResponse({
    schema: { oneOf: refs(BooleanResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  async validateAddons(
    @Body() requestBody: AddonsRequestDto,
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
    // Check if name of Station is unique

    // const name = requestBody.key["name"];
    // const name = requestBody.addons["value"]
    // const short_name = this.azuraService.nameToShortName(name);

    // if (await this.azuraService.stationExists(short_name)) {
    //   throw new HttpException(
    //     "The station name is already in use",
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    return {
      code: 200,
      message: "Ok",
      result: true
    };
  }

  @ApiTags("Product")
  @ApiOperation({ description: 'Recieves all action field(Product feature) information of a product and specific action field to be remotely validated. Returns on of two responses. \n1) Returns a succesfull check message  that contains a boolean , which is true if the validation was succesfull or false if the validation failed. \n2) returns an ERROR message indicating that something went wrong with the validation process of the action field and why.', summary: "Remote Validation for each Action Field." })
  @Post("validate/action-fields")
  @ApiOkResponse({
    schema: { oneOf: refs(BooleanResponseDto, ErrorResponseDto) },
  })
  @HttpCode(200)
  async validateActionFields(
    @Request() request: Request & JwtPayloadRequest,

    @Body() requestBody: ActionFieldsRequestDto,
  ): Promise<BooleanResponseDto | ErrorResponseDto> {
    return {
      code: 200,
      message: "Ok",
      result: true
      //actionFields: [osActionField, panelActionField],
    };
  }
  //ToDo Find appropriate schema for (un)installing a provider to the marketplace.
  //Options:
  //  - UserDat(unlikely)
  //  - CompanyDate(maybe)
  //  - CompanyID(most likely)
  //Must fill in design gaps first
  @Post("install")
  @ApiTags("Provider")
  @ApiOperation({ summary: 'Install the provider to the Hoster.' })
  @ApiNoContentResponse({ description: "No Content" })
  @HttpCode(200)
  async install(): Promise<BooleanResponseDto| ErrorResponseDto> {
    // const addons = requestBody;
    /*
    example addon structure:

    name: string
    title: {'Τίτλος', 'el'}
    description: {'Περιγραφή', 'el'}
    icon_url: 'icon.png'
    type: 'TEXT_BOX
    required: true
    active: true
    pricePolicies: { 
      userId: user.user.id
      policy: {
        title: 'Policy title'
        description: 'Policy Description'
        default: true
      }
    }
    calculatedPrices: {
      percentageProfitMargin: 10,
      maxProfitMargin: 20
    }

    prices: {
      duration : 1,2,3,4,5,6,7,8,9,10,11,12,24,36,48,60,72,84,96,108,120 (array of months)
      createPrice: 5
      renewPrice: 5
      setupPrice: 3,
      offerCreatePrice: 4
      offerRenewPrice: 3,5
      offerSetupPrice: 1
      offerText: i am broke give me free
      freeTld: tldIds: {
        gr,com,net,org,eu,world,blog (array of tld's)
      }
      durations: {
        1,2,3,4,5,6,7,8,9,10,11,12,24,36,48,60,72,84,96,108,120 (array of months)
      }
      dynamicPrices: { timestamp: 100000, prices: [5,10,15,20,25], paid: false}
    }

     */

    /*
    addon 
       {
        id: "name", // The full display name of the station
        label: "Radio station name",
        value: null,
        type: LabelTypeEnum.TEXT_BOX,
        required: true,
        disabled: false,
        hidden: false,
        regexValidation: "",
        remoteValidation: true,
        error: "",
      }
 */
    // send POST to hoster.ai/service-providers/addons with the addons
    return {
      code: 200,
      message: "Success",
      result: true,
    };
  }

  @Post("uninstall")
  @ApiTags("Provider")
  @ApiOperation({ summary: 'Uninstall the provider from the Hoster.' })
  @ApiNoContentResponse({ description: "No Content" })
  @HttpCode(200)
  async uninstall(): Promise<BooleanResponseDto|ErrorResponseDto> {
    return {
      code: 200,
      message: "Success",
      result: true,
    };
  }
}
