const express = require("express");
const AccountsRouter = require("./accounts/accounts-router.js");

const server = express();

server.use(express.json());

// Mount router
server.use("/api/accounts", AccountsRouter);

module.exports = server;
