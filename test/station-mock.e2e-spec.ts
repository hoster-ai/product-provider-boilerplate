/* eslint-disable no-var */
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
import { AzuraClientService } from "../src/services/azura.client.service";
// eslint-disable-next-line @typescript-eslint/no-var-requires
var MockAdapter = require("axios-mock-adapter");
import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
jest.setTimeout(15000);

describe(" Station Controller (e2e)", () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let fakeServerService: FakeServerService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let azuraServerService: AzuraServerService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let azuraService: AzuraService;
  let mock: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AzuraServerService, FakeServerService, AzuraClientService],
    }).compile();

    azuraServerService = new AzuraServerService();
    app = moduleFixture.createNestApplication();

    await app.init();

    fakeServerService = moduleFixture.get<FakeServerService>(FakeServerService);
    jwtService = moduleFixture.get<JwtService>(JwtService);
    azuraService = moduleFixture.get<AzuraService>(AzuraService);

    token = jwtService.sign(
      {
        user_id: "643684b9d3ea0798e1f1c5cf",
        company_id: "643684b9277b8fdeea743ed7",
      },
      {
        secret: process.env.SERVICE_PROVIDER_TOKEN,
      },
    );
    mock = new MockAdapter(axios);
  });

  beforeEach(async () => {
    await azuraServerService.purge();
  });

  afterAll(async () => {
    await mock.reset();
    await app.close();
    jest.setTimeout(5000);
  });

  it("POST - station not found - 400 , message: StationNotFoundException at /var/azuracast/www/src/Middleware/RequireStation.php L23: Station not found.", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });
    mock
      .onPost(`https://radio.eastside.gr/api/station/1/frontend/stop`)
      .reply(400, {
        message:
          "StationNotFoundException at /var/azuracast/www/src/Middleware/RequireStation.php L23: Station not found.",
      });

    return request(app.getHttpServer())
      .post("/station/broadcast/stop")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: "1",
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe(
          "StationNotFoundException at /var/azuracast/www/src/Middleware/RequireStation.php L23: Station not found.",
        );
      });
  });

  it("POST - it should start the station expect - 200, message: Station running succcessfuly", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    mock
      .onPost(`https://radio.eastside.gr/api/station/1/frontend/start`)
      .reply(200);

    return request(app.getHttpServer())
      .post("/station/broadcast/start")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: "1",
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - it should stop the station expect- 200 message: Station stop running succcessfuly ", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    mock
      .onPost(`https://radio.eastside.gr/api/station/1/frontend/stop`)
      .reply(200);

    return request(app.getHttpServer())
      .post("/station/broadcast/stop")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: "1",
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - it should restart the station expect- 200 message: Station restarting succcessfuly ", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    mock
      .onPost(`https://radio.eastside.gr/api/station/1/frontend/restart`)
      .reply(200);

    return request(app.getHttpServer())
      .post("/station/broadcast/restart")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: "1",
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - it should start the autodj expect- 200 message: AutoDJ start running succcessfuly ", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    mock
      .onPost(`https://radio.eastside.gr/api/station/1/backend/start`)
      .reply(200);

    return request(app.getHttpServer())
      .post("/station/autodj/start")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: "1",
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - it should stop the autodj expect- 200 message: AutoDJ stop running succcessfuly ", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    mock
      .onPost(`https://radio.eastside.gr/api/station/1/backend/stop`)
      .reply(200);

    return request(app.getHttpServer())
      .post("/station/autodj/stop")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: "1",
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - it should restart the autodj expect- 200 message: AutoDJ restart running succcessfuly", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    mock
      .onPost(`https://radio.eastside.gr/api/station/1/backend/restart`)
      .reply(200);

    return request(app.getHttpServer())
      .post("/station/autodj/restart")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: "1",
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - not found the station to start expect - 401 , message: Unauthorized.", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    mock
      .onPost(`https://radio.eastside.gr/api/station/1/broadcast/start`)
      .reply(403, {
        message: "Unauthorized",
      });

    return request(app.getHttpServer())
      .post("/station/broadcast/start")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: "1",
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer NOTOKEN`)
      .expect(401)
      .then((response) => {
        expect(response.body.message).toBe("Unauthorized");
      });
  });
});
