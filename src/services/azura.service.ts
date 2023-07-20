/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { Station, User } from "../entities/users.model";
import { toGreeklish } from "greek-utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@Injectable()
export class AzuraService {
  private readonly usersModel: ReturnModelType<typeof User>;

  constructor() {
    this.usersModel = getModelForClass(User);
  }

  public async createUser(User: User) {
    const newModel = new this.usersModel(User);

    return newModel.save();
  }

  public nameToShortName(name: string): string {
    return toGreeklish(name)
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9 \-]/g, "");
  }

  public async addStation(user: User, station: Station): Promise<User | null> {
    return this.usersModel
      .updateOne(
        {
          azura_user_id: user.azura_user_id,
        },
        { $push: { stations: station } },
      )
      .then(async (response) => {
        if (response.modifiedCount === 1) {
          return this.usersModel.findOne({
            azura_user_id: user.azura_user_id,
          });
        }
        return null;
      });
  }

  public async findUserRoles(user: User): Promise<string[]> {
    return user.stations.map((station) => {
      return station.role_id;
    });
  }

  public async findUserByAzuraID(id: string): Promise<User | null> {
    return this.usersModel.findOne({ azura_user_id: id });
  }

  public async findUserByUserID(id: string): Promise<User | null> {
    return this.usersModel.findOne({ user_id: id });
  }

  public async findUserByEmail(email: string): Promise<User> | null {
    return this.usersModel.findOne({ email });
  }

  public async stationExists(short_name: string): Promise<boolean> {
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

  public async serverHasStations(server_id: string): Promise<boolean> {
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

  // Επιστρέφει το User από το station_id
  public async findUserByStationId(station_id: string): Promise<User> {
    return this.usersModel.findOne({ "stations.station_id": station_id });
  }

  public async removeStationFromUser(
    user: User,
    station: Station,
  ): Promise<boolean | Error> {
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

  public async purge() {
    if (process.env.NODE_ENV === "production") {
      return false;
    }
    return this.usersModel.deleteMany({});
  }
}
