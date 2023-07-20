/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";
// eslint-disable-next-line @typescript-eslint/no-var-requires
var MockAdapter = require("axios-mock-adapter");
import axios from "axios";
import { JwtService } from "@nestjs/jwt";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
describe("AppController (e2e)", () => {
  let app: INestApplication;
  let mock: any;
  let jwtService: JwtService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        /**Your services here */
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();

    //Create your Services

    //singing of JWT token
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

    mock = new MockAdapter(axios);
  });

  beforeEach(async () => {
    //purge your services after each test
  });

  afterAll(async () => {
    //reset the mock and close the app after tests are done
  });

  it("POST - create Product - expect 201 ", async () => {
    // creating necessary Service and Objects here

    // HTTP: Mocking Product Deletion
    mock.onDelete(``).reply(200 /**product */);

    await request(app.getHttpServer())
      .post("/create")
      .send({
        userData: {
          /**some_user_data */
        }, //maybe unneccesary
        productData: {
          meta: {
            //some_meta_data
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(201);
  });
  //

  it("POST - It should upgrade the current Product - expect 200, message: Ok", async () => {
    // creating necessary Service and Objects here

    //Http: Mocking Get Product Upgrade
    mock.onGet("").reply(200 /**product */);

    await request(app.getHttpServer())
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
      .then((response) => {
        expect(response.body.message).toBe("Ok");
        expect(response.body.meta.some_meta_data).toBe(null/**some_product_data instead of null*/);
      });
  });

  it("PATCH - It should update the current Product - expect 200, message: Ok", async () => {
    // creating necessary Service and Objects here

    //HTTP: Mock product GET
    mock.onGet(``).reply(200 /**product */);

    // HTTP: Mocking Product Creation.
    mock.onPost(``).reply(200 /**product */);

    await request(app.getHttpServer())
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
      .then((response) => {
        expect(response.body.message).toBe("Ok");
        expect(response.body.meta.some_meta_data).toBe(null/**some_product_data instead of null*/);
      });
  });

  it("POST - It should suspend the current station - expect 200, message: Ok", async () => {
    // creating necessary Service and Objects here

    // HTTP: Mocking Product Creation.
    mock.onPost(``).reply(200 /**product */);

    await request(app.getHttpServer())
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
      .then((response) => {
        expect(response.body.message).toBe("Ok");
        expect(response.body.meta.some_meta_data).toBe(null/**some_product_data instead of null*/);
      });
  });

  it("POST - It should unsuspend the current product - expect 200", async () => {
    // creating necessary Service and Objects here

    // HTTP: Mocking Product Creation.
    mock.onPost(``).reply(200 /**product */);

    await request(app.getHttpServer())
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
      .then((response) => {
        expect(response.body.message).toBe("Ok");
        expect(response.body.meta.some_meta_data).toBe(null/**some_product_data instead of null*/);
      });
  });

  it("POST - It should unsuspend the current product - expect 403, message: You have not necessary privilege for this action ", async () => {
    // creating necessary Service and Objects here

    // HTTP: Mocking Product Creation.
    mock.onPost(``).reply(200 /**product */);

    await request(app.getHttpServer())
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
      .expect(403)
      .then((response) => {
        expect(response.body.message).toBe(
          "You have not necessary privilege for this action",
        );
      });
  });

  //change to check if product is upgradable - expect 200
  it("POST - It should check if station is downgradable - expect 200, message: Ok", async () => {
    // creating necessary Service and Objects here

    // HTTP: Mocking Product Creation.
    mock.onPost(``).reply(200 /**product */);

    await request(app.getHttpServer())
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
      .then((response) => {
        expect(response.body.message).toBe("Ok");
      });
  });

  //change to check if product is downgradable - expect 400
  it("POST - It should check if station is downgradable - expect 400 (Δεν μπορείτε να υποβιβάσετε το πακέτο σας)", async () => {
    // creating necessary Service and Objects here

    // HTTP: Mocking Product Creation.
    mock.onPost(``).reply(200 /**product */);

    await request(app.getHttpServer())
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
      .then((response) => {
        expect(response.body.message).toBe("You cannot downgrade this product");
      });
  });

  //change to delete product - expect 200
  it("POST - It should delete the station in database and azuracast - expect 200, message: Ok", async () => {
    // creating necessary Service and Objects here

    // HTTP: Mocking Product Creation.
    mock.onPost(``).reply(200 /**product */);

    // HTTP: Mocking Product Deletion
    mock.onDelete(``).reply(200 /**product */);

    await request(app.getHttpServer())
      .post("/delete")
      .send({
        userData: {
          //some_user_data,
        },
        productData: {
          meta: {
            //some_meta_data
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

  it("POST - It should delete the Product - expect 404, message: Product not Found", async () => {
    // creating necessary Service and Objects here

    // HTTP: Mocking Product Creation.
    mock.onPost(``).reply(200 /**product */);

    // HTTP: Mocking Product Deletion
    mock.onDelete(``).reply(200 /**product */);

    await request(app.getHttpServer())
      .post("/delete")
      .send({
        userData: {
          //some_user_data
        },
        productData: {
          meta: {
            //some_meta_data
          },
        },
      })
      .set("accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(404)
      .then((response) => {
        expect(response.body.message).toBe("Product not found");
      });
  });
});
