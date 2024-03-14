"use strict";
import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import { join, resolve } from "path";
import * as path from 'path';
import i18n from "i18n";
const app = express();

// Load envs from .env file
if (fs.existsSync("./.env")) {
  require("dotenv").config();
}

// Localization setup
i18n.configure({
  locales: ["en"],
  directory: resolve(__dirname, "../locales"),
  defaultLocale: "en",
  queryParameter: "lang",
  objectNotation: true
});
app.use(i18n.init);


app.use(express.json({type:'application/json', limit: '100mb'}));
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send("Welcome......");
});


var AllRouter = require("./routes/v1");
app.use('/api',AllRouter);


module.exports = app;
