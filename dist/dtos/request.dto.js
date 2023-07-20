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
exports.ActionFieldsRequestDto = exports.AddonsRequestDto = exports.RequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const product_data_dto_1 = require("./product-data.dto");
const user_data_dto_1 = require("./user-data.dto");
class RequestDto {
}
exports.RequestDto = RequestDto;
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiProperty)({ type: user_data_dto_1.UserDataDto, description: "Here the Hoster sends the User's Data", title: 'User(Customer) Data' }),
    __metadata("design:type", user_data_dto_1.UserDataDto)
], RequestDto.prototype, "userData", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiProperty)({ type: product_data_dto_1.ProductDataDto, title: 'Product/Service Data', description: "Here the Hoster sends the User's Product/service Data with any changes made." }),
    __metadata("design:type", product_data_dto_1.ProductDataDto)
], RequestDto.prototype, "productData", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiProperty)({ type: product_data_dto_1.ProductDataDto, title: 'Previous Product/Service Data', description: "Here the Hoster sends the User's Product/Service Data as it was before any changes were requested.", }),
    __metadata("design:type", product_data_dto_1.ProductDataDto)
], RequestDto.prototype, "previousProductData", void 0);
class AddonsRequestDto {
}
exports.AddonsRequestDto = AddonsRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "id of Addon Feature that requires remote validation.",
        example: "station_name"
    }),
    __metadata("design:type", String)
], AddonsRequestDto.prototype, "addonToBeValidated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Object,
        additionalProperties: true,
        description: "Addon Feature fields to be used for Remote Validation.The key is the id of the feature as a string and the value is of any type'",
        example: [
            {
                max_listeners_id: 15,
                hdd_id: '1G',
                station_name_id: 'MyStation'
            }
        ]
    }),
    __metadata("design:type", Object)
], AddonsRequestDto.prototype, "addonInfo", void 0);
class ActionFieldsRequestDto {
}
exports.ActionFieldsRequestDto = ActionFieldsRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "id of specific product feature that requires remote validation.",
        example: "station_name"
    }),
    __metadata("design:type", String)
], ActionFieldsRequestDto.prototype, "actionFieldToBeValidated", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Object,
        additionalProperties: true,
        description: "Product feature fields to be used for Remote Validation.The key is the id of the feature as a string and the value is of any type",
        example: [
            {
                max_listeners_id: 15,
                hdd_id: '1G',
                station_name_id: 'MyStation'
            }
        ]
    }),
    __metadata("design:type", Object)
], ActionFieldsRequestDto.prototype, "actionFieldinfo", void 0);
//# sourceMappingURL=request.dto.js.map