const pubModel = require("./pub.model");

module.exports = {
  async getAll(req, res) {
    const pub = await pubModel.getAll(req.query.limit);
    res.json(pub);
  },

  async getByIdOrName(req, res) {
    const pathParams = req.params.idOrName;
    if (isNaN(Number(pathParams))) {
      const pub = await pubModel.getByName(pathParams);
      res.json(pub);
    } else {
      const id = parseInt(pathParams);
      const pub = await pubModel.getById(id);
      res.json(pub);
    }
  },

  async save(req, res) {
    const {
      id,
      pubName,
      email,
      address,
      city,
      region,
      country,
      postalCode,
      score,
    } = req.body;

    const payload = {
      pub_name: pubName,
      email,
      address,
      city,
      region,
      country,
      postal_code: postalCode,
      score,
    };

    const pub = await pubModel.update(id, payload);
    res.json(pub);
  },

  async create(req, res) {
    const {
      id,
      pubName,
      email,
      address,
      city,
      region,
      country,
      postalCode,
      score,
    } = req.body;

    const payload = {
      id,
      pub_name: pubName,
      email,
      address,
      city,
      region,
      country,
      postal_code: postalCode,
      score,
    };

    const pub = await pubModel.create(payload);
    res.json(pub);
  },

  async delete(req, res) {
    const pub = await pubModel.delete(req.body.id);
    res.json(pub);
  },
};
