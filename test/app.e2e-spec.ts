/* eslint-disable prefer-const */
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
import { JwtService } from "@nestjs/jwt";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

describe("AppController (e2e)", () => {
  //initialize your services here
  let app: INestApplication;
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule/**your modules here */],
      providers: [
        /**your services heres */
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    // Create your services here

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
    // purge your services or any other action here before each test
  });

  afterAll(async () => {
    //close app here or any other action that might be necessary after the end of all tests
    await app.close();
  });

  it("Method - Name - Expect Code: someCode and Message: Some message", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      //.get(/pathToBeTested)
      //.put(/pathToBeTested)
      //.patch(/pathToBeTested)
      //.post(/pathToBeTested)
      //.delete(/pathToBeTested)
      //.expect(code)
      /*.then((res) => { 
        expect(res.body.some__data).tobeDefined()
        expect(res.body.some__data).tobe("something")
        expect(body.message).to be("as above")
      })*/
  });




  it("GET- Info - Expect 200 and 2 object's ", async () => {
    // creating necessary Objects and simulate Actions here

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
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .get("/info")
      .set("accept", "application/json")
      .expect(401)
      .then((res) => {
        expect(res.body.message).toBe("Unauthorized");
      });
  });

  it("GET- Info User does not have admin_rights - expect 403, message: You do not have the necessary access to dothis action ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .get("/info")
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(403)
      .then((res) => {
        expect(res.body.message).toBe(
          "You do not have the necessary access to dothis action ",
        );
      });
  });

  it("POST - create Product - expect status 201, message: Ok, expect product info.meta to be defined ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .post("/create")
      .send({
        userData: {
          /*Some user data*/
        },
        productData: {
          meta: {
            //some_meta_data: 'Some value'
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .then((res) => {
        expect(res.body.message).toBe("Ok"),
          expect(res.body.meta.some_meta_data).toBeDefined();
      });
  });

  it("POST - create Product - expect status 400, message The creation of your product has failed", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .post("/create")
      .send({
        userData: {
          /*some_user_data*/
        },
        productData: {
          meta: {
            //some_meta_data: 'Some value'
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "The creation of your Product has failed",
        );
      });
  });

  it("PATCH - Renew the Product - Expect 200, message: Ok ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .patch("/renew")
      .send({
        productData: {
          meta: {
            //some_meta_data
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

  it("PATCH - update Product - expect status 200, message: Ok ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .patch("/upgrade")
      .send({
        productData: {
          meta: {
            //some_meta_data
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

  it("PATCH - downgrade Product - expect status 200, message: Ok ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .patch("/upgrade")
      .send({
        productData: {
          meta: {
            //some_meta_data
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

  it("POST - suspend Product - expect status 200, message: Ok ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .post("/suspend")
      .send({
        productData: {
          meta: {
            //some_meta_data
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

  it("POST -  unsuspend Product - expect status 200, message: Ok ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .post("/unsuspend")
      .send({
        productData: {
          meta: {
            //some_meta_data
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

  it("POST - checking if product is downgradable - expect status 200, message: Ok ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .post("/downgradable")
      .send({
        userData: {
          //some_user_data
        },
        productData: {
          meta: {
            //some_meta_data
          },
        },
        previousProductData: {
          meta: {
            //some_meta_data
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
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .post("/downgradable")
      .send({
        userData: {
          //some_user_data
        },
        productData: {
          meta: {
            //some_meta_data
          },
        },
        previousProductData: {
          meta: {
            //some_meta_data
          },
        },
      })

      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("Ypu cannot downgrade this product");
      });
  });

  it("POST - checking if Product is able to be downgrade - expect status 200, message: Ok ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .post("/upgradable")
      .send({
        userData: {
          //some_user_data
        },
        productData: {
          meta: {
            //some_meta_data
          },
        },
        previousProductData: {
          meta: {
            //some_meta_data
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

  it("POST - station is live  - expect status 400, message: You can not upgrade/downgrade your product at this time ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .post("/upgradable")
      .send({
        userData: {
          //some_user_data
        },
        productData: {
          meta: {
            //some_meta_data
          },
        },
        previousProductData: {
          meta: {
            //some_meta_data
          },
        },
      })

      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe(
          "You can not upgrade/downgrade your product at this time",
        );
      });
  });

  it("POST - Validate/Addons - expect status 200, message: Ok", () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .post("/validate/addons")
      .send({
        key: {
          /*key_to_be_validataed */
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Ok");
      });
  });

  it("POST - Validate/Addons - expect status 400, message: The station name is already in use ", async () => {
    // creating necessary Objects and simulate Actions here

    return request(app.getHttpServer())
      .post("/validate/addons")
      .send({
        key: {
          /*key_to_be_validataed */
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body.message).toBe("The station name is already in use");
      });
  });
});
