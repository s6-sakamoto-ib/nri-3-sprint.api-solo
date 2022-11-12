const knex = require("../knex");
const { validProps, requiredProps } = require("../util/validation");

const validateProps = validProps([
  "id",
  "email",
  "pub_name",
  "address",
  "city",
  "region",
  "country",
  "postal_code",
  "score",
]);

const validateRequired = requiredProps(["email", "pub_name", "postal_code"]);

const PUB_TABLE = "pub";

module.exports = {
  PUB_TABLE,

  /**
   * @param {number} limit - The max number of pubs to return.
   * @return {Promise<Array>} A promise that resolves to an array of pubs.
   */
  getAll(limit = 100) {
    return knex
      .select({
        id: "id",
        pubName: "pub_name",
        email: "email",
        address: "address",
        city: "city",
        region: "region",
        postalCode: "postal_code",
        country: "country",
        score: "score",
      })
      .from(PUB_TABLE)
      .limit(limit);
  },

  /**
   * @param {number} id - The pub's id.
   * @return {Promise<Object>} A promise that resolves to the pub that matches the id.
   */
  getById(id) {
    return knex
      .select({
        id: "id",
        pubName: "pub_name",
        email: "email",
        address: "address",
        city: "city",
        region: "region",
        postalCode: "postal_code",
        country: "country",
        score: "score",
      })
      .from(PUB_TABLE)
      .where({
        id,
      })
      .first();
  },

  /**
   * @param {string} name - The pub's id.
   * @return {Promise<Object>} A promise that resolves to the pub that matches the id.
   */
  getByName(name) {
    return knex
      .select({
        id: "id",
        pubName: "pub_name",
        email: "email",
        address: "address",
        city: "city",
        region: "region",
        postalCode: "postal_code",
        country: "country",
        score: "score",
      })
      .from(PUB_TABLE)
      .where({
        pub_name: name,
      })
      .first();
  },

  /**
   * @param {Object} pub - The new pub data to add.
   * @return {Promise<number>} A promise that resolves to the id of created pub.
   */
  create(pub) {
    validateRequired(validateProps(pub));
    // YOUR CODE HERE
    return knex
      .insert(pub)
      .into(PUB_TABLE)
      .returning("id")
      .then((id) => {
        return id[0].id;
      });
  },

  /**
   * @param {number} id - The unique id of the existing pub.
   * @param {Object} pub - The pub data to change.
   * @return {Promise<number>} A promise that resolves to the id of the updated pub.
   */
  update(id, pub) {
    validateProps(pub);

    // YOU CODE HERE
    return knex(PUB_TABLE)
      .where("id", "=", id)
      .update(pub)
      .returning("id")
      .then((id) => {
        return id[0].id;
      });
  },

  delete(id) {
    return knex(PUB_TABLE)
      .where("id", "=", id)
      .returning("id")
      .del()
      .then((id) => {
        return id[0].id;
      });
  },
};
