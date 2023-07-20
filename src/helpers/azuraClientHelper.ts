/* eslint-disable prefer-const */
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { AzuraUserDto } from "src/dtos/azura/azura-user.dto";
import { CountryEnum } from "src/enums/country.enum";

@Injectable()
export class FakeClientService {
  async makeUsers(value: number): Promise<AzuraUserDto[]> {
    let azuraUsers: AzuraUserDto[] = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (let i = 0; i < value; i++) {
      const azuraUser = this.makeUser();
      azuraUsers.push(azuraUser);
    }

    return azuraUsers;
  }

  makeUser(): AzuraUserDto {
    let date: string;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    date = new Date().toISOString();

    const azuraUser: AzuraUserDto = {
      id: faker.number.int(2).toString(),
      email: faker.internet.email(),
      new_password: faker.internet.password(10).toString(),
      name: faker.person.firstName("male"),
      locale: faker.helpers.arrayElement(Object.values(CountryEnum)),
      theme: "dark",
      show_24_hour_time: true,
      two_factor_secret: "",
      created_at: date,
      updated_at: date,
      roles: faker.helpers.arrayElements([
        "132",
        "21",
        "34",
        "45",
        "73",
        "42",
        "12",
        "63",
        "71",
        "3",
        "7",
        "24",
      ]),
    };

    return azuraUser;
  }
}
