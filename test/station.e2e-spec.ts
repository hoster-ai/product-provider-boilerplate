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
require("dotenv").config();
jest.setTimeout(20000);

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
  let azuraClientService: AzuraClientService;

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
    azuraClientService =
      moduleFixture.get<AzuraClientService>(AzuraClientService);

    token = jwtService.sign(
      {
        user_id: "643684b9d3ea0798e1f1c5cf",
        company_id: "643684b9277b8fdeea743ed7",
      },
      {
        secret: process.env.SERVICE_PROVIDER_TOKEN,
      },
    );
  });

  beforeEach(async () => {
    await azuraServerService.purge();
    await azuraClientService.purgeAllClient(
      "https://radio.eastside.gr/api/",
      process.env.API_KEY_AZURE,
    );
  });

  afterAll(async () => {
    await app.close();
    jest.setTimeout(5000);
  });

  it("Should return status of station - Expect 200 and station status", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const stationObj = { name: "myStation" };

    const station = await azuraClientService.createStation(
      stationObj,
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.stationServiceControl(
      station.id,
      "restart",
      "POST",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/station/status")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id,
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.stationStatus.backend_running).toBeDefined();
        expect(response.body.stationStatus.frontend_running).toBeDefined();
        expect(response.body.stationStatus.station_has_started).toBeDefined();
        expect(response.body.stationStatus.station_needs_restart).toBeDefined();
      });
  });

  it.only("POST - station not found - 400 , message: StationNotFoundException at /var/azuracast/www/src/Middleware/RequireStation.php L23: Station not found.", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    return request(app.getHttpServer())
      .post("/station/broadcast/stop")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: "442",
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

  it("POST - it should start the station expect - 200, message: Ok", async () => {
    await new Promise((r) => {
      // wating 5 seconds before executing test otherwise it could fail because azura need his time;
      setTimeout(r, 5000);
    });

    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const stationObj = { name: "station" };

    const station = await azuraClientService.createStation(
      stationObj,
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.stationServiceControl(
      station.id,
      "restart",
      "POST",
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.stationServiceControl(
      station.id,
      "frontend/stop",
      "POST",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/station/broadcast/start")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id,
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

  it("POST - it should stop the station expect- 200 message: Ok ", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const stationObj = { name: "station2" };

    const station = await azuraClientService.createStation(
      stationObj,
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.stationServiceControl(
      station.id,
      "restart",
      "POST",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/station/broadcast/stop")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id,
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - it should restart the station expect- 200 message: Ok ", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const stationObj = { name: "station3" };

    const station = await azuraClientService.createStation(
      stationObj,
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.stationServiceControl(
      station.id,
      "restart",
      "POST",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/station/broadcast/restart")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id,
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - it should start the autodj expect- 200 message: Ok ", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const stationObj = { name: "station52" };

    const station = await azuraClientService.createStation(
      stationObj,
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.stationServiceControl(
      station.id,
      "restart",
      "POST",
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.stationServiceControl(
      station.id,
      "backend/stop",
      "POST",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/station/autodj/start")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id,
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - it should stop the autodj expect- 200 message: Ok ", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const stationObj = { name: "station32" };

    const station = await azuraClientService.createStation(
      stationObj,
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.stationServiceControl(
      station.id,
      "restart",
      "POST",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/station/autodj/stop")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id,
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - it should restart the autodj expect- 200 message: Ok", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const stationObj = { name: "station34" };

    const station = await azuraClientService.createStation(
      stationObj,
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.stationServiceControl(
      station.id,
      "restart",
      "POST",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/station/autodj/restart")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id,
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

    return request(app.getHttpServer())
      .post("/station/broadcast/start")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: "0",
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
