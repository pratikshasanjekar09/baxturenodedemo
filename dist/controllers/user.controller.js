"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __importDefault(require("../helpers/common"));
const user_services_1 = __importDefault(require("../services/user.services"));
const { commonResponse } = new common_1.default();
class UserController {
    constructor() {
        this.common = new user_services_1.default();
        this.GetUser = this.GetUser.bind(this);
        this.GetUserById = this.GetUserById.bind(this);
        this.AddUsers = this.AddUsers.bind(this);
        this.UpdateUserById = this.UpdateUserById.bind(this);
        this.DeleteUserById = this.DeleteUserById.bind(this);
    }
    GetUser(req, res) {
        this.common.GetUser(req, (error, result) => __awaiter(this, void 0, void 0, function* () {
            yield commonResponse(res, error, result, req);
        }));
    }
    GetUserById(req, res) {
        this.common.GetUserById(req, (error, result) => __awaiter(this, void 0, void 0, function* () {
            yield commonResponse(res, error, result, req);
        }));
    }
    AddUsers(req, res) {
        this.common.AddUsers(req, (error, result) => __awaiter(this, void 0, void 0, function* () {
            yield commonResponse(res, error, result, req);
        }));
    }
    UpdateUserById(req, res) {
        this.common.UpdateUserById(req, (error, result) => __awaiter(this, void 0, void 0, function* () {
            yield commonResponse(res, error, result, req);
        }));
    }
    DeleteUserById(req, res) {
        this.common.DeleteUserById(req, (error, result) => __awaiter(this, void 0, void 0, function* () {
            yield commonResponse(res, error, result, req);
        }));
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map