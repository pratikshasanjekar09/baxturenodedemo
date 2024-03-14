"use strict";

import commonHelper from "../helpers/common";
import UserService from "../services/user.services";
const { commonResponse } = new commonHelper();
export default class UserController {
  common: UserService;
  constructor() {
    this.common = new UserService();
    this.GetUser = this.GetUser.bind(this);
    this.GetUserById = this.GetUserById.bind(this);
    this.AddUsers = this.AddUsers.bind(this);
    this.UpdateUserById = this.UpdateUserById.bind(this);
    this.DeleteUserById = this.DeleteUserById.bind(this);

  }

  GetUser(req, res) {
    this.common.GetUser(req, async (error, result) => {
      await commonResponse(res, error, result, req);
    });
  }


  GetUserById(req, res) {
    this.common.GetUserById(req, async (error, result) => {
      await commonResponse(res, error, result, req);
    });
  }

  AddUsers(req, res) {
    this.common.AddUsers(req, async (error, result) => {
      await commonResponse(res, error, result, req);
    });
  }

  UpdateUserById(req, res) {
    this.common.UpdateUserById(req, async (error, result) => {
      await commonResponse(res, error, result, req);
    });
  }

  DeleteUserById(req, res) {
    this.common.DeleteUserById(req, async (error, result) => {
      await commonResponse(res, error, result, req);
    });
  }


}
