/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("pub").del();
  await knex("pub").insert([
    {
      id: 1,
      email: "pub_1@exapmle.com",
      pub_name: "pub_1",
      address: "AAAAA",
      city: "Yokohama",
      region: "Kanagawa",
      postal_code: "220-0012",
      country: "Japan",
    },
    {
      id: 2,
      email: "pub_2@exapmle.com",
      pub_name: "pub_2",
      address: "BBBBB",
      city: "Yokohama",
      region: "Kanagawa",
      postal_code: "220-0012",
      country: "Japan",
    },
    {
      id: 3,
      email: "pub_3@exapmle.com",
      pub_name: "pub_3",
      address: "CCCCC",
      city: "Yokohama",
      region: "Kanagawa",
      postal_code: "220-0012",
      country: "Japan",
    },
  ]);
};
