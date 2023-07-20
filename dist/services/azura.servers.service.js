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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzuraServerService = void 0;
const common_1 = require("@nestjs/common");
const typegoose_1 = require("@typegoose/typegoose");
const servers_model_1 = require("../entities/servers.model");
require("dotenv").config();
let AzuraServerService = exports.AzuraServerService = class AzuraServerService {
    constructor() {
        this.serversModel = (0, typegoose_1.getModelForClass)(servers_model_1.Server);
    }
    async createServer(server) {
        const regex = /^[a-fA-F0-9]+\:[a-fA-F0-9]{32}$/;
        if (!server.azura_token || !server.azura_url || !server.company_id) {
            throw new Error("Missing required fields");
        }
        if (await this.urlExists(server.azura_url)) {
            throw new Error("URL already exists");
        }
        if (!regex.test(server.azura_token)) {
            throw new Error("Invalid token");
        }
        const newModel = new this.serversModel(server);
        return newModel.save();
    }
    async findServersByCompanyId(company_id) {
        return this.serversModel.find({ company_id: company_id });
    }
    async urlExists(azura_url) {
        return this.serversModel.findOne({ azura_url });
    }
    async findServer(company_id, server_id) {
        return this.serversModel.findOne({
            company_id: company_id,
            _id: server_id,
        });
    }
    async deleteServer(company_id, server_id) {
        if (!company_id || !server_id) {
            return false;
        }
        return this.serversModel
            .deleteOne({ company_id: company_id, _id: server_id })
            .then((res) => {
            if (res.deletedCount === 1) {
                return true;
            }
            throw new Error("Server not found");
        });
    }
    async updateServer(server_id, server) {
        return this.serversModel
            .updateOne({
            _id: server_id,
            company_id: server.company_id,
        }, {
            $set: {
                azura_token: server.azura_token,
                azura_url: server.azura_url,
            },
        })
            .then((response) => {
            if (response.modifiedCount == 1) {
                return true;
            }
            throw new Error("Server not found");
        });
    }
    async purge() {
        if (process.env.NODE_ENV === "production") {
            return false;
        }
        return this.serversModel.deleteMany({}).then((res) => {
            if (res.deletedCount > 0) {
                return true;
            }
            return false;
        });
    }
};
exports.AzuraServerService = AzuraServerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AzuraServerService);
//# sourceMappingURL=azura.servers.service.js.map