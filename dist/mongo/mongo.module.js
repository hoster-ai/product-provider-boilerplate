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
exports.MongoModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("mongoose");
let MongoModule = exports.MongoModule = class MongoModule {
    constructor(config) {
        this.config = config;
    }
    async onModuleInit() {
        (0, mongoose_1.set)("strictQuery", false);
        this.connection = await (0, mongoose_1.connect)(this.config.get("MONGO_URL"));
    }
    async onModuleDestroy() {
        (0, mongoose_1.disconnect)();
    }
};
exports.MongoModule = MongoModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        controllers: [],
        providers: [config_1.ConfigService],
        exports: [],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MongoModule);
//# sourceMappingURL=mongo.module.js.map