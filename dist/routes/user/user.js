"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const { GetUser, GetUserById, AddUsers, UpdateUserById, DeleteUserById } = new user_controller_1.default();
module.exports = function (router) {
    //get users 
    router.get('/', GetUser);
    //get user by user id 
    router.get('/:id', GetUserById);
    // add record 
    router.post('/', AddUsers);
    //update user 
    router.put('/:id', UpdateUserById);
    //delete user
    router.delete('/:id', DeleteUserById);
};
//# sourceMappingURL=user.js.map