/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from "@nestjs/testing";

import { AzuraClientService } from "../src/services/azura.client.service";
import axios from "axios";
import { MongoModule } from "../src/mongo/mongo.module";
import { INestApplication } from "@nestjs/common";
import { FakeClientService } from "../src/helpers/azuraClientHelper";
import { rolesDto } from "../src/dtos/azura/roles-dto";
import { FakeRoleService } from "../src/helpers/azuraRoleHelper";

var MockAdapter = require("axios-mock-adapter");

describe("AzuraClientService", () => {
  let app: INestApplication;
  let azuraClientService: AzuraClientService;
  let mock: any;
  let fakeRoleService: FakeRoleService;

  let fakeClientService: FakeClientService;

  const token = process.env.API_KEY_AZURE;
  const url = "https://radio.eastside.gr/api/";

  const permissionsData = {
    global: [
      {
        id: "administer all",
        name: "All Permissions",
      },
      {
        id: "view administration",
        name: "View Administration Page",
      },
      {
        id: "view system logs",
        name: "View System Logs",
      },
    ],
    station: [
      {
        id: "manage station automation",
        name: "Manage Station Automation",
      },
      {
        id: "manage station web hooks",
        name: "Manage Station Web Hooks",
      },
      {
        id: "manage station podcasts",
        name: "Manage Station Podcasts",
      },
    ],
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongoModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    azuraClientService = new AzuraClientService();
    fakeClientService = new FakeClientService();
    fakeRoleService = new FakeRoleService();

    mock = new MockAdapter(axios);
    mock.reset();
  });
  afterAll(async () => {
    await mock.reset();
    await app.close();
  });
  describe("Testing Azura Api", () => {
    it("testing fake Azura User", () => {
      fakeClientService.makeUsers(5).then((result) => {
        expect(result.length).toBe(5);
      });
    });

    it("Should create a user to Azura - expect azura object", () => {
      const user = fakeClientService.makeUser();
      mock.onPost(`https://radio.eastside.gr/api/admin/users`).reply(200, user);
      return azuraClientService
        .createAzuraUser(user, url, token)
        .then((response) => {
          expect(response).toMatchObject(user);
        });
    });

    it("Should respone all the users of Azura - expect an array of 5 users(Objects)", async () => {
      const users = await fakeClientService.makeUsers(5);
      mock.onGet(`https://radio.eastside.gr/api/admin/users`).reply(200, users);

      return azuraClientService.findAzuraUsers(url, token).then((result) => {
        expect(result.length).toBe(5);
      });
    });

    it("Should respone 1 user of Azura - expect an object of Azura User", () => {
      const user = fakeClientService.makeUser();
      mock
        .onGet(`https://radio.eastside.gr/api/admin/user/${user.id}`)
        .reply(200, user);

      return azuraClientService
        .findAzuraUser(user.id.toString(), url, token)
        .then((response) => {
          expect(response).toMatchObject(user);
        });
    });

    it("Should Update 1 user of Azura - expect succes message", () => {
      const user = fakeClientService.makeUser();

      const updateObject = fakeClientService.makeUser();
      mock
        .onPut(`https://radio.eastside.gr/api/admin/user/${user.id}`)
        .reply(200, { success: true });

      return azuraClientService
        .updateAzuraUser(user.id, updateObject, url, token)
        .then((response) => {
          expect(response["success"]).toBeTruthy();
        });
    });

    it("Should remove 1 user of Azura - expect success message", () => {
      const user = fakeClientService.makeUser();

      mock
        .onDelete(`https://radio.eastside.gr/api/admin/user/${user.id}`)
        .reply(200, { success: true });

      return azuraClientService
        .removeAzuraUser(user.id.toString(), url, token)
        .then((response) => {
          expect(response["success"]).toBeTruthy();
        });
    });

    it("Add new role_id to a user of Azura - expect succes message", () => {
      let user = fakeClientService.makeUser();

      mock
        .onPut(`https://radio.eastside.gr/api/admin/user/${user.id}`)
        .reply(200, { success: true });

      return azuraClientService
        .updateAzuraUser(user.id, { roles: ["15", "14", "16"] }, url, token)
        .then((response) => {
          expect(response["success"]).toBeTruthy();
        });
    });

    it("should create new Role", () => {
      const Role: rolesDto = fakeRoleService.makeRole();

      mock.onPost(`https://radio.eastside.gr/api/admin/roles`).reply(200, Role);

      return azuraClientService.setRole(Role, url, token).then((response) => {
        expect(response).toMatchObject(Role);
      });
    });

    it("should find all roles", () => {
      const Roles: rolesDto[] = [];
      const role1: rolesDto = fakeRoleService.makeRole();
      const role2: rolesDto = fakeRoleService.makeRole();
      Roles.push(role1);
      Roles.push(role2);
      mock.onGet("https://radio.eastside.gr/api/admin/roles").reply(200, Roles);

      return azuraClientService.findRoles(url, token).then((response) => {
        expect(response).toHaveLength(2);
      });
    });

    it("should find all permissions", () => {
      mock
        .onGet("https://radio.eastside.gr/api/admin/permissions")
        .reply(200, permissionsData);

      return azuraClientService.findPermissions(url, token).then((response) => {
        expect(response).toMatchObject(permissionsData);
      });
    });

    it("should find Role by ID", () => {
      const role: rolesDto = fakeRoleService.makeRole();
      role.id = "15";

      mock
        .onGet(`https://radio.eastside.gr/api/admin/role/${role.id}`)
        .reply(200, role);

      return azuraClientService
        .findRole(role.id, url, token)
        .then((response) => {
          expect(response).toMatchObject(role);
          expect(response.id).toBe("15");
        });
    });

    it("should update Role by ID", () => {
      let role1: rolesDto = fakeRoleService.makeRole();
      role1.id = "1";

      let role2: rolesDto = fakeRoleService.makeRole();
      role2.id = "2";

      mock
        .onPut(`https://radio.eastside.gr/api/admin/role/${role1.id}`)
        .reply(200, role2);

      return azuraClientService
        .updateRole(role1.id, role2, url, token)
        .then((response) => {
          expect(response).toMatchObject(role2);
          expect(response.id).toBe(role2.id);
        });
    });

    it("should delete Role by ID", () => {
      const role1: rolesDto = fakeRoleService.makeRole();
      role1.id = "1";

      mock
        .onDelete(`https://radio.eastside.gr/api/admin/role/${role1.id}`)
        .reply(200, role1);

      return azuraClientService
        .deleteRole(role1.id, url, token)
        .then((response) => {
          expect(response).toMatchObject(role1);
        });
    });

    it("should add new role", () => {
      const role: rolesDto = fakeRoleService.makeRole();
      const roles: string[] = ["1", "2", "3"];

      mock.onPut(`https://radio.eastside.gr/api/admin/user/1`).reply(200, role);

      return azuraClientService
        .addRole("1", roles, url, token)
        .then((response) => {
          expect(response).toMatchObject(role);
        });
    });
  });
});
