/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { MongoModule } from "../src/mongo/mongo.module";
import { AzuraServerService } from "../src/services/azura.servers.service";
import { FakeServerService } from "../src/helpers/azuraServerHelper";
import { Server } from "../src/entities/servers.model";


describe("UserService", () => {
  let app: INestApplication;
  let azuraServerService: AzuraServerService;
  let fakeServerService: FakeServerService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongoModule],
      providers: [FakeServerService, AzuraServerService],
    }).compile();

    app = moduleFixture.createNestApplication();
    fakeServerService = moduleFixture.get<FakeServerService>(FakeServerService);
    await app.init();

    azuraServerService = new AzuraServerService();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await azuraServerService.purge();
  });

  describe("Creating Server in mongo testing", () => {
    it("should create new server in mongo", () => {
      const server: Server = fakeServerService.makeServer();

      return azuraServerService.createServer(server).then((res) => {
        expect(typeof res.azura_url).toBe("string");
        expect(typeof res.azura_token).toBe("string");
        expect(typeof res.company_id).toBe("string");
      });
    });

    it("should not create new server expect - Invalid token", () => {
      const server: Server = fakeServerService.makeServer();
      server.azura_token = "d85d110d0b4ab478:218159bdbf238c86f5b5d0708f832831d";

      return azuraServerService.createServer(server).catch((err) => {
        expect(err.message).toBe("Invalid token");
      });
    });

    it("should not create new server expect - URL already exists", async () => {
      const server: Server[] = await fakeServerService.createServer(1);
      const server2: Server = fakeServerService.makeServer();
      server2.azura_url = server[0].azura_url;

      return azuraServerService.createServer(server2).catch((err) => {
        expect(err.message).toBe("URL already exists");
      });
    });

    it("should not create new server expect - Missing required fields", () => {
      const server: Server = fakeServerService.makeServer();

      server.azura_token = "";

      return azuraServerService.createServer(server).catch((err) => {
        expect(err.message).toBe("Missing required fields");
      });
    });

    it("should not create new server expect - Missing required fields", () => {
      const server: Server = fakeServerService.makeServer();

      server.company_id = "";

      return azuraServerService.createServer(server).catch((err) => {
        expect(err.message).toBe("Missing required fields");
      });
    });

    it("should not create new server expect - Missing required fields", () => {
      const server: Server = fakeServerService.makeServer();

      server.azura_url = "";

      return azuraServerService.createServer(server).catch((err) => {
        expect(err.message).toBe("Missing required fields");
      });
    });

    it("it should find all servers by user_id", async () => {
      let servers: Server[] = await fakeServerService.createServer(4);

      return azuraServerService
        .findServersByCompanyId(servers[2].company_id)
        .then((res) => {
          expect(res.length).toBe(1);
        });
    });

    it("it should not find all servers - expect server not found", () => {
      return azuraServerService.findServersByCompanyId(null).catch((err) => {
        expect(err.message).toBe("Server not found");
      });
    });

    it("it should find server by user_id and server_id", async () => {
      const server: Server[] = await fakeServerService.createServer(5);
      return azuraServerService
        .findServer(server[3].company_id, server[3]._id)
        .then((res) => {
          expect(typeof res.azura_url).toBe("string");
          expect(typeof res.azura_token).toBe("string");
          expect(typeof res.company_id).toBe("string");
        });
    });

    it("it should update server values", async () => {
      const server: Server[] = await fakeServerService.createServer(5);

      const updateServer: Server = {
        azura_url: "url123",
        azura_token: "token123",
        company_id: server[4].company_id,
      };

      return azuraServerService
        .updateServer(server[4]._id, updateServer)
        .then((res) => {
          expect(res).toBeTruthy();
        });
    });

    it("it should not update server values if azura_url is already used - expect false", async () => {
      const server: Server[] = await fakeServerService.createServer(5);

      const UpdateServer: Server = {
        company_id: server[4].company_id,
        azura_url: server[4].azura_url,
        azura_token: "token123",
      };

      return azuraServerService
        .updateServer(server[4]._id, UpdateServer)
        .catch((err) => {
          expect(err.message).toBe("Url already in use");
        });
    });

    it("it should delete server", async () => {
      const server: Server[] = await fakeServerService.createServer(4);

      return azuraServerService
        .deleteServer(server[0].company_id, server[0]._id)
        .then((res) => {
          expect(res).toBeTruthy();
        });
    });

    it("it should all the created servers - expect true", async () => {
      await fakeServerService.createServer(10);

      return azuraServerService.purge().then((res) => {
        expect(res).toBeTruthy();
      });
    });
  });
});
