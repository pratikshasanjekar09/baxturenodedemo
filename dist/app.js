"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const i18n_1 = __importDefault(require("i18n"));
const app = (0, express_1.default)();
// Load envs from .env file
if (fs_1.default.existsSync("./.env")) {
    require("dotenv").config();
}
// Localization setup
i18n_1.default.configure({
    locales: ["en"],
    directory: (0, path_1.resolve)(__dirname, "../locales"),
    defaultLocale: "en",
    queryParameter: "lang",
    objectNotation: true
});
app.use(i18n_1.default.init);
app.use(express_1.default.json({ type: 'application/json', limit: '100mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send("Welcome......");
});
var AllRouter = require("./routes/v1");
app.use('/api', AllRouter);
module.exports = app;
//# sourceMappingURL=app.js.map