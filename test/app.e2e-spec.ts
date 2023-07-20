/* eslint-disable prefer-const */
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { AzuraService } from "../src/services/azura.service";
import { FakeServerService } from "../src/helpers/azuraServerHelper";
import { AzuraServerService } from "../src/services/azura.servers.service";
import { Server } from "../src/entities/servers.model";
import { AzuraClientService } from "../src/services/azura.client.service";
import { JwtService } from "@nestjs/jwt";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let azuraService: AzuraService;
  let fakeServerService: FakeServerService;
  let azuraServerService: AzuraServerService;
  let azuraClientService: AzuraClientService;
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [FakeServerService, AzuraServerService],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    azuraService = new AzuraService();

    fakeServerService = moduleFixture.get<FakeServerService>(FakeServerService);

    azuraServerService =
      moduleFixture.get<AzuraServerService>(AzuraServerService);

    azuraClientService =
      moduleFixture.get<AzuraClientService>(AzuraClientService);

    jwtService = moduleFixture.get<JwtService>(JwtService);

    token = jwtService.sign(
      {
        user_id: "643684b9d3ea0798e1f1c5cf",
        company_id: "643684b9277b8fdeea743ed7",
        admin_rights: true,
        sender: "hoster",
      },
      {
        secret: process.env.SERVICE_PROVIDER_TOKEN,
      },
    );
  });

  beforeEach(async () => {
    await azuraService.purge();
    await azuraServerService.purge();
    await azuraClientService.purgeAllClient(
      "https://radio.eastside.gr/api/",
      process.env.API_KEY_AZURE,
    );
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET- Info - Expect 200 and 2 object's ", async () => {
    await fakeServerService.createServer(2, {
      company_id: "643684b9277b8fdeea743ed7",
    });

    return request(app.getHttpServer())
      .get("/info")
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.info.actionFields[0].value).toBeDefined();
        expect(Object.keys(res.body.info.actionFields[0].value).length).toBe(2);
      });
  });

  it("GET- Info - Expect 401 message: Unauthorized ", async () => {
    return request(app.getHttpServer())
      .get("/info")
      .set("accept", "application/json")
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe("Unauthorized");
      });
  });

  it("GET- Info user has not admin_rights - expect 403, message: You have not necessary privilege for this action  ", async () => {
    await fakeServerService.createServer(2, {
      company_id: "643684b9277b8fdeea743ed7",
    });

    const token = jwtService.sign(
      {
        user_id: "643684b9d3ea0798e1f1c5cf",
        company_id: "643684b9277b8fdeea743ed7",
        admin_rights: true,
      },
      {
        secret: process.env.SERVICE_PROVIDER_TOKEN,
      },
    );

    return request(app.getHttpServer())
      .get("/info")
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then((res) => {
        expect(res.body.message).toBe(
          "You have not necessary privilege for this action",
        );
      });
  });

  it("POST - create station - expect status 201, message: Ok, expect station info and credentials to be defined ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    return request(app.getHttpServer())
      .post("/create")
      .send({
        userData: { email: "testingmail@gmail.com", id: "15" },
        productData: {
          meta: {
            name: "δοκιμή station2",
            server_id: server[0]._id,
            timezone: "UTC",
            max_listeners: "15",
            station_media_storage: "12 GB",
            station_recordings_storage: "13 GB",
            station_podcasts_storage: "24 GB",
            station_permissions: ["administer all"],
            station_global_permissions: [
              "view system logs",
              "administer settings",
              "administer storage locations",
            ],
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .then((res) => {
        expect(res.body.message).toBe("Ok"),
          expect(res.body.meta.station_id).toBeDefined(),
          expect(res.body.meta.name).toBeDefined(),
          expect(res.body.meta.login_url).toBeDefined(),
          expect(res.body.meta.login_email).toBeDefined(),
          expect(res.body.meta.login_password).toBeDefined(),
          expect(res.body.meta.source_password).toBeDefined(),
          expect(res.body.meta.port).toBeDefined();
        expect(res.body.meta.mount_point).toBeDefined();
      });
  });

  it("POST - create station with not valid api-key - expect status 400, message: Δεν ήταν δυνατή η καταχώρησει του σταθμού στο Azura ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_token: "d85d110d0b4a5478:212329bdbf238386f5b5d0708f8178d3",
      azura_url: "https://radio.eastside.gr/api/",
    });

    return request(app.getHttpServer())
      .post("/create")
      .send({
        userData: { email: "testingmail@gmail.com", id: "15" },
        productData: {
          meta: {
            name: "δοκιμή station2",
            server_id: server[0]._id,
            timezone: "UTC",
            max_listeners: "15",
            station_media_storage: "12 GB",
            station_recordings_storage: "13 GB",
            station_podcasts_storage: "24 GB",
            station_permissions: ["manage station streamers"],
            station_global_permissions: [
              "view system logs",
              "administer settings",
              "administer storage locations",
            ],
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "Δεν ήταν δυνατή η καταχώρησει του σταθμού στο Azura.",
        );
      });
  });

  it("PATCH - Renew the station - Expect 200, message: Ok ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation1",
        frontend_config: { max_listeners: "25" },
        is_enabled: false,
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .patch("/renew")
      .send({
        productData: {
          meta: {
            station_id: station.id,
            server_id: server[0]._id,
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

  it("PATCH - update station - expect status 200, message: Ok ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation2",
        frontend_config: { max_listeners: "25" },
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .patch("/upgrade")
      .send({
        productData: {
          meta: {
            station_id: station.id,
            name: "δοκιμή station2",
            server_id: server[0]._id,
            timezone: "UTC",
            frontend_config: { max_listeners: "49" },
            station_media_storage: "50 GB",
            station_podcasts_storage: "51 GB",
            station_recordings_storage: "52 GB",
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

  it("PATCH - downgrade station - expect status 200, message: Ok ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation3",
        frontend_config: { max_listeners: "25" },
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .patch("/upgrade")
      .send({
        productData: {
          meta: {
            station_id: station.id,
            name: "δοκιμή station2",
            server_id: server[0]._id,
            timezone: "UTC",
            frontend_config: { max_listeners: "49" },
            station_media_storage: "50 GB",
            station_podcasts_storage: "51 GB",
            station_recordings_storage: "52 GB",
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

  it("POST - suspend station set is_enable to false - expect status 200, message: Ok ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation4",
        frontend_config: { max_listeners: "25" },
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/suspend")
      .send({
        productData: {
          meta: {
            station_id: station.id,
            server_id: server[0]._id,
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

  it("POST -  unsuspend station set is_enable to true - expect status 200, message: Ok ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation5",
        frontend_config: { max_listeners: "25" },
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/unsuspend")
      .send({
        productData: {
          meta: {
            station_id: station.id,
            server_id: server[0]._id,
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

  it("POST - checking if station is able to be downgrade - expect status 200, message: Ok ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation6",
        frontend_config: { max_listeners: "25" },
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    azuraClientService.updateStorage(
      station.media_storage_location,
      "60 GB",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/downgradable")
      .send({
        userData: {
          companyId: server[0].company_id,
        },
        productData: {
          meta: {
            station_media_storage: "40 GB",
            station_recordings_storage: "40 GB",
            station_podcasts_storage: "40 GB",
          },
        },
        previousProductData: {
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

  it("POST - checking if station is able to be downgrade - expect status 400, message: Δεν μπορείτε να υποβιβάσετε το πακέτο σας ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation7",
        frontend_config: { max_listeners: "25" },
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.updateStorage(
      station.media_storage_location,
      "60 GB",
      server[0].azura_url,
      server[0].azura_token,
    );
    return request(app.getHttpServer())
      .post("/downgradable")
      .send({
        userData: {
          companyId: server[0].company_id,
        },
        productData: {
          meta: {
            station_media_storage: "-5 GB",
            station_recordings_storage: "40 GB",
            station_podcasts_storage: "40 GB",
          },
        },
        previousProductData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id,
          },
        },
      })

      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "Δεν μπορείτε να υποβιβάσετε το πακέτο σας",
        );
      });
  });

  it("POST - checking if station is able to be downgrade - expect status 200, message: Ok ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation8",
        frontend_config: { max_listeners: "25" },
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.updateStorage(
      station.media_storage_location,
      "60 GB",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/upgradable")
      .send({
        userData: {
          companyId: server[0].company_id,
        },
        productData: {
          meta: {
            station_media_storage: "40 GB",
            station_recordings_storage: "40 GB",
            station_podcasts_storage: "40 GB",
          },
        },
        previousProductData: {
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

  it("POST - station is live  - expect status 400, message: You can not upgrade/downgrade your station while is live ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation9",
        frontend_config: { max_listeners: "25" },
        is_streamer_live: true,
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.updateStorage(
      station.media_storage_location,
      "60 GB",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/upgradable")
      .send({
        userData: {
          companyId: server[0].company_id,
        },
        productData: {
          meta: {
            station_media_storage: "40 GB",
            station_recordings_storage: "40 GB",
            station_podcasts_storage: "40 GB",
          },
        },
        previousProductData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id,
          },
        },
      })

      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "You can not upgrade/downgrade your station while is live",
        );
      });
  });

  it("POST - checking if station is able to be upgrade - expect status 400, message: Δεν μπορείτε να υποβιβάσετε το πακέτο σας ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation10",
        frontend_config: { max_listeners: "25" },
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraClientService.updateStorage(
      station.media_storage_location,
      "60 GB",
      server[0].azura_url,
      server[0].azura_token,
    );

    return request(app.getHttpServer())
      .post("/upgradable")
      .send({
        userData: {
          companyId: server[0].company_id,
        },
        productData: {
          meta: {
            station_media_storage: "-5 GB",
            station_recordings_storage: "40 GB",
            station_podcasts_storage: "40 GB",
          },
        },
        previousProductData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id,
          },
        },
      })

      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "Δεν μπορείτε να υποβιβάσετε το πακέτο σας",
        );
      });
  });

  it("POST - Removing Station, Role and Role_id from User on Azura, Removing station Data in database - Expect 200 ", async () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = await azuraClientService.createStation(
      {
        name: "AzuraStation11",
        frontend_config: { max_listeners: "25" },
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    const rolesDto = {
      name: station.short_name,
      permissions: {
        global: ["administer settings", "view system logs"],
        station: {
          [station.id]: ["view station management", "view station reports"],
        },
      },
    };

    const role = await azuraClientService.setRole(
      rolesDto,
      server[0].azura_url,
      server[0].azura_token,
    );

    const user = await azuraClientService.createAzuraUser(
      {
        name: station.name,
        email: "testing@gmail.com",
        roles: [role.id],
      },
      server[0].azura_url,
      server[0].azura_token,
    );

    await azuraService.createUser({
      email: user.email,
      user_id: "643684b9d3ea0798e1f1c5cf",
      azura_user_id: user.id.toString(),
      stations: [
        {
          server_id: server[0]._id,
          station_short_name: station.short_name.toString(),
          station_id: station.id.toString(),
          role_id: role.id.toString(),
          station_storage: {
            media_storage_location_id:
              station.media_storage_location.toString(),
            recordings_storage_location_id:
              station.recordings_storage_location.toString(),
            podcasts_storage_location_id:
              station.podcasts_storage_location.toString(),
          },
        },
      ],
    });

    return request(app.getHttpServer())
      .post("/delete")
      .send({
        productData: {
          meta: {
            server_id: server[0]._id,
            station_id: station.id.toString(),
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

  it("POST - Validate/Addons - expect status 200, message: Ok", () => {
    // Δημιουργεία Server με default Azura_token και azura_url
    return request(app.getHttpServer())
      .post("/validate/addons")
      .send({ key: { name: "station_name" } })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - Validate/Addons - expect status 400, message: The station name is already in use ", async () => {
    await azuraService.createUser({
      email: "testing@gmail.com",
      user_id: "643684b9d3ea0798e1f1c5cf",
      azura_user_id: "15",
      stations: [
        {
          server_id: "1",
          station_short_name: "station",
          station_id: "123",
          role_id: "12",
          station_storage: {
            media_storage_location_id: "1",
            recordings_storage_location_id: "2",
            podcasts_storage_location_id: "3",
          },
        },
      ],
    });

    return request(app.getHttpServer())
      .post("/validate/addons")
      .send({ key: { name: "station" } })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("The station name is already in use");
      });
  });
});
