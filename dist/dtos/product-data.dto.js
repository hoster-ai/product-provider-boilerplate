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
exports.ProductDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const duration_enum_1 = require("../enums/duration.enum");
const ip_type_enum_1 = require("../enums/ip-type.enum");
class IpDto {
}
__decorate([
    (0, class_validator_1.IsIP)(),
    (0, class_validator_1.IsDefined)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "1.1.1.1",
        title: "Ip Address"
    }),
    __metadata("design:type", String)
], IpDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsDefined)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "/24",
        title: "IP range",
    }),
    __metadata("design:type", Number)
], IpDto.prototype, "range", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(ip_type_enum_1.IpTypeEnum),
    (0, class_validator_1.IsDefined)(),
    (0, swagger_1.ApiProperty)({
        enum: ip_type_enum_1.IpTypeEnum,
        example: ip_type_enum_1.IpTypeEnum.IPv4,
        title: "Ip Protocol Type"
    }),
    __metadata("design:type", String)
], IpDto.prototype, "type", void 0);
class ProductDataDto {
}
exports.ProductDataDto = ProductDataDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "5ce45d7606444f199acfba1e",
        title: 'Id of the product/service owned by the user',
        description: 'Id of the product/service owned by the user'
    }),
    __metadata("design:type", String)
], ProductDataDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, swagger_1.ApiProperty)({
        type: Object,
        additionalProperties: true,
        title: "Product options",
        example: {
            max_listeners: 15,
            hdd: '1G',
            station_name: 'MyStation'
        },
        description: 'Options are all the features of the specific product. Theses features include both the features of the product as chosen by the seller when creating the product, as well as any features selected by the user when buying the Prooduct. The <*>(key) is the name of the feature as a key and the value is of <b>any</b> type'
    }),
    __metadata("design:type", Object)
], ProductDataDto.prototype, "options", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, swagger_1.ApiProperty)({
        type: Object,
        additionalProperties: { type: "string" },
        title: "Product meta",
        example: { station_id: "example_id", max_listeners: 15, disc_usage: "1G", },
        description: 'These are any/all information the provider requires to know about a specific product instance that is owned by a specific user. They are kept by the Hoster, and sent back on every post. The <*>(key) is the name of feature as a key and the value is the (description of the feature or)value of that feature'
    }),
    __metadata("design:type", Object)
], ProductDataDto.prototype, "meta", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(duration_enum_1.DurationEnum),
    (0, swagger_1.ApiProperty)({
        enum: duration_enum_1.DurationEnum,
        title: "Duration in months",
        example: duration_enum_1.DurationEnum.ONE_YEAR,
        description: 'This is the duration of the subscription the user has to the product in months.'
    }),
    __metadata("design:type", String)
], ProductDataDto.prototype, "duration", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: [IpDto],
        title: "The list of IPs connected to this product. Whether they are domains or others."
    }),
    __metadata("design:type", Array)
], ProductDataDto.prototype, "ips", void 0);
//# sourceMappingURL=product-data.dto.js.map