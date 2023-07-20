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
exports.ProviderInfoDto = exports.TabDto = exports.ListActionDto = exports.DynamicPriceInfoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const field_dto_1 = require("./field.dto");
const label_type_enum_1 = require("../enums/label.type.enum");
const class_validator_1 = require("class-validator");
class DynamicPriceInfoDto {
}
exports.DynamicPriceInfoDto = DynamicPriceInfoDto;
__decorate([
    (0, swagger_1.ApiResponseProperty)({ type: String, example: "cpu" }),
    __metadata("design:type", String)
], DynamicPriceInfoDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({ type: Number, example: 5 }),
    __metadata("design:type", Number)
], DynamicPriceInfoDto.prototype, "fetchChargesInterval", void 0);
__decorate([
    (0, swagger_1.ApiResponseProperty)({ type: String, example: "per core" }),
    __metadata("design:type", String)
], DynamicPriceInfoDto.prototype, "description", void 0);
class ListActionDto {
}
exports.ListActionDto = ListActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "www.example.com/some-icon", title: "IconUrl", description: 'This is the url of the button generated/hosted by the provider to be used by the Hoster' }),
    __metadata("design:type", String)
], ListActionDto.prototype, "icon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "Open cPanel", title: "Action Name", description: 'This is the label of the button' }),
    __metadata("design:type", String)
], ListActionDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "", title: "Action Description", description: 'This is the description of the buttons funstion' }),
    __metadata("design:type", String)
], ListActionDto.prototype, "popup", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "", title: "ActionPost", description: 'this is the url of the button.' }),
    __metadata("design:type", String)
], ListActionDto.prototype, "link", void 0);
class TabDto {
}
exports.TabDto = TabDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "Station status control", title: "Tab Name", description: 'This is the name/title of the View/Tab' }),
    __metadata("design:type", String)
], TabDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "www.example.com/rendered-template/front", title: "Tab Render Url", description: 'This is the url of the View generated/hosted by the provider to be used by the Hoster' }),
    __metadata("design:type", String)
], TabDto.prototype, "url", void 0);
class MenuItemDto extends TabDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: "www.example.com/some-icon", description: 'This is the url of the View generated/hosted by the provider to be used by the Hoster' }),
    __metadata("design:type", String)
], MenuItemDto.prototype, "icon", void 0);
let ProviderInfoDto = exports.ProviderInfoDto = class ProviderInfoDto {
};
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "Bronze Azuracast Station",
        required: true,
        description: "Name of the Product or Service",
        title: "Product Name"
    }),
    __metadata("design:type", String)
], ProviderInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "example.com/logo.jpg",
        required: false,
        description: "Logo url of the provider. Recomeded size up to 512x512 px",
        title: "Logo"
    }),
    __metadata("design:type", String)
], ProviderInfoDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        example: "A sample radio product",
        required: true,
        description: "Description of the provider",
        title: "Provider Description"
    }),
    __metadata("design:type", String)
], ProviderInfoDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: field_dto_1.FieldDto,
        isArray: true,
        example: [
            {
                id: "max_listeners",
                label: "Max Listeners",
                value: null,
                type: label_type_enum_1.LabelTypeEnum.TEXT_BOX,
                required: true,
                disabled: false,
                hidden: false,
                regexValidation: "",
                remoteValidation: false,
                error: "",
                description: "",
                default: null,
            },
            {
                id: 'disk',
                label: 'Disk Space',
                value: 50,
                type: "number",
                required: true,
                disabled: false,
                hidden: false,
                regexValidation: "",
                remoteValidation: false,
                error: "",
                description: "",
                default: null,
            }
        ],
        required: true,
        description: "Here we describe to the Hoster which features(fields) the Seller will have available(must fill in) when creating a product on the Hoster. This means the Seller can create products with different characteristics. For example, if the Provider is an Azuracast server, then the Seller will need to fill in his Products the maximum number of listeners and the disc he will have available on a specific Product(i.e. station) for the User(Customer) to upload songs. Each actionField is an Object containing all the relevant information of a feature",
        title: "Product Attributes/Features"
    }),
    __metadata("design:type", Array)
], ProviderInfoDto.prototype, "actionFields", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [field_dto_1.FieldDto],
        example: [
            {
                id: "name",
                label: "Radio station name",
                value: null,
                type: label_type_enum_1.LabelTypeEnum.TEXT_BOX,
                required: true,
                disabled: false,
                hidden: false,
                regexValidation: "",
                remoteValidation: true,
                error: "",
            },
        ],
        required: true,
        readOnly: true,
        description: 'Here we describe to the Hoster any addon/features fields the User(Customer) may have filled in when buying a Product from the Seller. For example if the Product is an Azuracast station, the name of the station that is filled out by the user would be considered an addon.Also if the user would like to add podcast capability this could also be considered an addon (perhaps an optional one).Each addon is an Object containing all the relevant information of an addon',
        title: "Product Addons/Extra features"
    }),
    __metadata("design:type", Array)
], ProviderInfoDto.prototype, "addons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [TabDto],
        example: [
            {
                label: "My Product Info",
                url: "www.example.com/product-tabs/user1/infotab",
            }, {
                label: "Station Status control",
                url: "www.example.com/product-tabs/station_control"
            }
        ],
        required: true,
        description: "Here we send to the Hoster any and all Views that may need to be loaded on the Hoster, on the User(Customer)'s Panel, so that the User(Customer) has access to the Product. These Views are generated by the Provider which sends the label and url of each to be displayed by the Hoster, on the User(Customer)'s Panel",
        title: "Product Tab Views"
    }),
    __metadata("design:type", Array)
], ProviderInfoDto.prototype, "productTabs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [ListActionDto],
        example: [
            {
                icon: "icon.png",
                label: "redirect to cpanel",
                popup: "",
                link: "cpanel.login/XXXXXX",
            },
        ],
        required: false,
        description: "ListActions are quick buttons that need to be displayed on the Hoster. on the User(Customer)'s Panel, most likely on the Product list, whose job is to access functions of the Product immediately without entering a Product Tab. They are generated on the Provider and accesed by the Hoster through the url. They are (almost) always redirects to other pages.",
        title: "ListActions Buttons"
    }),
    __metadata("design:type", Array)
], ProviderInfoDto.prototype, "listActions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [TabDto],
        example: [
            {
                label: "Azuracast Servers",
                url: "www.example.com/settings1/",
            },
        ],
        required: true,
        description: "Here we send to the Hoster any and all Views that need to be loaded on the Seller's Panel, on the Hoster. They contain any and all controlls of options and settings of the Products the Seller needs to have. They are generated on the Provider side and are displayed on the Hoster through the url",
        title: "Product Settings Views"
    }),
    __metadata("design:type", Array)
], ProviderInfoDto.prototype, "settings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [MenuItemDto],
        example: [{ label: "Provider Name", url: "www.myexample.gr/url", icon: "./provider-icon.png", }],
        required: false,
        description: "Menu items is the widget displayed on the Hoster menu that when clicked on directs the user to the sellers products. They are rendered on the provider side and accessed by the hoster through a url.",
        title: "Menu Item Render"
    }),
    __metadata("design:type", Array)
], ProviderInfoDto.prototype, "menuItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        title: "OnBoarding URL",
        example: "someurl.com/default",
        required: false,
        description: "Here we send to the Hoster the View that is rendered by the Provider, that is loaded by Default after the install"
    }),
    __metadata("design:type", String)
], ProviderInfoDto.prototype, "onBoardingUrl", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, swagger_1.ApiProperty)({
        title: "MetaKeys",
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
        description: "These are all necessary information of the Product and are returned during Product creation. The <*>(key) is the name of the information and the value(string) is the description of it. For example when an azuracast station product is created the returnMetaKeys will be station_id,name, login_url,login_email,login_password,source_password,port,mount_point.This information is stored on the Hoster and are sent back to the Provider in every POST"
    }),
    __metadata("design:type", Object)
], ProviderInfoDto.prototype, "returnMetaKeys", void 0);
exports.ProviderInfoDto = ProviderInfoDto = __decorate([
    (0, swagger_1.ApiExtraModels)(field_dto_1.FieldDto)
], ProviderInfoDto);
//# sourceMappingURL=provider-info.dto.js.map