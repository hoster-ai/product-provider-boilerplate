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
exports.User = exports.Station = exports.StationStorage = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class StationStorage {
}
exports.StationStorage = StationStorage;
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], StationStorage.prototype, "media_storage_location_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], StationStorage.prototype, "recordings_storage_location_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], StationStorage.prototype, "podcasts_storage_location_id", void 0);
class Station {
}
exports.Station = Station;
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], Station.prototype, "server_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], Station.prototype, "station_short_name", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], Station.prototype, "station_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], Station.prototype, "role_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Object }),
    __metadata("design:type", StationStorage)
], Station.prototype, "station_storage", void 0);
let User = exports.User = class User {
};
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "user_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], User.prototype, "azura_user_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Array }),
    __metadata("design:type", Array)
], User.prototype, "stations", void 0);
exports.User = User = __decorate([
    (0, typegoose_1.modelOptions)({
        options: {
            allowMixed: 0,
        },
    })
], User);
//# sourceMappingURL=users.model.js.map