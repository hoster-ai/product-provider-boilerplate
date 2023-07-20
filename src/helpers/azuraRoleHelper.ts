/* eslint-disable prefer-const */
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { rolesDto } from "src/dtos/azura/roles-dto";

@Injectable()
export class FakeRoleService {
  makeRole(override: Partial<rolesDto> = null): rolesDto {
    const roleObj: rolesDto = {
      name: faker.internet.domainName(),
      permissions: {
        global: ["administer all"],
        station: { [faker.string.numeric().toString()]: ["administer all"] },
      },
    };
    Object.assign(roleObj, override);

    return roleObj;
  }
}
