"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = exports.RequestOptionalPreviousDto = exports.RequestCreateDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const request_dto_1 = require("./dtos/request.dto");
const responses_dto_1 = require("./dtos/responses.dto");
const label_type_enum_1 = require("./enums/label.type.enum");
const azura_service_1 = require("./services/azura.service");
const azura_client_service_1 = require("./services/azura.client.service");
const timezones_enum_1 = require("./enums/timezones.enum");
const global_permissions_enum_1 = require("./enums/global-permissions.enum");
const station_permissions_enum_1 = require("./enums/station-permissions.enum");
const azura_servers_service_1 = require("./services/azura.servers.service");
const auth_guard_1 = require("./auth/auth.guard");
const auth_interceptors_1 = require("./auth/auth.interceptors");
const axios_1 = require("axios");
class RequestCreateDto extends (0, swagger_1.OmitType)(request_dto_1.RequestDto, ['previousProductData']) {
}
exports.RequestCreateDto = RequestCreateDto;
class RequestOptionalPreviousDto extends (0, swagger_1.IntersectionType)((0, swagger_1.OmitType)(request_dto_1.RequestDto, ['previousProductData']), (0, swagger_1.PartialType)((0, swagger_1.OmitType)(request_dto_1.RequestDto, ['productData', 'userData']))) {
}
exports.RequestOptionalPreviousDto = RequestOptionalPreviousDto;
let AppController = exports.AppController = class AppController {
    constructor(azuraService, azuraClientService, azuraServerService) {
        this.azuraService = azuraService;
        this.azuraClientService = azuraClientService;
        this.azuraServerService = azuraServerService;
    }
    async info(request) {
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
                        type: label_type_enum_1.LabelTypeEnum.SELECT,
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
                        value: Object.assign({}, timezones_enum_1.TimeZones),
                        type: label_type_enum_1.LabelTypeEnum.SELECT,
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
                        type: label_type_enum_1.LabelTypeEnum.TEXT_BOX,
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
                        type: label_type_enum_1.LabelTypeEnum.TEXT_BOX,
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
                        type: label_type_enum_1.LabelTypeEnum.TEXT_BOX,
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
                        type: label_type_enum_1.LabelTypeEnum.TEXT_BOX,
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
                        value: Object.assign({}, global_permissions_enum_1.GlobalPermissions),
                        type: label_type_enum_1.LabelTypeEnum.MULTI_SELECT,
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
                        value: Object.assign({}, station_permissions_enum_1.StationPermissions),
                        type: label_type_enum_1.LabelTypeEnum.MULTI_SELECT,
                        required: true,
                        disabled: false,
                        hidden: false,
                        regexValidation: "",
                        remoteValidation: false,
                        regexValidationErrorMessage: "",
                        description: "",
                        default: null,
                    },
                ],
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
    async create(request, requestBody) {
        const stationMetaData = requestBody.productData.meta;
        const stationDto = {
            name: stationMetaData.name,
            short_name: this.azuraService.nameToShortName(stationMetaData.name),
            timezone: stationMetaData.timezone,
            frontend_config: { max_listeners: stationMetaData.max_listeners },
        };
        const server = await this.azuraServerService.findServer(request.user.company_id, stationMetaData.server_id);
        const station = await this.azuraClientService
            .createStation(stationDto, server.azura_url, server.azura_token)
            .catch((err) => {
            throw new common_1.HttpException("Δεν ήταν δυνατή η καταχώρησει του σταθμού στο Azura.", common_1.HttpStatus.BAD_REQUEST);
        });
        const stationMount = await this.azuraClientService.findStationMount(station.id, server.azura_url, server.azura_token);
        const rolesDto = {
            name: station.short_name,
            permissions: {
                global: stationMetaData.station_global_permissions,
                station: {
                    [station.id]: stationMetaData.station_permissions,
                },
            },
        };
        const mediaStorageValue = requestBody.productData.meta.station_media_storage;
        const podcastsStorageValue = requestBody.productData.meta.station_podcasts_storage;
        const recordingStorageValue = requestBody.productData.meta.station_recordings_storage;
        const updateMediaStorage = this.azuraClientService.updateStorage(station.media_storage_location, mediaStorageValue, server.azura_url, server.azura_token);
        const updatePodcastsStorage = this.azuraClientService.updateStorage(station.podcasts_storage_location, podcastsStorageValue, server.azura_url, server.azura_token);
        const updateRecordingsStorage = this.azuraClientService.updateStorage(station.recordings_storage_location, recordingStorageValue, server.azura_url, server.azura_token);
        const restartStationServices = this.azuraClientService.stationServiceControl(station.id, "restart", "POST", server.azura_url, server.azura_token);
        await Promise.all([
            updateMediaStorage,
            updatePodcastsStorage,
            updateRecordingsStorage,
            restartStationServices,
        ]);
        const role = await this.azuraClientService
            .setRole(rolesDto, server.azura_url, server.azura_token)
            .catch((err) => {
            throw new common_1.HttpException("Δεν ήταν δυνατή η καταχώρησει του ρόλου στο Azura ", common_1.HttpStatus.BAD_REQUEST);
        });
        let user = await this.azuraService.findUserByUserID(requestBody.userData.id);
        if (user) {
            user = await this.azuraService.addStation(user, {
                server_id: server._id.toString(),
                station_short_name: station.short_name,
                station_id: station.id.toString(),
                role_id: role.id.toString(),
                station_storage: {
                    media_storage_location_id: station.media_storage_location.toString(),
                    recordings_storage_location_id: station.recordings_storage_location.toString(),
                    podcasts_storage_location_id: station.podcasts_storage_location.toString(),
                },
            });
            const roles = await this.azuraService.findUserRoles(user);
            await this.azuraClientService
                .addRole(user.azura_user_id, roles, server.azura_url, server.azura_token)
                .catch(() => {
                throw new common_1.HttpException("Δεν ήταν δυνατή η ανανέωση του ρόλου στο Azura.1", common_1.HttpStatus.BAD_REQUEST);
            });
        }
        else {
            const created_user = await this.azuraClientService
                .createAzuraUser({
                name: station.name,
                email: requestBody.userData.email,
                roles: [role.id],
            }, server.azura_url, server.azura_token)
                .catch((err) => {
                throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
            });
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
                            media_storage_location_id: station.media_storage_location.toString(),
                            recordings_storage_location_id: station.recordings_storage_location.toString(),
                            podcasts_storage_location_id: station.podcasts_storage_location.toString(),
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
    async renew(request, requestBody) {
        const server_id = requestBody.productData.meta.server_id;
        const server = await this.azuraServerService.findServer(request.user.company_id, server_id);
        const station = await this.azuraClientService
            .updateStation(requestBody.productData.meta.station_id, {
            is_enabled: true,
        }, server.azura_url, server.azura_token)
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
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
    async upgrade(request, requestBody) {
        const server_id = requestBody.productData.meta.server_id;
        const server = await this.azuraServerService.findServer(request.user.company_id, server_id);
        const station = await this.azuraClientService.findStation(requestBody.productData.meta.station_id, server.azura_url, server.azura_token);
        const mediaStorageValue = requestBody.productData.meta.station_media_storage;
        const podcastsStorageValue = requestBody.productData.meta.station_podcasts_storage;
        const recordingStorageValue = requestBody.productData.meta.station_recordings_storage;
        const updateMediaStorage = this.azuraClientService.updateStorage(station.media_storage_location, mediaStorageValue, server.azura_url, server.azura_token);
        const updatePodcastsStorage = this.azuraClientService.updateStorage(station.podcasts_storage_location, podcastsStorageValue, server.azura_url, server.azura_token);
        const updateRecordingsStorage = this.azuraClientService.updateStorage(station.recordings_storage_location, recordingStorageValue, server.azura_url, server.azura_token);
        const updateStation = this.azuraClientService.updateStation(requestBody.productData.meta.station_id, requestBody.productData.meta, server.azura_url, server.azura_token);
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
    async downgrade(request, requestBody) {
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
    async suspend(request, requestBody) {
        const server_id = requestBody.productData.meta.server_id;
        const server = await this.azuraServerService.findServer(request.user.company_id, server_id);
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
            throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
        });
    }
    async unsuspend(request, requestBody) {
        const server_id = requestBody.productData.meta.server_id;
        const server = await this.azuraServerService.findServer(request.user.company_id, server_id);
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
            throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
        });
    }
    async upgradable(requestBody) {
        return this.downgradable(requestBody);
    }
    async downgradable(requestBody) {
        const server_id = requestBody.previousProductData.meta.server_id;
        const company_id = requestBody.userData.companyId;
        const server = await this.azuraServerService.findServer(company_id, server_id);
        const valueMediaStorageToUpgrade = requestBody.productData.meta.station_media_storage;
        const valueRecordingsStorageToUpgrade = requestBody.productData.meta.station_recordings_storage;
        const valuePodcastsStorageToUpgrade = requestBody.productData.meta.station_podcasts_storage;
        const station_id = requestBody.previousProductData.meta.station_id;
        const station = await this.azuraClientService.findStation(station_id, server.azura_url, server.azura_token);
        if (station.is_streamer_live) {
            throw new common_1.HttpException("You can not upgrade/downgrade your station while is live", axios_1.HttpStatusCode.BadRequest);
        }
        const mediaStorage = this.azuraClientService
            .findStorage(station.media_storage_location, server.azura_url, server.azura_token)
            .then((response) => {
            if (parseInt(response.storageUsed) > parseInt(valueMediaStorageToUpgrade)) {
                throw new common_1.HttpException("Δεν μπορείτε να υποβιβάσετε το πακέτο σας", common_1.HttpStatus.BAD_REQUEST);
            }
        });
        const recordingsSorage = this.azuraClientService
            .findStorage(station.recordings_storage_location, server.azura_url, server.azura_token)
            .then((response) => {
            if (parseInt(response.storageUsed) >
                parseInt(valueRecordingsStorageToUpgrade)) {
                throw new common_1.HttpException("Δεν μπορείτε να υποβιβάσετε το πακέτο σας", common_1.HttpStatus.BAD_REQUEST);
            }
        });
        const podcastsStorage = this.azuraClientService
            .findStorage(station.podcasts_storage_location, server.azura_url, server.azura_token)
            .then((response) => {
            if (parseInt(response.storageUsed) >
                parseInt(valuePodcastsStorageToUpgrade)) {
                throw new common_1.HttpException("Δεν μπορείτε να υποβιβάσετε το πακέτο σας", common_1.HttpStatus.BAD_REQUEST);
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
            throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async delete(request, requestBody) {
        const server_id = requestBody.productData.meta.server_id;
        const server = await this.azuraServerService.findServer(request.user.company_id, server_id);
        const station = await this.azuraService.findUserByStationId(requestBody.productData.meta.station_id);
        if (!station) {
            throw new common_1.HttpException("Δεν βρέθηκε ο σταθμός", common_1.HttpStatus.NOT_FOUND);
        }
        const deleteStation = this.azuraClientService
            .deleteStation(requestBody.productData.meta.station_id, server.azura_url, server.azura_token)
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        const deleteStationObject = this.azuraService
            .removeStationFromUser(station, station.stations[0])
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        const deleteStationRole = this.azuraClientService
            .deleteRole(station.stations[0].role_id, server.azura_url, server.azura_token)
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
        await Promise.all([deleteStation, deleteStationObject, deleteStationRole]);
        return {
            code: 200,
            message: "Ok",
            result: true,
        };
    }
    async validateAddons(requestBody) {
        return {
            code: 200,
            message: "Ok",
            result: true
        };
    }
    async validateActionFields(request, requestBody) {
        return {
            code: 200,
            message: "Ok",
            result: true
        };
    }
    async install() {
        return {
            code: 200,
            message: "Success",
            result: true,
        };
    }
    async uninstall() {
        return {
            code: 200,
            message: "Success",
            result: true,
        };
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.InfoResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, swagger_1.ApiTags)("Provider"),
    (0, swagger_1.ApiOperation)({
        description: "Send every piece of necessary information about the provider's Products to the Hoster",
        summary: "Returns all the information about the products in the provider to the HOSTER.",
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("info"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "info", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiBody)({ type: RequestCreateDto }),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.MetaResponseDto, responses_dto_1.TaskResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, swagger_1.ApiOperation)({ description: 'Recieves all information necessary from the HOSTER so that the Provider may create a Product as ordered by the User(Customer). Replies in one of three different ways,\n1) returns succesful message after the creation of the product which also contains the necessary information(metakeys) about the created product, \n2) A creation pending message containing a task ID indicating the product is in the process of being cretaed, \n3) An Error message indicating the creation of the product has failed and why. ', summary: "Create a product." }),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RequestCreateDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiOperation)({ description: 'Recieves the User(Customer) and Product data from the HOSTER. It uses that data to first check whether or not the specific users subscription is elegible for renewal to the specific product. Replies in one of three different ways, \n1)returns a succesful message after the renewal of the users subscription to the product along with all necessary information(metakeys) about the new parametres of the product, \n2) A renewal pending message containing a task ID indicating the product is in the process of beeing renewed. \n3) An ERROR message indicating the renewal of the product has failed and why.', summary: "Renew a product." }),
    (0, common_1.Patch)("renew"),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.MetaResponseDto, responses_dto_1.TaskResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "renew", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiOperation)({ description: 'Recieves the User(Customer), current Product and desired upgraded Product data from the HOSTER so that the provider may upgrade the product.Replies in one of three different ways. \n1) returns a succesfull message after the upgrade of the product which also contains the necessary information(metakeys) about the product. \n2) An upgrade pending messag containing a task ID indicating the product is in the process of being upgraded, \n3) An ERROR message indicating the upgrade of the product has failed  and why.', summary: "Upgrade a product." }),
    (0, common_1.Patch)("upgrade"),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.MetaResponseDto, responses_dto_1.TaskResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "upgrade", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiOperation)({ description: 'Recieves the User(Customer), current Product and desired downgraded product data from the HOSTER so that the provider may downgrade the product.Replies in one of three different ways. \n1) returns a succesfull message after the downgrade of the product which also contains the necessary information(metakeys) about the product. \n2) A downgrade pending message containing a task ID indicating the product is in the process of being downgraded, \n3) An ERROR message indicating the downgrade of the product has failed  and why.', summary: "Downgrade a product." }),
    (0, common_1.Patch)("downgrade"),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.MetaResponseDto, responses_dto_1.TaskResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "downgrade", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiOperation)({ description: 'Receives the User(Customer) and product data from the HOSTER. It then does the necessary steps to suspend the users access to the product. Replies in one of three ways. \n1) Returns a succesful message after the succesful suspension of the user from the product which also contains the necessary information(metakeys) about the product. \n2) A suspension pending message containing a task ID indicating the users access to the product is in the process of being suspended. \n3) An ERROR message  indicating the suspension of the users access to the product has failed and why', summary: "Suspend the rights to a product." }),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.MetaResponseDto, responses_dto_1.TaskResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("suspend"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RequestOptionalPreviousDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "suspend", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiOperation)({ description: 'Recieves the User(Customer) and Product data from the HOSTER. It then does the necessary steps to unsuspend the users access to the product. Replies in one of three ways. \n1) Returns a succesful message after the succesful unsuspension of the user from the product which also contains the necessary information(metakeys) about the product. \n2) An unsuspension pending message containing a task ID indicating the users access to the product is in the process of being unsuspended. \n3) An ERROR message  indicating the unsuspension of the users access to the product has failed and why', summary: "Restore access to a product." }),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.MetaResponseDto, responses_dto_1.TaskResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("unsuspend"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RequestOptionalPreviousDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "unsuspend", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiOperation)({ description: 'Recieves the User(Customer), Product and desired upgraded Product data from the HOSTER. It checks whether or not the product has the capacity to be upgraded. Replies in one of two ways. \n1) Sends a succesful check message that contains a boolean, which is true if the product is upgradable or FALSE if it is not. \n2) Send an ERROR message indicating the check was unsuccesful and why.', summary: "Verify that a product is upgradable." }),
    (0, common_1.Post)("upgradable"),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.BooleanResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "upgradable", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiOperation)({ description: 'Recieves the User(Customer), Product and desired downgraded Product data from the HOSTER. It checks whether or not the product has the capacity to be downgraded. Replies in one of two ways. \n1) Sends a succesful check message that contains a boolean, which is true if the product is downgradable or FALSE if it is not. \n2) Send an ERROR message indicating the check was unsuccesful and why.', summary: "Verify that a product is dowgradable." }),
    (0, common_1.Post)("downgradable"),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.BooleanResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "downgradable", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiOperation)({ description: 'Recieves the User(Customer) and Product data from the hoster so that the provider may deleta a product. Replies in one of three ways. \n1) Returns a succesfull message after the deletion of the product. \n2) Returns a deletion pending message containing a task ID indicating the product is in the process of being deleted. \n3) returns an Error message indicating the deletion was unsuccesful and why. ', summary: "Delete a product." }),
    (0, common_1.Post)("delete"),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.MetaResponseDto, responses_dto_1.TaskResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiOperation)({ description: 'Recieves all addon information of a product and specific addon to be remotely validated. Returns on of two responses. \n1) Returns a succesfull check message  that contains a boolean , which is true if the validation was succesfull or false if the validation failed. \n2) returns an ERROR message indicating that something went wrong with the validation of the addon and why.', summary: "Remote validation per each addon." }),
    (0, common_1.Post)("validate/addons"),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.BooleanResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_dto_1.AddonsRequestDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "validateAddons", null);
__decorate([
    (0, swagger_1.ApiTags)("Product"),
    (0, swagger_1.ApiOperation)({ description: 'Recieves all action field(Product feature) information of a product and specific action field to be remotely validated. Returns on of two responses. \n1) Returns a succesfull check message  that contains a boolean , which is true if the validation was succesfull or false if the validation failed. \n2) returns an ERROR message indicating that something went wrong with the validation process of the action field and why.', summary: "Remote Validation for each Action Field." }),
    (0, common_1.Post)("validate/action-fields"),
    (0, swagger_1.ApiOkResponse)({
        schema: { oneOf: (0, swagger_1.refs)(responses_dto_1.BooleanResponseDto, responses_dto_1.ErrorResponseDto) },
    }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.ActionFieldsRequestDto]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "validateActionFields", null);
__decorate([
    (0, common_1.Post)("install"),
    (0, swagger_1.ApiTags)("Provider"),
    (0, swagger_1.ApiOperation)({ summary: 'Install the provider to the Hoster.' }),
    (0, swagger_1.ApiNoContentResponse)({ description: "No Content" }),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "install", null);
__decorate([
    (0, common_1.Post)("uninstall"),
    (0, swagger_1.ApiTags)("Provider"),
    (0, swagger_1.ApiOperation)({ summary: 'Uninstall the provider from the Hoster.' }),
    (0, swagger_1.ApiNoContentResponse)({ description: "No Content" }),
    (0, common_1.HttpCode)(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "uninstall", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)("JWT-auth"),
    (0, common_1.UseInterceptors)(auth_interceptors_1.senderIsHoster),
    (0, swagger_1.ApiUnauthorizedResponse)({ status: 401, description: "Unauthorized" }),
    __metadata("design:paramtypes", [azura_service_1.AzuraService,
        azura_client_service_1.AzuraClientService,
        azura_servers_service_1.AzuraServerService])
], AppController);
//# sourceMappingURL=app.controller.js.map