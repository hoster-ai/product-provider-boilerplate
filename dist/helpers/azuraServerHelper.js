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
exports.FakeServerService = void 0;
const faker_1 = require("@faker-js/faker");
const common_1 = require("@nestjs/common");
const azura_servers_service_1 = require("../services/azura.servers.service");
let FakeServerService = exports.FakeServerService = class FakeServerService {
    constructor(AzuraServerService) {
        this.AzuraServerService = AzuraServerService;
    }
    async createServer(value, override = null) {
        let Servers;
        Servers = [];
        for (let i = 0; i < value; i++) {
            const Obj = this.makeServer();
            Object.assign(Obj, override);
            Servers.push(Obj) && (await this.AzuraServerService.createServer(Obj));
        }
        return Servers;
    }
    makeServer(override) {
        const Obj = {
            _id: faker_1.faker.database.mongodbObjectId(),
            company_id: faker_1.faker.string.numeric(3).toString(),
            azura_url: faker_1.faker.internet.domainName(),
            azura_token: process.env.API_KEY_AZURE,
        };
        Object.assign(Obj, override);
        return Obj;
    }
};
exports.FakeServerService = FakeServerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [azura_servers_service_1.AzuraServerService])
], FakeServerService);
//# sourceMappingURL=azuraServerHelper.js.map