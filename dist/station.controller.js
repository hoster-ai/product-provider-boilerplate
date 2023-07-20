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
exports.StationController = void 0;
const common_1 = require("@nestjs/common");
const azura_client_service_1 = require("./services/azura.client.service");
const azura_servers_service_1 = require("./services/azura.servers.service");
const request_dto_1 = require("./dtos/request.dto");
const auth_guard_1 = require("./auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let StationController = exports.StationController = class StationController {
    constructor(azuraClientService, azuraServerService) {
        this.azuraClientService = azuraClientService;
        this.azuraServerService = azuraServerService;
    }
    async stationBroadcastStart(request, requestBody) {
        const stationMetaData = requestBody.productData.meta;
        const server = await this.azuraServerService.findServer(request.user.company_id, stationMetaData.server_id);
        return this.actionControll(stationMetaData.station_id, "frontend/start", "POST", server.azura_url, server.azura_token).then(() => {
            return {
                code: 200,
                message: "Ok",
            };
        });
    }
    async stationBroadcastStop(request, requestBody) {
        const stationMetaData = requestBody.productData.meta;
        const server = await this.azuraServerService.findServer(request.user.company_id, stationMetaData.server_id);
        return this.actionControll(stationMetaData.station_id, "frontend/stop", "POST", server.azura_url, server.azura_token).then(() => {
            return {
                code: 200,
                message: "Ok",
            };
        });
    }
    async stationBroadcastRestart(request, requestBody) {
        const stationMetaData = requestBody.productData.meta;
        const server = await this.azuraServerService.findServer(request.user.company_id, stationMetaData.server_id);
        return this.actionControll(stationMetaData.station_id, "frontend/restart", "POST", server.azura_url, server.azura_token).then(() => {
            return {
                code: 200,
                message: "Ok",
            };
        });
    }
    async stationAutoDJStart(request, requestBody) {
        const stationMetaData = requestBody.productData.meta;
        const server = await this.azuraServerService.findServer(request.user.company_id, stationMetaData.server_id);
        return this.actionControll(stationMetaData.station_id, "backend/start", "POST", server.azura_url, server.azura_token).then(() => {
            return {
                code: 200,
                message: "Ok",
            };
        });
    }
    async stationAutoDJStop(request, requestBody) {
        const stationMetaData = requestBody.productData.meta;
        const server = await this.azuraServerService.findServer(request.user.company_id, stationMetaData.server_id);
        return this.actionControll(stationMetaData.station_id, "backend/stop", "POST", server.azura_url, server.azura_token).then(() => {
            return {
                code: 200,
                message: "Ok",
            };
        });
    }
    async stationAutoDJRestart(request, requestBody) {
        const stationMetaData = requestBody.productData.meta;
        const server = await this.azuraServerService.findServer(request.user.company_id, stationMetaData.server_id);
        return this.actionControll(stationMetaData.station_id, "backend/restart", "POST", server.azura_url, server.azura_token).then(() => {
            return {
                code: 200,
                message: "Ok",
            };
        });
    }
    async stationStatus(request, requestBody) {
        const stationMetaData = requestBody.productData.meta;
        const server = await this.azuraServerService.findServer(request.user.company_id, stationMetaData.server_id);
        return this.actionControll(stationMetaData.station_id, "status", "GET", server.azura_url, server.azura_token).then((status) => {
            return {
                code: 200,
                message: "Ok",
                stationStatus: status,
            };
        });
    }
    async actionControll(station_id, action, method, url, token) {
        return this.azuraClientService
            .stationServiceControl(station_id, action, method, url, token)
            .catch((err) => {
            throw new common_1.HttpException(err.response.data.message, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method starts a broadcast from a station based oncompany_id and server_id' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("broadcast/start"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "stationBroadcastStart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method stops a broadcast from a station based oncompany_id and server_id' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("broadcast/stop"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "stationBroadcastStop", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method restarts a broadcast from a station based oncompany_id and server_id' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("broadcast/restart"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "stationBroadcastRestart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method starts the autodj feature from a station based oncompany_id and server_id' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("autodj/start"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "stationAutoDJStart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method stops the autodj feature from a station based oncompany_id and server_id' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("autodj/stop"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "stationAutoDJStop", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method restarts the autodj feature from a station based oncompany_id and server_id' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("autodj/restart"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "stationAutoDJRestart", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method sends back the status of a station based oncompany_id and server_id' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)("status"),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, request_dto_1.RequestDto]),
    __metadata("design:returntype", Promise)
], StationController.prototype, "stationStatus", null);
exports.StationController = StationController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiTags)("azuracast"),
    (0, common_1.Controller)("station"),
    __metadata("design:paramtypes", [azura_client_service_1.AzuraClientService,
        azura_servers_service_1.AzuraServerService])
], StationController);
//# sourceMappingURL=station.controller.js.map