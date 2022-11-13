const express = require("express");
const path = require("path");
const pubController = require("./pub/pub.controller");

const setupServer = () => {
  const app = express();

  /*
  This adds JSON parsing middleware for incoming request
  body with a Content-Type header of 'application/json'.
  You don't need to worry about JSON.parse or JSON.stringify
  when this middleware is used.
*/
  app.use(express.json());

  // For parsing form data (application/x-www-form-urlencoded)
  app.use(express.urlencoded({ extended: true }));

  // This configures templates for the frontend of the app.
  app.set("views", `${__dirname}/templates`);
  app.set("view engine", "ejs");

  /*
  This allows us to serve static files (html, css, etc.) from
  the public directory.
*/
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.render("pages/index");
  });

  // Pub routes
  app.get("/api/pubs", pubController.getAll);
  app.get("/api/pubs/:idOrName", pubController.getByIdOrName);
  app.put("/api/pubs", pubController.save);
  app.post("/api/pubs", pubController.create);
  app.delete("/api/pubs", pubController.delete);

  app.get("/error", (req, res) => {
    console.log(res);
    res.render("pages/error");
  });

  return app;
};

module.exports = { setupServer };
