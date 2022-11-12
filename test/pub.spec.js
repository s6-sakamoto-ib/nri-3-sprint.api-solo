const { expect, assert } = require("chai");
const config = require("../knexfile");
const knex = require("knex")(config);
const fixtures = require("./fixtures");
const pubModel = require("../src/pub/pub.model");
const PUB_TABLE = pubModel.PUB_TABLE;

describe("Knex test", () => {
  let pubFixture;

  before(async () => {
    pubFixture = fixtures.getPub();
    await knex(PUB_TABLE)
      .insert(pubFixture)
      .returning("id")
      .then((result) => {
        console.log("inserted test pub with ", result);
      })
      .catch(console.error);
  });

  after(async () => {
    await knex(PUB_TABLE)
      .where("id", pubFixture.id)
      .returning("id")
      .del()
      .then((result) => {
        console.log("removed test pub with ", result);
      })
      .catch(console.error);
  });

  describe("setup", () => {
    it("should connect to database", () => {
      knex.raw("select 1 as result").catch(() => {
        assert.fail("unable to connect to database");
      });
    });

    it("has run the initial migration", () => {
      knex(PUB_TABLE)
        .select()
        .catch(() => assert.fail("pub table is not found."));
    });
  });

  describe("getAll", () => {
    it("should return an array of pubs", async () => {
      const pubs = await pubModel.getAll();
      expect(pubs).to.be.an.instanceof(Array);
    });

    it("should accept a limit argument", async () => {
      const pubs = await pubModel.getAll(3);
      expect(pubs.length).to.be.at.most(3);
    });
  });

  describe("getById", () => {
    describe("when pub exists", () => {
      it("should get pub by id", async () => {
        const pub = await pubModel.getById(pubFixture.id);
        expect(pub).to.exist;
        expect(pub.id).to.eq(pubFixture.id);
      });
    });

    describe("when pub doesn't exist", () => {
      it("should return undefined", async () => {
        const pub = await pubModel.getById(45000);
        expect(pub).to.be.undefined;
      });
    });
  });

  describe("getByName", () => {
    describe("when pub exists", () => {
      it("should get pub by name", async () => {
        const pub = await pubModel.getByName(pubFixture.pub_name);
        expect(pub).to.exist;
        expect(pub.pubName).to.eq(pubFixture.pub_name);
      });
    });

    describe("when pub doesn't exist", () => {
      it("should return undefined", async () => {
        const pub = await pubModel.getByName("PUB");
        expect(pub).to.be.undefined;
      });
    });
  });

  describe("create", () => {
    const newId = 9999;
    after(async () => {
      await knex
        .from(PUB_TABLE)
        .where("pub_name", "kushidori")
        .del()
        .catch(console.error);

      console.log("Deleted test pub");
    });

    describe("with valid properties", () => {
      it("should be able to create a new pub", async () => {
        const newPub = {
          id: newId,
          email: "test@example.com",
          pub_name: "kushidori",
          postal_code: "000-0000",
        };

        await pubModel.create(newPub);
        const pub = await knex(PUB_TABLE)
          .select()
          .where("id", newId)
          .first();
        expect(pub).to.exist;
        expect(pub.id).to.eq(newId);
      });
    });

    describe("with invalid parameters", () => {
      it("should throw an error", () => {
        assert.throws(() => {
          pubModel.create({
            bad_param: "HELLO!",
          });
        }, "Invalid field: bad_param");
      });
    });
  });

  describe("update", () => {
    describe("with valid parameters", () => {
      after(async () => {
        await knex(PUB_TABLE)
          .update({
            pub_name: "oden_miyuki",
          })
          .where("id", pubFixture.id)
          .returning("id")
          .then((result) => {
            console.log("updated test pub with id = ", result);
          })
          .catch(console.error);
      });

      it("should return the id", async () => {
        const id = await pubModel.update(pubFixture.id, {
          pub_name: "kaerunosuke",
        });
        expect(id).to.eq(pubFixture.id);
      });

      it("should update the pub", async () => {
        const pub = await pubModel.getById(pubFixture.id);
        expect(pub.pubName).to.eq("kaerunosuke");
      });
    });

    describe("when invalid parameters", () => {
      it("shouldn't update the pub", async () => {
        assert.throws(() => {
          pubModel.update(pubFixture.id, {
            favorite_food: "Pizza",
          });
        }, "Invalid field: favorite_food");
      });
    });
  });

  describe("delete", () => {
    describe("with valid parameters", () => {
      let deletePub;
      before(async () => {
        deletePub = {
          id: 88888,
          email: "bonten@example.com",
          pub_name: "bonten",
          postal_code: "982-0000",
        };
        await knex(PUB_TABLE)
          .insert(deletePub)
          .returning("id")
          .then((result) => {
            console.log("inserted test pub with ", result);
          })
          .catch(console.error);
      });

      it("should return the id", async () => {
        const id = await pubModel.delete(deletePub.id);
        expect(id).to.eq(deletePub.id);
      });

      it("should delete the pub", async () => {
        const pub = await pubModel.getById(deletePub.id);
        console.log(pub);
        expect(pub).to.eq(undefined);
      });
    });

    describe("when invalid parameters", () => {
      it("shouldn't update the pub", async () => {
        assert.throws(() => {
          pubModel.update(pubFixture.id, {
            favorite_food: "Pizza",
          });
        }, "Invalid field: favorite_food");
      });
    });
  });
});
