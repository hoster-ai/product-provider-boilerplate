/* eslint-disable prefer-const */
import { User } from "../entities/users.model";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { AzuraService } from "../services/azura.service";

@Injectable()
export class FakeUserService {
  constructor(private readonly azuraService: AzuraService) {}

  async createUser(value: number): Promise<User[]> {
    let Users: User[];

    Users = [];

    for (let i = 0; i < value; i++) {
      const Obj = this.makeUser();
      Users.push(Obj) && (await this.azuraService.createUser(Obj));
    }
    return Users;
  }

  makeUser(): User {
    const Obj: User = {
      email: faker.internet.email(),
      azura_user_id: faker.string.numeric(2).toString(),
      stations: [
        {
          server_id: faker.string.numeric(2).toString(),
          station_short_name: faker.person.firstName(),
          station_id: faker.string.numeric(2).toString(),
          role_id: faker.string.numeric(2).toString(),
          station_storage: {
            media_storage_location_id: faker.string.numeric(2).toString(),
            recordings_storage_location_id: faker.string.numeric(2).toString(),
            podcasts_storage_location_id: faker.string.numeric(2).toString(),
          },
        },
      ],
    };
    return Obj;
  }
}
