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
const models = require('./../models/index');
const common_1 = __importDefault(require("../helpers/common"));
const http = require('http');
const responseCodes_1 = require("../helpers/responseCodes");
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const fs = require('fs');
const { v4: isUUID } = require('uuid'); // Assuming you are using the uuid library for UUID validation
const {} = new common_1.default();
const db = require("../models/index");
class UserService {
    constructor() {
        this.GetUser = this.GetUser.bind(this);
        this.GetUserById = this.GetUserById.bind(this);
        this.AddUsers = this.AddUsers.bind(this);
        this.UpdateUserById = this.UpdateUserById.bind(this);
        this.DeleteUserById = this.DeleteUserById.bind(this);
    }
    GetUser(req, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models.User.findAll();
                if (users.length > 0) {
                    return callback(null, { 'status': responseCodes_1.HttpCodes['API_SUCCESS'], 'msg': 'GetUsers', code: responseCodes_1.HttpCodes['OK'], data: users });
                }
                else {
                    return callback(null, { 'status': responseCodes_1.HttpCodes['API_SUCCESS'], 'msg': 'NoDataFound', code: responseCodes_1.HttpCodes['OK'], data: [] });
                }
            }
            catch (error) {
                console.log(error.message, "error in get users");
                return callback(null, { 'status': responseCodes_1.HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: responseCodes_1.HttpCodes['BAD_REQUEST'], data: [] });
            }
        });
    }
    GetUserById(req, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                // Validate if userId is a valid UUID
                if (!isUUID(userId)) {
                    return callback(null, { 'status': responseCodes_1.HttpCodes['API_FAILURE'], 'msg': 'InvalidUserId', code: responseCodes_1.HttpCodes['BAD_REQUEST'], data: [] });
                }
                const userInfo = yield models.User.findOne({ where: { id: userId } });
                if (userInfo) {
                    return callback(null, { 'status': responseCodes_1.HttpCodes['API_SUCCESS'], 'msg': 'GetUser', code: responseCodes_1.HttpCodes['OK'], data: userInfo });
                }
                else {
                    return callback(null, { 'status': responseCodes_1.HttpCodes['API_FAILURE'], 'msg': 'UserNotFound', code: responseCodes_1.HttpCodes['NOT_FOUND'], data: [] });
                }
            }
            catch (error) {
                console.log(error.message, "error in get users");
                return callback(null, { 'status': responseCodes_1.HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: responseCodes_1.HttpCodes['BAD_REQUEST'], data: [] });
            }
        });
    }
    AddUsers(req, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, age, hobbies } = req.body;
                // Create a new user
                const newUser = yield models.User.create({
                    username,
                    age,
                    hobbies: hobbies || [], // Use provided hobbies or default to an empty array
                });
                if (newUser) {
                    return callback(null, { 'status': responseCodes_1.HttpCodes['API_SUCCESS'], 'msg': 'UserAddSuccess', code: responseCodes_1.HttpCodes['OK'], data: newUser });
                }
                else {
                    return callback(null, { 'status': responseCodes_1.HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: responseCodes_1.HttpCodes['BAD_REQUEST'], data: {} });
                }
            }
            catch (error) {
                console.log(error.message, "error in add users");
                return callback(null, { 'status': responseCodes_1.HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: responseCodes_1.HttpCodes['BAD_REQUEST'], data: {} });
            }
        });
    }
    UpdateUserById(req, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const { username, age, hobbies } = req.body;
                const userInfo = yield models.User.findOne({ where: { id: userId } });
                if (!userInfo) {
                    return callback(null, { 'status': responseCodes_1.HttpCodes['API_FAILURE'], 'msg': 'UserNotFound', code: responseCodes_1.HttpCodes['NOT_FOUND'], data: [] });
                }
                // Update user data
                yield userInfo.update({
                    username: username || userInfo.username,
                    age: age || userInfo.age,
                    hobbies: hobbies || userInfo.hobbies,
                });
                return callback(null, { 'status': responseCodes_1.HttpCodes['API_SUCCESS'], 'msg': 'UserupdateSuccess', code: responseCodes_1.HttpCodes['OK'], data: userInfo });
            }
            catch (error) {
                console.log(error.message, "error in update users");
                return callback(null, { 'status': responseCodes_1.HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: responseCodes_1.HttpCodes['BAD_REQUEST'], data: [] });
            }
        });
    }
    DeleteUserById(req, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                if (!userId) {
                    return callback(null, { status: responseCodes_1.HttpCodes['API_FAILURE'], msg: 'UserIdRequired', code: responseCodes_1.HttpCodes['BAD_REQUEST'] });
                }
                const userInfo = yield models.User.findOne({ where: { id: userId } });
                if (!userInfo) {
                    return callback(null, { 'status': responseCodes_1.HttpCodes['API_FAILURE'], 'msg': 'UserNotFound', code: responseCodes_1.HttpCodes['NOT_FOUND'], data: {} });
                }
                yield models.User.destroy({ where: { id: userId } });
                return callback(null, { 'status': responseCodes_1.HttpCodes['API_SUCCESS'], 'msg': 'UserDeleted', code: responseCodes_1.HttpCodes['OK'], data: {} });
            }
            catch (error) {
                console.error(error.message, "error in delete user by id");
                return callback(null, { 'status': responseCodes_1.HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: responseCodes_1.HttpCodes['INTERNAL_SERVER_ERROR'], data: [] });
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user.services.js.map