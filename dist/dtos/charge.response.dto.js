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
exports.ChargeResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ChargeResponseDto {
}
exports.ChargeResponseDto = ChargeResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)({
        example: 1646823311,
    }),
    __metadata("design:type", Number)
], ChargeResponseDto.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({
        example: { cpu: 1, ram: 2 },
    }),
    __metadata("design:type", Object)
], ChargeResponseDto.prototype, "variants", void 0);
//# sourceMappingURL=charge.response.dto.js.map