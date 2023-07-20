/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { MongoModule } from "../src/mongo/mongo.module";
import { AzuraService } from "../src/services/azura.service";
import { FakeUserService } from "../src/helpers/azuraHelper.users";
import { User } from "../src/entities/users.model";

describe("UserService", () => {
  let app: INestApplication;
  let azuraService: AzuraService;
  let fakeUserService: FakeUserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MongoModule],
      providers: [FakeUserService, AzuraService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    azuraService = new AzuraService();
    fakeUserService = moduleFixture.get<FakeUserService>(FakeUserService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await azuraService.purge();
  });

  describe("Creating user in mongo testing", () => {
    it("should create new User in mongo", () => {
      const user: User = fakeUserService.makeUser();

      return azuraService.createUser(user).then((res) => {
        expect(typeof res.email).toBe("string");
        expect(typeof res.azura_user_id).toBe("string");
        expect(typeof res.stations).toBe("object");
      });
    });

    it("Add new station to User - expect to be true", async () => {
      const user = await fakeUserService.createUser(1);

      return azuraService
        .addStation(user[0], {
          server_id: "1",
          station_short_name: "testingname2",
          station_id: "2",
          role_id: "2",
          station_storage: {
            media_storage_location_id: "4",
            recordings_storage_location_id: "5",
            podcasts_storage_location_id: "6",
          },
        })
        .then((response) => {
          expect(response).toBeInstanceOf(Object);
        });
    });

    it("Find user by email -expect defined", async () => {
      const user = await fakeUserService.createUser(1);

      return azuraService.findUserByEmail(user[0].email).then((user) => {
        expect(user).toBeDefined();
        expect(user).toBeInstanceOf(Object);
      });
    });

    it("Find user by email -expect undefined", () => {
      return azuraService.findUserByEmail("email2@example.com").then((user) => {
        expect(user).toBeNull();
      });
    });

    it("Empty rows in the table - Expect to delete one row", async () => {
      await fakeUserService.createUser(5);

      return azuraService.purge().then((response) => {
        expect(response["deletedCount"]).toBe(5);
      });
    });

    it("It doesn't Empty the rows in production enviroment", async () => {
      process.env.NODE_ENV = "production";
      await azuraService.purge().then((respone) => {
        expect(respone).toBeFalsy();
      });
      process.env.NODE_ENV = "development";
    });

    it("It should find all the roles of the User - expect Array of role_id's", async () => {
      let user = await fakeUserService.createUser(1);
      user[0].stations.push({
        server_id: "1",
        station_short_name: "testingname2",
        station_id: "2",
        role_id: "2",
        station_storage: {
          media_storage_location_id: "4",
          recordings_storage_location_id: "5",
          podcasts_storage_location_id: "6",
        },
      });

      await azuraService.findUserRoles(user[0]).then((response) => {
        expect(response.length).toBe(2);
      });
    });

    it("it should find user by AzuraID - expect Object", async () => {
      const user = await fakeUserService.createUser(1);

      return azuraService
        .findUserByAzuraID(user[0].azura_user_id)
        .then((respone) => {
          expect(respone).toBeInstanceOf(Object);
        });
    });

    it("it should not find user by AzuraID - expect null", () => {
      return azuraService.findUserByAzuraID("1").then((respone) => {
        expect(respone).toBe(null);
      });
    });

    it("it should find if station exists - expect true", async () => {
      const user = await fakeUserService.createUser(1);
      return azuraService
        .stationExists(user[0].stations[0].station_short_name)
        .then((respone) => {
          expect(respone).toBeTruthy();
        });
    });

    it("it should find if station exists - expect false", () => {
      return azuraService.stationExists("my_station").then((respone) => {
        expect(respone).toBeFalsy();
      });
    });

    it("it should find if server_id exists in any station - expect true", async () => {
      const user = await fakeUserService.createUser(1);
      return azuraService
        .serverHasStations(user[0].stations[0].server_id)
        .then((respone) => {
          expect(respone).toBeTruthy();
        });
    });

    it("it should find if server_id exists in any station - expect false", async () => {
      return azuraService.serverHasStations("100").then((respone) => {
        expect(respone).toBeFalsy();
      });
    });

    it("it should find user by station_id - expect object", async () => {
      const user = await fakeUserService.createUser(1);
      return azuraService
        .findUserByStationId(user[0].stations[0].station_id)
        .then((respone) => {
          expect(respone).toBeInstanceOf(Object);
        });
    });

    it("it should not find user by station_id - expect null", () => {
      return azuraService.findUserByStationId("15").then((respone) => {
        expect(respone).toBe(null);
      });
    });

    it("it should delete station object of a user - expect true", async () => {
      const user = await fakeUserService.createUser(1);

      return azuraService
        .removeStationFromUser(user[0], user[0].stations[0])
        .then((respone) => {
          expect(respone).toBeTruthy();
        });
    });

    it("it should not delete station object of a user - expect Error Station not found", async () => {
      const user = await fakeUserService.createUser(1);

      return azuraService
        .removeStationFromUser(user[0], user[0].stations[0].station_storage[0])
        .catch((err) => expect(err.message).toBe("Station not found"));
    });

    it("Convert name to short_name(Url)", () => {
      expect(azuraService.nameToShortName("Ελληνικό ραδιοφωνο")).toBe(
        "ellhniko-radiofwno",
      );
      expect(azuraService.nameToShortName("Zoo RADIO")).toBe("zoo-radio");
      expect(azuraService.nameToShortName("fmfm")).toBe("fmfm");
      expect(azuraService.nameToShortName("ΕλληνικόFM")).toBe("ellhnikofm");
      expect(azuraService.nameToShortName("/fm?")).toBe("fm");
      expect(azuraService.nameToShortName("Ο σταθμός μου")).toBe(
        "o-stathmos-mou",
      );
      expect(azuraService.nameToShortName(" Ο σταθμός μου ")).toBe(
        "o-stathmos-mou",
      );
    });
  });
});
