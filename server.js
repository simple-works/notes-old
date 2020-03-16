//==============================================================================
// ■ Server (server.js)
//------------------------------------------------------------------------------
//     Serve the application on a node server.
//==============================================================================
const path = require("path");

//------------------------------------------------------------------------------
// ● Express Server
//------------------------------------------------------------------------------
const express = require("express");
const app = express();

//------------------------------------------------------------------------------
// ● Database API Server
//------------------------------------------------------------------------------
const jsonServer = require("json-server");
const jsonServerAuth = require("json-server-auth");
const db = require(path.join(__dirname, "db/db.js"));
const routes = require(path.join(__dirname, "db/routes.json"));

const jsonServerApp = jsonServer.create();
const jsonServerRouter = jsonServer.router(db());
const jsonServerRules = jsonServerAuth.rewriter(routes);

// Bind the router db to the app
jsonServerApp.db = jsonServerRouter.db;

// The middlewares must be applied in this order
jsonServerApp.use(jsonServerRules);
jsonServerApp.use(jsonServerAuth);
jsonServerApp.use(jsonServerRouter);
app.use("/api", jsonServerApp);

//------------------------------------------------------------------------------
// ● Website Server
//------------------------------------------------------------------------------
const serveStatic = require("serve-static");

// Serve app from "dist" folder
app.use("/", serveStatic(path.join(__dirname, "/dist")));

// Serve app from other routes except root "/"
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () =>
  console.log(`[amb-notes][port:${port}] server is listening...`)
);
