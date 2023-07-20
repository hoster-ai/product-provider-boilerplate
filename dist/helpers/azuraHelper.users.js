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
exports.FakeUserService = void 0;
const faker_1 = require("@faker-js/faker");
const common_1 = require("@nestjs/common");
const azura_service_1 = require("../services/azura.service");
let FakeUserService = exports.FakeUserService = class FakeUserService {
    constructor(azuraService) {
        this.azuraService = azuraService;
    }
    async createUser(value) {
        let Users;
        Users = [];
        for (let i = 0; i < value; i++) {
            const Obj = this.makeUser();
            Users.push(Obj) && (await this.azuraService.createUser(Obj));
        }
        return Users;
    }
    makeUser() {
        const Obj = {
            email: faker_1.faker.internet.email(),
            azura_user_id: faker_1.faker.string.numeric(2).toString(),
            stations: [
                {
                    server_id: faker_1.faker.string.numeric(2).toString(),
                    station_short_name: faker_1.faker.person.firstName(),
                    station_id: faker_1.faker.string.numeric(2).toString(),
                    role_id: faker_1.faker.string.numeric(2).toString(),
                    station_storage: {
                        media_storage_location_id: faker_1.faker.string.numeric(2).toString(),
                        recordings_storage_location_id: faker_1.faker.string.numeric(2).toString(),
                        podcasts_storage_location_id: faker_1.faker.string.numeric(2).toString(),
                    },
                },
            ],
        };
        return Obj;
    }
};
exports.FakeUserService = FakeUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [azura_service_1.AzuraService])
], FakeUserService);
//# sourceMappingURL=azuraHelper.users.js.map