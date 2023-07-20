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
exports.Server = void 0;
const swagger_1 = require("@nestjs/swagger");
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
let Server = exports.Server = class Server {
};
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "43254d88awwefg8",
        title: "ServerId"
    }),
    __metadata("design:type", String)
], Server.prototype, "_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "43254d88awwefg8",
        title: "CompanyId"
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Server.prototype, "company_id", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "example.mine.gr/this",
        title: "AzuraUrl"
    }),
    __metadata("design:type", String)
], Server.prototype, "azura_url", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true }),
    (0, class_validator_1.Matches)(/^[a-fA-F0-9]+\:[a-fA-F0-9]{32}$/),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "43254d88awwefg8",
        title: "AzuraToken"
    }),
    __metadata("design:type", String)
], Server.prototype, "azura_token", void 0);
exports.Server = Server = __decorate([
    (0, typegoose_1.modelOptions)({
        options: {
            allowMixed: 0,
        },
    })
], Server);
//# sourceMappingURL=servers.model.js.map