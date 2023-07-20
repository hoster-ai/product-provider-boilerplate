"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzuraClientService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
require("dotenv").config();
let AzuraClientService = exports.AzuraClientService = class AzuraClientService {
    async request(data, method, endpoint, url, token) {
        return new Promise((resolve, reject) => {
            (0, axios_1.default)(url + endpoint, {
                headers: {
                    "X-API-KEY": token,
                    "Content-Type": "application/json",
                },
                data,
                method,
            })
                .then((response) => {
                resolve(response.data);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    createAzuraUser(User, url, token) {
        return this.request(User, "POST", "admin/users", url, token);
    }
    findAzuraUsers(url, token) {
        return this.request(null, "GET", "admin/users", url, token);
    }
    findAzuraUser(id, url, token) {
        return this.request(null, "GET", `admin/user/${id.toString()}`, url, token);
    }
    updateAzuraUser(id, attrs, url, token) {
        return this.request(attrs, "PUT", `admin/user/${id.toString()}`, url, token);
    }
    removeAzuraUser(id, url, token) {
        return this.request(null, "DELETE", `admin/user/${id.toString()}`, url, token);
    }
    addRole(azura_id, roles, url, token) {
        return this.updateAzuraUser(azura_id, {
            roles: roles,
        }, url, token);
    }
    setRole(Role, url, token) {
        return this.request(Role, "POST", "admin/roles", url, token);
    }
    findPermissions(url, token) {
        return this.request(null, "GET", "admin/permissions", url, token);
    }
    findRoles(url, token) {
        return this.request(null, "GET", "admin/roles", url, token);
    }
    findRole(id, url, token) {
        return this.request(null, "GET", `admin/role/${id.toString()}`, url, token);
    }
    updateRole(id, attrs, url, token) {
        return this.request(attrs, "PUT", `admin/role/${id.toString()}`, url, token);
    }
    deleteRole(id, url, token) {
        return this.request(null, "DELETE", `admin/role/${id}`, url, token);
    }
    createStation(createVideoStreamingData, url, token) {
        return this.request(createVideoStreamingData, "POST", "admin/stations", url, token);
    }
    findStations(url, token) {
        return this.request(null, "GET", "admin/stations", url, token);
    }
    findStation(id, url, token) {
        return this.request(null, "GET", `admin/station/${id}`, url, token);
    }
    findStationMount(id, url, token) {
        return this.request(null, "GET", `station/${id}/mounts`, url, token);
    }
    updateStation(id, attrs, url, token) {
        return this.request(attrs, "PUT", `admin/station/${id.toString()}`, url, token);
    }
    deleteStation(id, url, token) {
        return this.request(null, "DELETE", `admin/station/${id}`, url, token);
    }
    purgeStations(url, token) {
        return this.findStations(url, token).then((result) => {
            return result.forEach((station) => {
                this.deleteStation(station.id, url, token).then((respone) => {
                    return respone;
                });
            });
        });
    }
    purgeAllClient(url, token) {
        return this.findStations(url, token)
            .then((result) => {
            return result.forEach((station) => {
                this.deleteStation(station.id, url, token).then((respone) => {
                    return respone;
                });
            });
        })
            .then(() => {
            return this.findRoles(url, token).then((result) => {
                return result.forEach((role) => {
                    if (role.id != "1") {
                        this.deleteRole(role.id, url, token);
                    }
                });
            });
        })
            .then(() => {
            return this.findAzuraUsers(url, token).then((result) => {
                return result.forEach((user) => {
                    if (user.id != "1") {
                        this.removeAzuraUser(user.id, url, token);
                    }
                });
            });
        });
    }
    updateStorage(id, storage, url, token) {
        return this.request({ storageQuota: storage }, "PUT", `admin/storage_location/${id}`, url, token);
    }
    findStorage(id, url, token) {
        return this.request(null, "GET", `admin/storage_location/${id}`, url, token);
    }
    stationServiceControl(station_id, action, method, url, token) {
        return this.request(null, method, `station/${station_id}/${action}`, url, token);
    }
    suspend(station_id, server) {
        return this.updateStation(station_id, {
            is_enabled: false,
        }, server.azura_url, server.azura_token);
    }
    unsuspend(station_id, server) {
        return this.updateStation(station_id, {
            is_enabled: true,
        }, server.azura_url, server.azura_token);
    }
};
exports.AzuraClientService = AzuraClientService = __decorate([
    (0, common_1.Injectable)()
], AzuraClientService);
//# sourceMappingURL=azura.client.service.js.map