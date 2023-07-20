/* eslint-disable prefer-const */
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { Server } from "../entities/servers.model";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AzuraServerService } from "../services/azura.servers.service";

@Injectable()
export class FakeServerService {
  constructor(private readonly AzuraServerService: AzuraServerService) {}

  async createServer(
    value: number,
    override: Partial<Server> = null,
  ): Promise<Server[]> {
    let Servers: Server[];

    Servers = [];

    for (let i = 0; i < value; i++) {
      const Obj = this.makeServer();
      Object.assign(Obj, override);
      Servers.push(Obj) && (await this.AzuraServerService.createServer(Obj));
    }
    return Servers;
  }

  makeServer(override?: Partial<Server>): Server {
    const Obj: Server = {
      _id: faker.database.mongodbObjectId(),
      company_id: faker.string.numeric(3).toString(),
      azura_url: faker.internet.domainName(), // example: https://radio.eastside.gr/api
      azura_token: process.env.API_KEY_AZURE,
    };
    Object.assign(Obj, override);
    return Obj;
  }
}
