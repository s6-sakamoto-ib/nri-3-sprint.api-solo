const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { setupServer } = require("../src/server");
//this enables us to use .should assertions instead of expecct. Personal Preference
chai.should();
const pubModel = require("../src/pub/pub.model");
const fixtures = require("./fixtures");
const config = require("../knexfile");
const knex = require("knex")(config);
const PUB_TABLE = pubModel.PUB_TABLE;

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupServer();
describe("Pub API Server", () => {
  let request;
  let pubFixture;
  before(async () => {
    pubFixture = fixtures.getAllExistPubs();
  });

  beforeEach(() => {
    request = chai.request(server);
  });

  describe("test GET method", () => {
    // get all store
    it(`GET /pubs return all pubs`, async () => {
      // Setting
      const expect = pubFixture;

      // Execute
      const res = await request.get("/api/pubs");
      // Assertion
      JSON.parse(res.text).should.deep.equal(expect);
    });

    // get store with limit query param
    it(`GET /pubs with query param limit=2 return 2 pubs`, async () => {
      // Setting
      const expect = pubFixture.slice(0, 2);

      // Execute
      const res = await request.get("/api/pubs").query({ limit: 2 });

      // Assertion
      JSON.parse(res.text).should.deep.equal(expect);
    });

    // get store by id
    it(`GET /pubs/2 return pub with id=2`, async () => {
      // Setting
      const expect = pubFixture[1];

      // Execute
      const res = await request.get("/api/pubs/2");

      // Assertion
      JSON.parse(res.text).should.deep.equal(expect);
    });

    // get store by id
    it(`GET /pubs/002 return pub with id=2`, async () => {
      // Setting
      const expect = pubFixture[1];

      // Execute
      const res = await request.get("/api/pubs/002");

      // Assertion
      JSON.parse(res.text).should.deep.equal(expect);
    });

    // get store by name
    it(`GET /pubs/pub_3 return pub with pub_name='pub_3'`, async () => {
      // Setting
      const expect = pubFixture[2];

      // Execute
      const res = await request.get("/api/pubs/pub_3");

      // Assertion
      JSON.parse(res.text).should.deep.equal(expect);
    });
  });

  describe("test PUT method", () => {
    let addedPubFixture;

    before(async () => {
      addedPubFixture = fixtures.getPub();
      await knex(PUB_TABLE)
        .insert(addedPubFixture)
        .returning("id")
        .then((result) => {
          console.log("inserted test pub with ", result);
        })
        .catch(console.error);
    });

    after(async () => {
      await knex(PUB_TABLE)
        .where("id", addedPubFixture.id)
        .returning("id")
        .del()
        .then((result) => {
          console.log("removed test pub with ", result);
        })
        .catch(console.error);
    });

    // edit store
    it(`PUT /pubs edit pub data`, async () => {
      // Setting
      const expect = {
        id: 91344,
        pub_name: "kushidori",
        email: "oden_miyuki@example.com",
        postal_code: "920-0000",
      };

      // Execute
      const res = await request.put("/api/pubs").send(expect);

      // Assertion
      JSON.parse(res.text).should.deep.equal(expect.id);
    });
  });

  describe("test POST method", () => {
    after(async () => {
      await knex(PUB_TABLE)
        .where("pub_name", "kokoro")
        .returning("id")
        .del()
        .then((result) => {
          console.log("removed test pub with ", result);
        })
        .catch(console.error);
    });

    // register store
    it(`POST /pubs register(insert) pub data `, async () => {
      // Setting
      const expect = {
        id: 11111,
        email: "kokoro@example.com",
        pubName: "kokoro",
        postalCode: "111-1111",
      };

      // Execute
      const res = await request.post("/api/pubs").send(expect);

      // Assertion
      JSON.parse(res.text).should.deep.equal(expect.id);
    });
  });

  describe("test DELETE method", () => {
    let addedPubFixture;

    before(async () => {
      addedPubFixture = fixtures.getPub();
      await knex(PUB_TABLE)
        .insert(addedPubFixture)
        .returning("id")
        .then((result) => {
          console.log("inserted test pub with ", result);
        })
        .catch(console.error);
    });

    // register store
    it(`DELETE /pubs delete pub data `, async () => {
      // Execute
      const res = await request.delete("/api/pubs").send(addedPubFixture);

      // Assertion
      JSON.parse(res.text).should.deep.equal(addedPubFixture.id);
    });
  });
});
