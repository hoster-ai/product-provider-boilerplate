"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeClientService = void 0;
const faker_1 = require("@faker-js/faker");
const common_1 = require("@nestjs/common");
const country_enum_1 = require("../enums/country.enum");
let FakeClientService = exports.FakeClientService = class FakeClientService {
    async makeUsers(value) {
        let azuraUsers = [];
        for (let i = 0; i < value; i++) {
            const azuraUser = this.makeUser();
            azuraUsers.push(azuraUser);
        }
        return azuraUsers;
    }
    makeUser() {
        let date;
        date = new Date().toISOString();
        const azuraUser = {
            id: faker_1.faker.number.int(2).toString(),
            email: faker_1.faker.internet.email(),
            new_password: faker_1.faker.internet.password(10).toString(),
            name: faker_1.faker.person.firstName("male"),
            locale: faker_1.faker.helpers.arrayElement(Object.values(country_enum_1.CountryEnum)),
            theme: "dark",
            show_24_hour_time: true,
            two_factor_secret: "",
            created_at: date,
            updated_at: date,
            roles: faker_1.faker.helpers.arrayElements([
                "132",
                "21",
                "34",
                "45",
                "73",
                "42",
                "12",
                "63",
                "71",
                "3",
                "7",
                "24",
            ]),
        };
        return azuraUser;
    }
};
exports.FakeClientService = FakeClientService = __decorate([
    (0, common_1.Injectable)()
], FakeClientService);
//# sourceMappingURL=azuraClientHelper.js.map