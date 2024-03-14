
"use strict";
const models = require('./../models/index');
import commonHelper from "../helpers/common";
const http = require('http');
import { HttpCodes } from "../helpers/responseCodes";
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const fs = require('fs');
const { v4: isUUID } = require('uuid'); // Assuming you are using the uuid library for UUID validation

const {
} = new commonHelper();
const db = require("../models/index");

export default class UserService {

  constructor() {
    this.GetUser = this.GetUser.bind(this);
    this.GetUserById = this.GetUserById.bind(this);
    this.AddUsers = this.AddUsers.bind(this);
    this.UpdateUserById = this.UpdateUserById.bind(this);
    this.DeleteUserById = this.DeleteUserById.bind(this);

  }

  async GetUser(req, callback) {
    try {

      const users = await models.User.findAll();

      if (users.length > 0) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetUsers', code: HttpCodes['OK'], data: users });
      } else {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'NoDataFound', code: HttpCodes['OK'], data: [] });
      }
    } catch (error) {
      console.log(error.message, "error in get users");
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: HttpCodes['BAD_REQUEST'], data: [] });
    }
  }

  async GetUserById(req, callback) {
    try {
      const userId = req.params.id;

      // Validate if userId is a valid UUID
      if (!isUUID(userId)) {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'InvalidUserId', code: HttpCodes['BAD_REQUEST'], data: [] });
      }

      const userInfo = await models.User.findOne({ where: { id: userId } });

      if (userInfo) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'GetUser', code: HttpCodes['OK'], data: userInfo });
      } else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'UserNotFound', code: HttpCodes['NOT_FOUND'], data: [] });
      }
    } catch (error) {
      console.log(error.message, "error in get users");
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: HttpCodes['BAD_REQUEST'], data: [] });
    }
  }

  async AddUsers(req, callback) {
    try {
      const { username, age, hobbies } = req.body;
      // Create a new user
      const newUser = await models.User.create({
        username,
        age,
        hobbies: hobbies || [], // Use provided hobbies or default to an empty array
      });

      if (newUser) {
        return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'UserAddSuccess', code: HttpCodes['OK'], data: newUser });
      }
      else {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: HttpCodes['BAD_REQUEST'], data: {} });

      }

    } catch (error) {
      console.log(error.message, "error in add users");
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: HttpCodes['BAD_REQUEST'], data: {} });
    }
  }


  async UpdateUserById(req, callback) {
    try {
      const userId = req.params.id;
      const { username, age, hobbies } = req.body;
      const userInfo = await models.User.findOne({ where: { id: userId } });

      if (!userInfo) {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'UserNotFound', code: HttpCodes['NOT_FOUND'], data: [] });
      }
  
      // Update user data
      await userInfo.update({
        username: username || userInfo.username, 
        age: age || userInfo.age, 
        hobbies: hobbies || userInfo.hobbies,
      });
  
    return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'UserupdateSuccess', code: HttpCodes['OK'], data: userInfo });
     
    } catch (error) {
      console.log(error.message, "error in update users");
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: HttpCodes['BAD_REQUEST'], data: [] });
    }
  }


  async DeleteUserById(req, callback) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return callback(null, { status: HttpCodes['API_FAILURE'], msg: 'UserIdRequired', code: HttpCodes['BAD_REQUEST'] });
      }

      const userInfo = await models.User.findOne({ where: { id: userId } });

      if (!userInfo) {
        return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'UserNotFound', code: HttpCodes['NOT_FOUND'], data: {} });
      }

      await models.User.destroy({ where: { id: userId } });

      return callback(null, { 'status': HttpCodes['API_SUCCESS'], 'msg': 'UserDeleted', code: HttpCodes['OK'], data: {} });
    } catch (error) {
      console.error(error.message, "error in delete user by id");
      return callback(null, { 'status': HttpCodes['API_FAILURE'], 'msg': 'SomeThingWentWrong', code: HttpCodes['INTERNAL_SERVER_ERROR'], data: [] });
    }
  }


}


