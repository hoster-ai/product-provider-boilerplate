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
exports.AzuraService = void 0;
const common_1 = require("@nestjs/common");
const typegoose_1 = require("@typegoose/typegoose");
const users_model_1 = require("../entities/users.model");
const greek_utils_1 = require("greek-utils");
require("dotenv").config();
let AzuraService = exports.AzuraService = class AzuraService {
    constructor() {
        this.usersModel = (0, typegoose_1.getModelForClass)(users_model_1.User);
    }
    async createUser(User) {
        const newModel = new this.usersModel(User);
        return newModel.save();
    }
    nameToShortName(name) {
        return (0, greek_utils_1.toGreeklish)(name)
            .toLocaleLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9 \-]/g, "");
    }
    async addStation(user, station) {
        return this.usersModel
            .updateOne({
            azura_user_id: user.azura_user_id,
        }, { $push: { stations: station } })
            .then(async (response) => {
            if (response.modifiedCount === 1) {
                return this.usersModel.findOne({
                    azura_user_id: user.azura_user_id,
                });
            }
            return null;
        });
    }
    async findUserRoles(user) {
        return user.stations.map((station) => {
            return station.role_id;
        });
    }
    async findUserByAzuraID(id) {
        return this.usersModel.findOne({ azura_user_id: id });
    }
    async findUserByUserID(id) {
        return this.usersModel.findOne({ user_id: id });
    }
    async findUserByEmail(email) {
        return this.usersModel.findOne({ email });
    }
    async stationExists(short_name) {
        const query = {
            "stations.station_short_name": { $regex: new RegExp(short_name, "i") },
        };
        return this.usersModel.find(query, { "stations.$": 1 }).then((object) => {
            if (object.length > 0) {
                return true;
            }
            return false;
        });
    }
    async serverHasStations(server_id) {
        const query = {
            "stations.server_id": { $regex: new RegExp(server_id, "i") },
        };
        return this.usersModel.find(query, { "stations.$": 1 }).then((object) => {
            if (object.length > 0) {
                return true;
            }
            return false;
        });
    }
    async findUserByStationId(station_id) {
        return this.usersModel.findOne({ "stations.station_id": station_id });
    }
    async removeStationFromUser(user, station) {
        const query = {
            "stations.station_id": user.stations[0].station_id,
            "stations.role_id": user.stations[0].role_id,
        };
        return this.usersModel
            .updateOne(query, { $pull: { stations: station } })
            .then((response) => {
            if (response.modifiedCount == 1) {
                return true;
            }
            throw new Error("Station not found");
        });
    }
    async purge() {
        if (process.env.NODE_ENV === "production") {
            return false;
        }
        return this.usersModel.deleteMany({});
    }
};
exports.AzuraService = AzuraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AzuraService);
//# sourceMappingURL=azura.service.js.map