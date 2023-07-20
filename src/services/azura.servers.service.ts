/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { Server } from "../entities/servers.model";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

@Injectable()
export class AzuraServerService {
  private readonly serversModel: ReturnModelType<typeof Server>;
  constructor() {
    this.serversModel = getModelForClass(Server);
  }

  public async createServer(server: Server): Promise<Server | null> {
    const regex: RegExp = /^[a-fA-F0-9]+\:[a-fA-F0-9]{32}$/;

    if (!server.azura_token || !server.azura_url || !server.company_id) {
      throw new Error("Missing required fields");
    }

    if (await this.urlExists(server.azura_url)) {
      throw new Error("URL already exists");
    }

    if (!regex.test(server.azura_token)) {
      throw new Error("Invalid token");
    }
    const newModel = new this.serversModel(server);

    return newModel.save();
  }

  public async findServersByCompanyId(
    company_id: string,
  ): Promise<Server[] | null> {
    return this.serversModel.find({ company_id: company_id });
  }

  public async urlExists(azura_url: string): Promise<boolean> {
    return this.serversModel.findOne({ azura_url });
  }

  public async findServer(
    company_id: string,
    server_id: string,
  ): Promise<Server | null> {
    return this.serversModel.findOne({
      company_id: company_id,
      _id: server_id,
    });
  }

  public async deleteServer(
    company_id: string,
    server_id: string,
  ): Promise<boolean> {
    if (!company_id || !server_id) {
      return false;
    }
    return this.serversModel
      .deleteOne({ company_id: company_id, _id: server_id })
      .then((res) => {
        if (res.deletedCount === 1) {
          return true;
        }
        throw new Error("Server not found");
      });
  }

  public async updateServer(
    server_id: string,
    server: Server,
  ): Promise<boolean> {
    return this.serversModel
      .updateOne(
        {
          _id: server_id,
          company_id: server.company_id,
        },
        {
          $set: {
            azura_token: server.azura_token,
            azura_url: server.azura_url,
          },
        },
      )
      .then((response) => {
        if (response.modifiedCount == 1) {
          return true;
        }
        throw new Error("Server not found");
      });
  }

  public async purge(): Promise<boolean> {
    if (process.env.NODE_ENV === "production") {
      return false;
    }
    return this.serversModel.deleteMany({}).then((res) => {
      if (res.deletedCount > 0) {
        return true;
      }
      return false;
    });
  }
}
