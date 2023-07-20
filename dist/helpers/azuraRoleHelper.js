"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeRoleService = void 0;
const faker_1 = require("@faker-js/faker");
const common_1 = require("@nestjs/common");
let FakeRoleService = exports.FakeRoleService = class FakeRoleService {
    makeRole(override = null) {
        const roleObj = {
            name: faker_1.faker.internet.domainName(),
            permissions: {
                global: ["administer all"],
                station: { [faker_1.faker.string.numeric().toString()]: ["administer all"] },
            },
        };
        Object.assign(roleObj, override);
        return roleObj;
    }
};
exports.FakeRoleService = FakeRoleService = __decorate([
    (0, common_1.Injectable)()
], FakeRoleService);
//# sourceMappingURL=azuraRoleHelper.js.map