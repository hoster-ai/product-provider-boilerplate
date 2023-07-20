/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AzuraUserDto } from "src/dtos/azura/azura-user.dto";
import { rolesDto } from "src/dtos/azura/roles-dto";
import { createStationDto } from "../dtos/azura/create-data.station.dto";
import axios from "axios";
import { UserDataDto } from "src/dtos/user-data.dto";
import { Server } from "../entities/servers.model";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@Injectable()
export class AzuraClientService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  async request<T>(
    data: T,
    method: "GET" | "POST" | "PUT" | "DELETE",
    endpoint: string,
    url: string,
    token: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      axios(url + endpoint, {
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

  // Azura Users
  public createAzuraUser(
    User: AzuraUserDto,
    url: string,
    token: string,
  ): Promise<AzuraUserDto> {
    return this.request<AzuraUserDto>(User, "POST", "admin/users", url, token);
  }

  public findAzuraUsers(url: string, token: string): Promise<AzuraUserDto[]> {
    return this.request(null, "GET", "admin/users", url, token);
  }

  public findAzuraUser(
    id: string,
    url: string,
    token: string,
  ): Promise<AzuraUserDto> {
    return this.request(null, "GET", `admin/user/${id.toString()}`, url, token);
  }

  public updateAzuraUser(
    id: number | string,
    attrs: Partial<AzuraUserDto>,
    url: string,
    token: string,
  ): Promise<boolean> {
    return this.request(
      attrs,
      "PUT",
      `admin/user/${id.toString()}`,
      url,
      token,
    );
  }

  public removeAzuraUser(id: string, url: string, token: string): Promise<any> {
    return this.request(
      null,
      "DELETE",
      `admin/user/${id.toString()}`,
      url,
      token,
    );
  }
  // End of Azura Users
  public addRole(
    azura_id: string,
    roles: string[],
    url: string,
    token: string,
  ): Promise<boolean> {
    return this.updateAzuraUser(
      azura_id,
      {
        roles: roles,
      },
      url,
      token,
    );
  }
  //Azura Roles
  public setRole(Role: rolesDto, url: string, token: string) {
    return this.request<rolesDto>(Role, "POST", "admin/roles", url, token);
  }
  public findPermissions(url: string, token: string): Promise<any> {
    return this.request(null, "GET", "admin/permissions", url, token);
  }

  public findRoles(url: string, token: string): Promise<any> {
    return this.request(null, "GET", "admin/roles", url, token);
  }

  public findRole(id: number | string, url: string, token: string) {
    return this.request(null, "GET", `admin/role/${id.toString()}`, url, token);
  }

  public updateRole(
    id: number | string,
    attrs: Partial<rolesDto>,
    url: string,
    token: string,
  ): Promise<any> {
    return this.request(
      attrs,
      "PUT",
      `admin/role/${id.toString()}`,
      url,
      token,
    );
  }

  public deleteRole(
    id: number | string,
    url: string,
    token: string,
  ): Promise<any> {
    return this.request(null, "DELETE", `admin/role/${id}`, url, token);
  }

  // Azura stations
  public createStation(
    createVideoStreamingData: createStationDto,
    url: string,
    token: string,
  ) {
    return this.request<createStationDto>(
      createVideoStreamingData,
      "POST",
      "admin/stations",
      url,
      token,
    );
  }

  public findStations(url: string, token: string): any {
    return this.request(null, "GET", "admin/stations", url, token);
  }

  public findStation(id: string, url: string, token: string) {
    return this.request(null, "GET", `admin/station/${id}`, url, token);
  }

  public findStationMount(id: string, url: string, token: string): any {
    return this.request(null, "GET", `station/${id}/mounts`, url, token);
  }

  public updateStation(
    id: number | string,
    attrs: Partial<createStationDto>,
    url: string,
    token: string,
  ): Promise<any> {
    return this.request(
      attrs,
      "PUT",
      `admin/station/${id.toString()}`,
      url,
      token,
    );
  }

  public deleteStation(id: string, url: string, token: string): Promise<any> {
    return this.request(null, "DELETE", `admin/station/${id}`, url, token);
  }

  public purgeStations(url: string, token: string) {
    return this.findStations(url, token).then((result) => {
      return result.forEach((station: createStationDto) => {
        this.deleteStation(station.id, url, token).then((respone) => {
          return respone;
        });
      });
    });
  }

  public purgeAllClient(url: string, token: string) {
    return this.findStations(url, token)
      .then((result: any) => {
        return result.forEach((station: createStationDto) => {
          this.deleteStation(station.id, url, token).then((respone) => {
            return respone;
          });
        });
      })
      .then(() => {
        return this.findRoles(url, token).then((result) => {
          return result.forEach((role: rolesDto) => {
            if (role.id != "1") {
              this.deleteRole(role.id, url, token);
            }
          });
        });
      })
      .then(() => {
        return this.findAzuraUsers(url, token).then((result) => {
          return result.forEach((user: UserDataDto) => {
            if (user.id != "1") {
              this.removeAzuraUser(user.id, url, token);
            }
          });
        });
      });
  }

  // Azura storages
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public updateStorage(
    id: string,
    storage: string,
    url: string,
    token: string,
  ): any {
    return this.request(
      { storageQuota: storage },
      "PUT",
      `admin/storage_location/${id}`,
      url,
      token,
    );
  }

  public findStorage(id: string, url: string, token: string): any {
    return this.request(
      null,
      "GET",
      `admin/storage_location/${id}`,
      url,
      token,
    );
  }

  // restart: Restart all services associated with the radio broadcast
  // frontend/restart: Perform service control actions on the radio frontend (Icecast, Shoutcast, etc.)
  // frontend is about: Broadcasting Service Icecast.
  // backend is about: AutoDJ Service.
  public stationServiceControl(
    station_id: string,
    action:
      | "frontend/start"
      | "frontend/stop"
      | "frontend/restart"
      | "backend/start"
      | "backend/stop"
      | "backend/restart"
      | "restart"
      | "status",
    method: "POST" | "GET",
    url: string,
    token: string,
  ) {
    return this.request(
      null,
      method,
      `station/${station_id}/${action}`,
      url,
      token,
    );
  }

  public suspend(station_id: string, server: Server) {
    return this.updateStation(
      station_id,
      {
        is_enabled: false,
      },
      server.azura_url,
      server.azura_token,
    );
  }

  public unsuspend(station_id: string, server: Server) {
    return this.updateStation(
      station_id,
      {
        is_enabled: true,
      },
      server.azura_url,
      server.azura_token,
    );
  }
}
