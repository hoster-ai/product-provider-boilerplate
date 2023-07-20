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
exports.FieldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const label_type_enum_1 = require("../enums/label.type.enum");
class FieldDto {
}
exports.FieldDto = FieldDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Id of the product/service feature.",
        example: "max_listeners",
    }),
    __metadata("design:type", String)
], FieldDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Name of the product/service feature.",
        example: "Max listeners",
        title: "Product Feature Name"
    }),
    __metadata("design:type", String)
], FieldDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description of the product/service feature.",
        nullable: true,
        example: "Fill the value of the max listeners.",
        title: "Product Feature Description"
    }),
    __metadata("design:type", String)
], FieldDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { type: 'string' },
            { type: 'number' },
            { type: 'object', additionalProperties: true },
            { type: 'null' }
        ],
        description: "Set default value of the product/service feature.",
        default: null,
        example: { listeners: 5, disc: "1G", },
        title: "Default Feature Value"
    }),
    __metadata("design:type", Object)
], FieldDto.prototype, "default", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String || Number || Object || null,
        description: "The input value of the product/service feature that user will fill.",
        example: { listeners: 10, disc: "4GB", },
        oneOf: [
            { type: 'string' },
            { type: 'number' },
            { type: 'object', additionalProperties: true }
        ],
        title: "Product Feature Value"
    }),
    __metadata("design:type", Object)
], FieldDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "product/service feature input type. i.e Radio,Text,Selector",
        example: label_type_enum_1.LabelTypeEnum.RADIO_BOX,
        title: "Feature Input Type"
    }),
    __metadata("design:type", String)
], FieldDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "product/service feature is required or not.",
        example: true,
        title: "Required"
    }),
    __metadata("design:type", Boolean)
], FieldDto.prototype, "required", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Set the product/service feature tag as disabled or not.",
        example: false,
        title: "Disabled"
    }),
    __metadata("design:type", Boolean)
], FieldDto.prototype, "disabled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Set the product/service feature as hidden or not.",
        example: false,
        title: "Hidden"
    }),
    __metadata("design:type", Boolean)
], FieldDto.prototype, "hidden", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Set if regex validation is nessecary for the product/service feature.",
        example: "[A-Za-z]{3}",
        title: "Regex Validation Requirement"
    }),
    __metadata("design:type", String)
], FieldDto.prototype, "regexValidation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "The error message return after regex validation.",
        nullable: true,
        example: "Please enter up to 15 digits for a contact number",
        title: "Error Regex Mesage"
    }),
    __metadata("design:type", String)
], FieldDto.prototype, "regexValidationErrorMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "If remote validation is set to true means the value of product/service feature the user entered awaits validation from the validation end point of the provider.",
        example: true,
        title: "Remote Validation"
    }),
    __metadata("design:type", Boolean)
], FieldDto.prototype, "remoteValidation", void 0);
//# sourceMappingURL=field.dto.js.map