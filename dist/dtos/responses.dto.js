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
exports.BooleanResponseDto = exports.ErrorResponseDto = exports.TaskResponseDto = exports.MetaResponseDto = exports.InfoResponseDto = exports.BaseResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const provider_info_dto_1 = require("./provider-info.dto");
class BaseResponse {
}
exports.BaseResponse = BaseResponse;
__decorate([
    (0, swagger_1.ApiResponseProperty)({
        type: Number,
        example: 200,
    }),
    __metadata("design:type", Number)
], BaseResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({
        type: String,
        example: "Ok",
    }),
    __metadata("design:type", String)
], BaseResponse.prototype, "message", void 0);
class InfoResponseDto extends BaseResponse {
}
exports.InfoResponseDto = InfoResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: provider_info_dto_1.ProviderInfoDto,
    }),
    __metadata("design:type", provider_info_dto_1.ProviderInfoDto)
], InfoResponseDto.prototype, "info", void 0);
class MetaResponseDto extends BaseResponse {
}
exports.MetaResponseDto = MetaResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Object,
        additionalProperties: { type: 'string' },
        example: [{
                station_id: 'This is your Station Id',
                name: "This is your Station Name",
                login_email: "This is your Station Login Email for login via browser",
                login_password: "This is your Station Login Password for login via browser",
                login_url: "This is the Station Login Url",
                source_password: "This is your source password for streaming",
                port: "This is the Port used to connect to the specific azuracast station",
                mount_point: "This is the mountpoint of the specific Station",
            }],
        required: true,
        readOnly: true,
        description: "These are all necessary information of the product and are returned during product creation. The <*>(key) is the name of the information and the value(string) is the description of it. For example when an azuracast station product is created the returnMetaKeys will be station_id,name, login_url,login_email,login_password,source_password,port,mount_point.This information is stored on the Hoster and are sent back to the Provider in every POST"
    }),
    __metadata("design:type", Object)
], MetaResponseDto.prototype, "meta", void 0);
class TaskResponseDto extends BaseResponse {
}
exports.TaskResponseDto = TaskResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        required: true,
        readOnly: true,
        description: "This is the taskId returned by the provider when an operation cannot be done immediately by the provider, thus indicating that the operation has started."
    }),
    __metadata("design:type", String)
], TaskResponseDto.prototype, "taskId", void 0);
class ErrorResponseDto extends BaseResponse {
}
exports.ErrorResponseDto = ErrorResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)({
        type: [String] || String,
        example: "Not implemented",
    }),
    __metadata("design:type", Object)
], ErrorResponseDto.prototype, "errors", void 0);
class BooleanResponseDto extends BaseResponse {
}
exports.BooleanResponseDto = BooleanResponseDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)({
        type: Boolean,
        example: true,
    }),
    __metadata("design:type", Boolean)
], BooleanResponseDto.prototype, "result", void 0);
//# sourceMappingURL=responses.dto.js.map