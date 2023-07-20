/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { createRandomStation } from "../src/helpers/azuraStationHelper";
// eslint-disable-next-line @typescript-eslint/no-var-requires
var MockAdapter = require("axios-mock-adapter");
import axios from "axios";
import { AzuraService } from "../src/services/azura.service";
import { FakeServerService } from "../src/helpers/azuraServerHelper";
import { AzuraServerService } from "../src/services/azura.servers.service";
import { JwtService } from "@nestjs/jwt";
import { rolesDto } from "../src/dtos/azura/roles-dto";
import { FakeRoleService } from "../src/helpers/azuraRoleHelper";
import { Server } from "../src/entities/servers.model";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
describe("AppController (e2e)", () => {
  let app: INestApplication;
  let mock: any;
  let azuraService: AzuraService;
  let fakeServerService: FakeServerService;
  let azuraServerService: AzuraServerService;
  let fakeRoleService: FakeRoleService;
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [FakeServerService, AzuraServerService, FakeRoleService],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    azuraService = new AzuraService();

    fakeServerService = moduleFixture.get<FakeServerService>(FakeServerService);

    azuraServerService =
      moduleFixture.get<AzuraServerService>(AzuraServerService);

    jwtService = moduleFixture.get<JwtService>(JwtService);

    fakeRoleService = moduleFixture.get<FakeRoleService>(FakeRoleService);

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

    mock = new MockAdapter(axios);
  });

  beforeEach(async () => {
    await azuraService.purge();
    await azuraServerService.purge();
  });

  afterAll(async () => {
    await mock.reset();
    await app.close();
  });

  it("POST - create station - expect 201 ", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    // creating station obj
    const station = createRandomStation();
    station.id = "1";

    // creating Role obj
    const Role: rolesDto = {
      id: "1",
      name: "station",
      permissions: {
        global: ["administer all"],
        station: {
          [station.id]: ["view station management", "view station logs"],
        },
      },
    };

    // creating User obj
    const User = {
      id: "1",
      email: "email@example.com",
      new_password: "12345",
      name: "TestUser",
      locale: "en_US",
      theme: "Dark",
      show_24_hour_time: true,
      two_factor_secret: "A1B2C3D4",
      roles: [Role.id],
      Azura_id: 53,
    };

    const updateMediaStorage = {
      station_media_storage: "12 GB",
    };

    const updateRecordingsStorage = {
      station_recordings_storage: "13 GB",
    };

    const updatePodcastsStorage = {
      station_podcasts_storage: "14 GB",
    };

    const station_mount = [
      {
        name: "/radio.mp3",
        display_name: "/radio.mp3 (128kbps MP3)",
        is_visible_on_public_pages: true,
        is_default: true,
        is_public: false,
        fallback_mount: null,
        relay_url: null,
        authhash: null,
        max_listener_duration: 0,
        enable_autodj: true,
        autodj_format: "mp3",
        autodj_bitrate: 128,
        custom_listen_url: null,
        intro_path: null,
        frontend_config: null,
        listeners_unique: 0,
        listeners_total: 0,
        id: station.id,
        links: {
          self: "https://radio.eastside.gr/api/station/3100/mount/3063",
          intro: "https://radio.eastside.gr/api/station/3100/mount/3063/intro",
          listen: "http://radio.eastside.gr:8000/radio.mp3",
        },
      },
    ];
    // HTTP: Mocking Station Creation.
    mock
      .onPost(`https://radio.eastside.gr/api/admin/stations`)
      .reply(200, station);

    // HTTP: Mocking Station Mount.
    mock
      .onGet(`https://radio.eastside.gr/api/station/${station.id}/mounts`)
      .reply(200, station_mount);

    // HTTP: Mocking PUT media Storage.
    mock
      .onPut(
        `https://radio.eastside.gr/api/admin/storage_location/${station.media_storage_location}`,
      )
      .reply(200, updateMediaStorage);

    // HTTP: Mocking PUT recordings Storage.
    mock
      .onPut(
        `https://radio.eastside.gr/api/admin/storage_location/${station.recordings_storage_location}`,
      )
      .reply(200, updateRecordingsStorage);

    // HTTP: Mocking PUT podcasts Storage.
    mock
      .onPut(
        `https://radio.eastside.gr/api/admin/storage_location/${station.podcasts_storage_location}`,
      )
      .reply(200, updatePodcastsStorage);

    // HTTP: Mocking POST Role Creation.
    mock.onPost(`https://radio.eastside.gr/api/admin/roles`).reply(200, Role);

    // HTTP: Mocking POST User Creation.
    mock.onPost(`https://radio.eastside.gr/api/admin/users`).reply(200, User);

    // HTTP: Mocking POST restarting Station.
    mock
      .onPost(`https://radio.eastside.gr/api/station/${station.id}/restart`)
      .reply(200);

    await request(app.getHttpServer())
      .post("/create")
      .send({
        userData: { email: "testingmail@gmail.com" },
        productData: {
          meta: {
            name: "δοκιμή station2",
            server_id: server[0]._id,
            timezone: "UTC",
            max_listeners: "15",
            station_media_storage: "12 GB",
            station_recordings_storage: "13 GB",
            station_podcasts_storage: "14 GB",
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
      .expect(201);
  });
  //

  it("POST - It should upgrade the current station - expect 200, message: Ok", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_token: process.env.API_KEY_AZURE,
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = {
      id: "1",
      is_enabled: true,
      name: "station-No1",
    };

    mock
      .onGet("https://radio.eastside.gr/api/admin/station/1")
      .reply(200, station);

    mock
      .onPut("https://radio.eastside.gr/api/admin/station/1")
      .reply(200, station);

    await request(app.getHttpServer())
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
      .then((response) => {
        expect(response.body.message).toBe("Ok");
        expect(response.body.meta.name).toBe(station.name);
        expect(response.body.meta.station_id).toBe(station.id);
      });
  });

  it("PATCH - It should update the current station - expect 200, message: Ok", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = createRandomStation();

    mock
      .onGet(`https://radio.eastside.gr/api/admin/station/${station.id}`)
      .reply(200, station);

    const updateMediaStorage = {
      station_media_storage: "12 GB",
    };

    const updateRecordingsStorage = {
      station_recordings_storage: "13 GB",
    };

    const updatePodcastsStorage = {
      station_podcasts_storage: "14 GB",
    };
    // HTTP: Mocking Station Creation.
    mock
      .onPost(`https://radio.eastside.gr/api/admin/stations`)
      .reply(200, station);

    // HTTP: Mocking PUT media Storage.
    mock
      .onPut(
        `https://radio.eastside.gr/api/admin/storage_location/${station.media_storage_location}`,
      )
      .reply(200, updateMediaStorage);

    // HTTP: Mocking PUT recordings Storage.
    mock
      .onPut(
        `https://radio.eastside.gr/api/admin/storage_location/${station.recordings_storage_location}`,
      )
      .reply(200, updateRecordingsStorage);

    // HTTP: Mocking PUT podcasts Storage.
    mock
      .onPut(
        `https://radio.eastside.gr/api/admin/storage_location/${station.podcasts_storage_location}`,
      )
      .reply(200, updatePodcastsStorage);

    mock
      .onPut(`https://radio.eastside.gr/api/admin/station/${station.id}`)
      .reply(200, station);

    await request(app.getHttpServer())
      .patch("/upgrade")
      .send({
        productData: {
          meta: {
            station_id: station.id,
            server_id: server[0]._id,
            station_media_storage: "25",
            station_podcasts_storage: "26",
            station_recordings_storage: "27",
            max_listeners: "30",
            name: station.name,
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("Ok");
        expect(response.body.meta.name).toBe(station.name);
        expect(response.body.meta.station_id).toBe(station.id);
      });
  });

  it("POST - It should suspend the current station - expect 200, message: Ok", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_token: process.env.API_KEY_AZURE,
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = createRandomStation();

    mock
      .onPut(`https://radio.eastside.gr/api/admin/station/${station.id}`)
      .reply(200, station);

    await request(app.getHttpServer())
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
      .then((response) => {
        expect(response.body.message).toBe("Ok");
        expect(response.body.meta.name).toBe(station.name);
        expect(response.body.meta.station_id).toBe(station.id);
      });
  });

  it("POST - It should unsuspend the current station - expect 200", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = createRandomStation();

    mock
      .onPut(`https://radio.eastside.gr/api/admin/station/${station.id}`)
      .reply(200, station);

    await request(app.getHttpServer())
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
      .then((response) => {
        expect(response.body.message).toBe("Ok");
        expect(response.body.meta.name).toBe(station.name);
        expect(response.body.meta.station_id).toBe(station.id);
      });
  });

  it("POST - It should unsuspend the current station - expect 403, message: You have not necessary privilege for this action ", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = createRandomStation();

    const token = jwtService.sign(
      {
        user_id: "643684b9d3ea0798e1f1c5cf",
        company_id: "643684b9277b8fdeea743ed7",
        admin_rights: true,
        sender: "Unknown",
      },
      {
        secret: process.env.SERVICE_PROVIDER_TOKEN,
      },
    );

    mock
      .onPut(`https://radio.eastside.gr/api/admin/station/${station.id}`)
      .reply(200, station);

    await request(app.getHttpServer())
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
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBe(
          "You have not necessary privilege for this action",
        );
      });
  });

  it("POST - It should check if station is downgradable - expect 200, message: Ok", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = createRandomStation();

    mock
      .onGet(`https://radio.eastside.gr/api/admin/station/${station.id}`)
      .reply(200, station);

    const mediaStorage = {
      station_media_storage: "12 GB",
    };

    const recordingsStorage = {
      station_recordings_storage: "13 GB",
    };

    const podcastsStorage = {
      station_podcasts_storage: "14 GB",
    };
    // HTTP: Mocking Station Creation.
    mock
      .onPost(`https://radio.eastside.gr/api/admin/stations`)
      .reply(200, station);

    // HTTP: Mocking PUT media Storage.
    mock
      .onGet(
        `https://radio.eastside.gr/api/admin/storage_location/${station.media_storage_location}`,
      )
      .reply(200, mediaStorage);

    // HTTP: Mocking PUT recordings Storage.
    mock
      .onGet(
        `https://radio.eastside.gr/api/admin/storage_location/${station.recordings_storage_location}`,
      )
      .reply(200, recordingsStorage);

    // HTTP: Mocking PUT podcasts Storage.
    mock
      .onGet(
        `https://radio.eastside.gr/api/admin/storage_location/${station.podcasts_storage_location}`,
      )
      .reply(200, podcastsStorage);

    await request(app.getHttpServer())
      .post("/downgradable")
      .send({
        userData: {
          companyId: server[0].company_id,
        },
        productData: {
          meta: {
            station_media_storage: "40",
            station_recordings_storage: "50",
            station_podcasts_storage: "60",
          },
        },
        previousProductData: {
          meta: {
            station_id: station.id,
            server_id: server[0]._id,
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.message).toBe("Ok");
      });
  });

  it("POST - It should check if station is downgradable - expect 400 (Δεν μπορείτε να υποβιβάσετε το πακέτο σας)", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = createRandomStation();

    mock
      .onGet(`https://radio.eastside.gr/api/admin/station/${station.id}`)
      .reply(200, station);

    const mediaStorage = {
      station_media_storage: "50 GB",
      storageUsed: "100 GB",
    };

    const recordingsStorage = {
      station_recordings_storage: "50 GB",
      storageUsed: "100 GB",
    };

    const podcastsStorage = {
      station_podcasts_storage: "50 GB",
      storageUsed: "100 GB",
    };
    // HTTP: Mocking Station Creation.
    mock
      .onPost(`https://radio.eastside.gr/api/admin/stations`)
      .reply(200, station);

    // HTTP: Mocking PUT media Storage.
    mock
      .onGet(
        `https://radio.eastside.gr/api/admin/storage_location/${station.media_storage_location}`,
      )
      .reply(200, mediaStorage);

    // HTTP: Mocking PUT recordings Storage.
    mock
      .onGet(
        `https://radio.eastside.gr/api/admin/storage_location/${station.recordings_storage_location}`,
      )
      .reply(200, recordingsStorage);

    // HTTP: Mocking PUT podcasts Storage.
    mock
      .onGet(
        `https://radio.eastside.gr/api/admin/storage_location/${station.podcasts_storage_location}`,
      )
      .reply(200, podcastsStorage);

    await request(app.getHttpServer())
      .post("/downgradable")
      .send({
        userData: {
          companyId: server[0].company_id,
        },
        productData: {
          meta: {
            station_media_storage: "40",
            station_recordings_storage: "50",
            station_podcasts_storage: "60",
          },
        },
        previousProductData: {
          meta: {
            station_id: station.id,
            server_id: server[0]._id,
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((response) => {
        expect(response.body.message).toBe(
          "Δεν μπορείτε να υποβιβάσετε το πακέτο σας",
        );
      });
  });

  it("POST - It should delete the station in database and azuracast - expect 200, message: Ok", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = createRandomStation();

    const user = await azuraService.createUser({
      email: "testing@gmail.com",
      user_id: "643684b9d3ea0798e1f1c5cf",
      azura_user_id: "15",
      stations: [
        {
          server_id: server[0]._id,
          station_short_name: station.short_name,
          station_id: station.id,
          role_id: "1",
          station_storage: {
            media_storage_location_id: station.media_storage_location,
            recordings_storage_location_id: station.recordings_storage_location,
            podcasts_storage_location_id: station.podcasts_storage_location,
          },
        },
      ],
    });

    mock
      .onDelete(`https://radio.eastside.gr/api/admin/station/${station.id}`)
      .reply(200, station);

    mock
      .onDelete(
        `https://radio.eastside.gr/api/admin/role/${user.stations[0].role_id}`,
      )
      .reply(200, station);

    await request(app.getHttpServer())
      .post("/delete")
      .send({
        userData: {
          companyId: server[0].company_id,
        },
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
      .then((response) => {
        expect(response.body.message).toBe("Ok");
      });
  });

  it("POST - It should delete the station in database and azuracast - expect 404, message: Δεν βρέθηκε ο σταθμός", async () => {
    const server: Server[] = await fakeServerService.createServer(1, {
      company_id: "643684b9277b8fdeea743ed7",
      azura_url: "https://radio.eastside.gr/api/",
    });

    const station = createRandomStation();

    const user = await azuraService.createUser({
      email: "testing@gmail.com",
      user_id: "643684b9d3ea0798e1f1c5cf",
      azura_user_id: "15",
      stations: [
        {
          server_id: server[0]._id,
          station_short_name: station.short_name,
          station_id: station.id,
          role_id: "1",
          station_storage: {
            media_storage_location_id: station.media_storage_location,
            recordings_storage_location_id: station.recordings_storage_location,
            podcasts_storage_location_id: station.podcasts_storage_location,
          },
        },
      ],
    });

    mock
      .onDelete(`https://radio.eastside.gr/api/admin/station/${station.id}`)
      .reply(200, station);

    mock
      .onDelete(
        `https://radio.eastside.gr/api/admin/role/${user.stations[0].role_id}`,
      )
      .reply(200, station);

    await request(app.getHttpServer())
      .post("/delete")
      .send({
        userData: {
          companyId: server[0].company_id,
        },
        productData: {
          meta: {
            station_id: "99999",
            server_id: server[0]._id,
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Δεν βρέθηκε ο σταθμός");
      });
  });
});
