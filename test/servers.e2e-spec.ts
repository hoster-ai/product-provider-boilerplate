import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { FakeServerService } from "../src/helpers/azuraServerHelper";
import { AzuraServerService } from "../src/services/azura.servers.service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Server } from "src/entities/servers.model";
import { JwtService } from "@nestjs/jwt";
import { AzuraService } from "../src/services/azura.service";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

describe(" Server Controller (e2e)", () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let fakeServerService: FakeServerService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let azuraServerService: AzuraServerService;
  let azuraService: AzuraService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AzuraServerService, FakeServerService],
    }).compile();

    azuraServerService = new AzuraServerService();
    app = moduleFixture.createNestApplication();

    fakeServerService = moduleFixture.get<FakeServerService>(FakeServerService);
    jwtService = moduleFixture.get<JwtService>(JwtService);
    azuraService = moduleFixture.get<AzuraService>(AzuraService);

    token = jwtService.sign(
      {
        user_id: "643684b9d3ea0798e1f1c5cf",
        company_id: "643684b9277b8fdeea743ed7",
        admin_rights: true,
      },
      {
        secret: process.env.SERVICE_PROVIDER_TOKEN,
      },
    );

    await app.init();
  });

  beforeEach(async () => {
    await azuraServerService.purge();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST - it creates Server - expected 201, azura_token + azura_url to be defined", () => {
    const server: Server = fakeServerService.makeServer();

    return request(app.getHttpServer())
      .post("/settings/servers")
      .send({
        azura_url: server.azura_url,
        azura_token: server.azura_token,
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .then((res) => {
        expect(res.body.azura_token).toBeDefined();
        expect(res.body.azura_url).toBeDefined();
      });
  });

  it("POST - it doesn't create Server - expected 400 + Invalid token", () => {
    const server: Server = fakeServerService.makeServer();

    return request(app.getHttpServer())
      .post("/settings/servers")
      .send({
        azura_url: server.azura_url,
        azura_token: "fijj9032j90:f03kdf0dk0fkgjj9329",
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Invalid token");
      });
  });

  it("POST - it doesn't create Server - expected message: URL already exists", async () => {
    const created_server: Server[] = await fakeServerService.createServer(1);

    return request(app.getHttpServer())
      .post("/settings/servers")
      .send({
        azura_url: created_server[0].azura_url,
        azura_token: created_server[0].azura_token,
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)

      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("URL already exists");
      });
  });

  it("POST - it doesn't create Server - expected message: Missing required fields", async () => {
    return request(app.getHttpServer())
      .post("/settings/servers")
      .send({})
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Missing required fields");
      });
  });

  it("POST - it doesn't create Server - expected 401, message: Unauthorized", () => {
    const server: Server = fakeServerService.makeServer();

    return request(app.getHttpServer())
      .post("/settings/servers")
      .send({
        azura_url: server.azura_url,
        azura_token: server.azura_token,
      })
      .set("accept", "application/json")
      .expect(401)
      .then((response) => {
        expect(response.body.message).toBe("Unauthorized");
      });
  });

  it("GET - it returns all the servers by company_id - expected 5 servers", async () => {
    await fakeServerService.createServer(5, {
      company_id: "643684b9277b8fdeea743ed7",
    });

    await fakeServerService.createServer(5);

    return request(app.getHttpServer())
      .get(`/settings/servers`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(5);
      });
  });

  it("GET - it returns all the servers by company_id - expected 200 without data", async () => {
    return request(app.getHttpServer())
      .get(`/settings/servers`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)

      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(0);
      });
  });

  it("GET - response specific server by server_id and company_id - expected 200 & find the object", async () => {
    const servers = await fakeServerService.createServer(5, {
      company_id: "643684b9277b8fdeea743ed7",
    });

    return request(app.getHttpServer())
      .get(`/settings/servers/${servers[3]._id}`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)

      .expect(200)
      .then((res) => {
        expect(res.body).toMatchObject(servers[3]);
      });
  });

  it("GET - (admin-rights: false)  expected 403 & message: Forbidden", async () => {
    const servers = await fakeServerService.createServer(5, {
      company_id: "643684b9277b8fdeea743ed7",
    });

    const token = jwtService.sign(
      {
        user_id: "643684b9d3ea0798e1f1c5cf",
        company_id: "643684b9277b8fdeea743ed7",
        admin_rights: false,
      },
      {
        secret: process.env.SERVICE_PROVIDER_TOKEN,
      },
    );

    return request(app.getHttpServer())
      .get(`/settings/servers/${servers[3]._id}`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)

      .expect(403)
      .then((res) => {
        expect(res.body.message).toBe("Forbidden");
      });
  });

  it("GET - response specific server by server_id and company_id - expect 400 message: Invalid server id", async () => {
    await fakeServerService.createServer(5);

    return request(app.getHttpServer())
      .get(`/settings/servers/15`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)

      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Invalid server id");
      });
  });

  it("GET - response specific server by server_id and company_id - expect 401, message: unothorized", async () => {
    await fakeServerService.createServer(5);

    return request(app.getHttpServer())
      .get(`/settings/servers/15`)
      .set("accept", "application/json")

      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe("Unauthorized");
      });
  });

  it("DELETE - delete specific server by server_id and company_id - expected 200, message: Ok", async () => {
    const servers = await fakeServerService.createServer(5, {
      company_id: "643684b9277b8fdeea743ed7",
    });

    return request(app.getHttpServer())
      .delete(`/settings/servers/${servers[2]._id}`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)

      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("DELETE - delete specific server by server_id that is not belong to my company  - expected 404", async () => {
    await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
    });

    const serversY = await fakeServerService.createServer(5, {
      company_id: "yyyyyyy",
    });

    return request(app.getHttpServer())
      .delete(`/settings/servers/${serversY[2]._id}`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)

      .expect(404);
  });

  it("DELETE - delete specific server by server_id and company_id - expected 400 Invalid server id", async () => {
    return request(app.getHttpServer())
      .delete(`/settings/servers/1`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe("Invalid server id");
      });
  });

  it("DELETE - cannot delete server that has stations - expected 400, message: You cannot delete the server while server has stations", async () => {
    const servers = await fakeServerService.createServer(5, {
      company_id: "643684b9277b8fdeea743ed7",
    });

    await azuraService.createUser({
      email: "testing@gmail.com",
      user_id: "643684b9d3ea0798e1f1c5cf",
      azura_user_id: "150",
      stations: [
        {
          server_id: servers[2]._id,
          station_short_name: "station_name",
          station_id: "151",
          role_id: "152",
          station_storage: {
            media_storage_location_id: "101",
            recordings_storage_location_id: "102",
            podcasts_storage_location_id: "103",
          },
        },
      ],
    });
    return request(app.getHttpServer())
      .delete(`/settings/servers/${servers[2]._id}`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)

      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "You cannot delete the server while server has stations",
        );
      });
  });

  it("DELETE - delete server by fake server_id and company_id - expected 404 Server not found", async () => {
    await fakeServerService.createServer(5, {
      company_id: "643684b9277b8fdeea743ed7",
    });
    return request(app.getHttpServer())
      .delete(`/settings/servers/643684b9277b8fdeea743ed7`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Server not found");
      });
  });

  it("PUT - update specific server by server_id and company_id - expected 200, message: Ok", async () => {
    const servers: Server[] = await fakeServerService.createServer(5, {
      company_id: "643684b9277b8fdeea743ed7",
    });

    return request(app.getHttpServer())
      .put(`/settings/servers/${servers[2]._id}`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        azura_url: "azura_url123",
        azura_token: "token_232323232",
      })

      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("PUT - update server by server_id and fake company_id - expected 404 Server not found", async () => {
    const servers: Server[] = await fakeServerService.createServer(5, {
      company_id: "643684b9277b8fdeea73243ed7",
    });

    return request(app.getHttpServer())
      .put(`/settings/servers/${servers[2]._id}`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        azura_url: "azura_url123",
        azura_token: "token_232323232",
      })

      .expect(404)
      .then((res) => {
        expect(res.body.message).toBe("Server not found");
      });
  });

  it("PUT - update specific server by server_id and company_id - expected 400, message: Invalid server id", async () => {
    return request(app.getHttpServer())
      .put(`/settings/servers/1`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)

      .send({ azura_url: "azura_url123", azura_token: "token_232323232" })
      .expect(400)
      .then((response) => {
        expect(response.body.message);
      });
  });

  it("PUT - update specific server by server_id and company_id - expect url already in use", async () => {
    const servers: Server[] = await fakeServerService.createServer(5, {
      company_id: "643684b9d3ea0798e1f1c5cf",
    });

    return request(app.getHttpServer())
      .put(`/settings/servers/${servers[2]._id}`)
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        azura_url: servers[1].azura_url,
        azura_token: "token_232323232",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Url already in use");
      });
  });
});
