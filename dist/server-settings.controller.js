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
exports.ServerSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const azura_servers_service_1 = require("./services/azura.servers.service");
const servers_model_1 = require("./entities/servers.model");
const auth_guard_1 = require("./auth/auth.guard");
const jwt_payload_request_1 = require("./dtos/jwt-payload.request");
const mongoose = require("mongoose");
const auth_interceptors_1 = require("./auth/auth.interceptors");
const azura_service_1 = require("./services/azura.service");
let ServerSettingsController = exports.ServerSettingsController = class ServerSettingsController {
    constructor(azuraServerService, azuraService) {
        this.azuraServerService = azuraServerService;
        this.azuraService = azuraService;
    }
    async create(server, request) {
        const serverModel = {
            company_id: request.user.company_id,
            azura_url: server.azura_url,
            azura_token: server.azura_token,
        };
        return this.azuraServerService.createServer(serverModel).catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async findServers(request) {
        const company_id = request.user.company_id;
        return this.azuraServerService.findServersByCompanyId(company_id);
    }
    async findServer(server_id, request) {
        const company_id = request.user.company_id;
        this.validateMongoId(server_id);
        return this.azuraServerService
            .findServer(company_id, server_id)
            .catch((err) => {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async delete(server_id, request) {
        const company_id = request.user.company_id;
        this.validateMongoId(server_id);
        if (await this.azuraService.serverHasStations(server_id)) {
            throw new common_1.HttpException("You cannot delete the server while server has stations", common_1.HttpStatus.BAD_REQUEST);
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
            throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
        });
    }
    async update(server_id, requestBody, request) {
        if (await this.azuraServerService.urlExists(requestBody.azura_url)) {
            throw new common_1.BadRequestException("Url already in use");
        }
        this.validateMongoId(server_id);
        const updateServerValues = {
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
            throw new common_1.HttpException(err.message, common_1.HttpStatus.NOT_FOUND);
        });
    }
    validateMongoId(id) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) {
            throw new common_1.HttpException("Invalid server id", common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method creates a server.' }),
    (0, swagger_1.ApiBody)({ type: servers_model_1.Server }),
    (0, common_1.HttpCode)(201),
    (0, common_1.Post)("servers"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [servers_model_1.Server, Object]),
    __metadata("design:returntype", Promise)
], ServerSettingsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method sends back a specific server based on a Company_id' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("servers"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [jwt_payload_request_1.JwtPayloadRequest]),
    __metadata("design:returntype", Promise)
], ServerSettingsController.prototype, "findServers", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method sends back a specific server based on a Company_id and Server_id' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)("servers/:server_id"),
    __param(0, (0, common_1.Param)("server_id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServerSettingsController.prototype, "findServer", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method deletes a server based on server_Id' }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)("servers/:server_id"),
    __param(0, (0, common_1.Param)("server_id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ServerSettingsController.prototype, "delete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'This method updates a server based on Server_id' }),
    (0, swagger_1.ApiBody)({ type: servers_model_1.Server }),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)("servers/:server_id"),
    __param(0, (0, common_1.Param)("server_id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ServerSettingsController.prototype, "update", null);
exports.ServerSettingsController = ServerSettingsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)(auth_interceptors_1.hasAdminRights),
    (0, common_1.Controller)("settings"),
    (0, swagger_1.ApiTags)("azuracast"),
    (0, swagger_1.ApiUnauthorizedResponse)({ status: 401, description: "Unauthorized" }),
    __metadata("design:paramtypes", [azura_servers_service_1.AzuraServerService,
        azura_service_1.AzuraService])
], ServerSettingsController);
//# sourceMappingURL=server-settings.controller.js.map