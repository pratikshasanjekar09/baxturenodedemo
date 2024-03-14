import crypto from 'crypto';
import { validationResult } from 'express-validator';
import { HttpCodes } from './responseCodes';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';
const models = require('./../models/index');



export default class autorizationController {
  constructor() {
    this.getEpoch = this.getEpoch.bind(this);
    this.commonResponse = this.commonResponse.bind(this);
    this.GetPagination = this.GetPagination.bind(this);
    this.CheckValidationError = this.CheckValidationError.bind(this);
    this.CheckValidationErrorArray = this.CheckValidationErrorArray.bind(this);

  }

  async getEpoch() {
    return Math.floor(Date.now() / 1000);
  }

  async GetPagination(limitValue, skipValue) {
    let limit = limitValue ? parseInt(limitValue) : 10;
    let skip = 0;
    if (skipValue && skipValue != -1) {
      skip = (parseInt(skipValue) * limit);
    } else if (skipValue == -1) {
      skip = -1;
    }
    return { limit, skip };
  }

  async commonResponse(res, error, result,req=null) {


    if (error) {
      res.status(200).json({ status: false, message: res.__("api.errors.SomethingWrong"), code: HttpCodes['BAD_REQUEST'], data: error, total: 0, host:result.host });
    } else {
      if (result && result.status === "false") {
        if (result.flag === 1) {
          res.status(200).json({
            status: false,
            message: `${res.__(`api.errors.${result.msg}`)} : ${result.name}`,
            code: result.code,
            data: result.data,
            total: result?.total
          });
        } else {
          res.status(200).json({
            status: false,
            message: res.__(`api.errors.${result.msg}`),
            code: result.code,
            data: result.data,
            total: result?.total
          });
        }
      } else {
        res.status(200).json({ status: true, message: res.__(`api.msg.${result.msg}`), code: result.code, data: result.data, dropDownData: result?.dropDownData, total: result?.total, offset: result.offset,host:result.host });
      }
    }
  }

  async CheckValidationError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ status: false, message: res.__(`api.errors.${errors.array()[0].msg}`), code: HttpCodes['CONTENT_NOT_FOUND'], data: {} });
    } else {
      next();
    }
  }

  async CheckValidationErrorArray(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ status: false, message: res.__(`api.errors.${errors.array()[0].msg}`), code: HttpCodes['CONTENT_NOT_FOUND'], data: [] });
    } else {
      next();
    }
  }




}

