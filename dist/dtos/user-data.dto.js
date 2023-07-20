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
exports.UserDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const country_enum_1 = require("../enums/country.enum");
class UserDataDto {
}
exports.UserDataDto = UserDataDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Id of the User",
        example: "5ce45d7606444f199acfba1e",
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Id of the company",
        example: "5ce45d7606444f199acfba1e",
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "companyId", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        title: "Email",
        example: "email@example.com",
        description: "Email of the User/company"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        title: "First Name",
        example: "Fname",
        description: "User's First name"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        type: String,
        title: "Last Name",
        example: "Lname",
        description: "User's Last name"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        title: "Is company",
        example: false,
        default: false,
        description: "Indicates whether the user is a company or not"
    }),
    __metadata("design:type", Boolean)
], UserDataDto.prototype, "isCompany", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(250),
    (0, swagger_1.ApiProperty)({
        type: String,
        title: "Company Name",
        description: "The name of the Company. Is null or empty string if is not company"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "companyName", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsPhoneNumber)(null),
    (0, swagger_1.ApiProperty)({
        type: String,
        title: "Telephone",
        example: "+30.2100000000",
        description: "User's phone number"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "telephone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)(null),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        title: "Mobile",
        example: "+30.6900000000",
        description: "User's Mobile number"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "mobile", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(250),
    (0, swagger_1.ApiProperty)({
        type: String,
        title: "Address 1",
        example: "Leof. Kon/nou Karamanli 45",
        description: "User's Main Address"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "address1", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(250),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        title: "Address 2",
        example: "Leof. Kon/nou Karamanli 45",
        description: "User's Secondary Address"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "address2", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(250),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        title: "Address 3",
        example: "Leof. Kon/nou Karamanli 45",
        description: "User's Tertiary Address"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "address3", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(16),
    (0, swagger_1.ApiProperty)({
        type: String,
        title: "Postal Code",
        example: "545454",
        description: "User's Postal code"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "postcode", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(250),
    (0, swagger_1.ApiProperty)({
        type: String,
        title: "City",
        description: "User's City"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(country_enum_1.CountryEnum),
    (0, swagger_1.ApiProperty)({
        enum: country_enum_1.CountryEnum,
        title: "Country Code",
        example: "GB",
        description: "User's country code"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(0),
    (0, class_validator_1.MaxLength)(250),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        title: "State",
        description: "User's State"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(3),
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        title: "Currency",
        example: "Euro",
        description: "User's selected currency"
    }),
    __metadata("design:type", String)
], UserDataDto.prototype, "currency", void 0);
//# sourceMappingURL=user-data.dto.js.map