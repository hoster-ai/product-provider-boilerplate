"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./auth/auth.module");
const axios_1 = require("@nestjs/axios");
const mongo_module_1 = require("./mongo/mongo.module");
const azura_service_1 = require("./services/azura.service");
const azura_client_service_1 = require("./services/azura.client.service");
const azura_servers_service_1 = require("./services/azura.servers.service");
const server_settings_controller_1 = require("./server-settings.controller");
const station_controller_1 = require("./station.controller");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongo_module_1.MongoModule,
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            axios_1.HttpModule,
        ],
        controllers: [app_controller_1.AppController, server_settings_controller_1.ServerSettingsController, station_controller_1.StationController],
        providers: [azura_client_service_1.AzuraClientService, azura_service_1.AzuraService, azura_servers_service_1.AzuraServerService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map