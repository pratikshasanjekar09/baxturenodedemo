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
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const responseCodes_1 = require("./responseCodes");
const bcrypt = require('bcrypt');
const models = require('./../models/index');
class autorizationController {
    constructor() {
        this.getEpoch = this.getEpoch.bind(this);
        this.commonResponse = this.commonResponse.bind(this);
        this.GetPagination = this.GetPagination.bind(this);
        this.CheckValidationError = this.CheckValidationError.bind(this);
        this.CheckValidationErrorArray = this.CheckValidationErrorArray.bind(this);
    }
    getEpoch() {
        return __awaiter(this, void 0, void 0, function* () {
            return Math.floor(Date.now() / 1000);
        });
    }
    GetPagination(limitValue, skipValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let limit = limitValue ? parseInt(limitValue) : 10;
            let skip = 0;
            if (skipValue && skipValue != -1) {
                skip = (parseInt(skipValue) * limit);
            }
            else if (skipValue == -1) {
                skip = -1;
            }
            return { limit, skip };
        });
    }
    commonResponse(res, error, result, req = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error) {
                res.status(200).json({ status: false, message: res.__("api.errors.SomethingWrong"), code: responseCodes_1.HttpCodes['BAD_REQUEST'], data: error, total: 0, host: result.host });
            }
            else {
                if (result && result.status === "false") {
                    if (result.flag === 1) {
                        res.status(200).json({
                            status: false,
                            message: `${res.__(`api.errors.${result.msg}`)} : ${result.name}`,
                            code: result.code,
                            data: result.data,
                            total: result === null || result === void 0 ? void 0 : result.total
                        });
                    }
                    else {
                        res.status(200).json({
                            status: false,
                            message: res.__(`api.errors.${result.msg}`),
                            code: result.code,
                            data: result.data,
                            total: result === null || result === void 0 ? void 0 : result.total
                        });
                    }
                }
                else {
                    res.status(200).json({ status: true, message: res.__(`api.msg.${result.msg}`), code: result.code, data: result.data, dropDownData: result === null || result === void 0 ? void 0 : result.dropDownData, total: result === null || result === void 0 ? void 0 : result.total, offset: result.offset, host: result.host });
                }
            }
        });
    }
    CheckValidationError(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({ status: false, message: res.__(`api.errors.${errors.array()[0].msg}`), code: responseCodes_1.HttpCodes['CONTENT_NOT_FOUND'], data: {} });
            }
            else {
                next();
            }
        });
    }
    CheckValidationErrorArray(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({ status: false, message: res.__(`api.errors.${errors.array()[0].msg}`), code: responseCodes_1.HttpCodes['CONTENT_NOT_FOUND'], data: [] });
            }
            else {
                next();
            }
        });
    }
}
exports.default = autorizationController;
//# sourceMappingURL=common.js.map