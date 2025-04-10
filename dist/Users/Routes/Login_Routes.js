"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const ValidaterLogin_1 = __importDefault(require("../Middleware/ValidaterLogin"));
const ControllerrefreshToken_1 = __importDefault(require("../controllers/ControllerrefreshToken"));
const router = (0, express_1.Router)();
router.post('/login_user', ValidaterLogin_1.default.validatorParams, ValidaterLogin_1.default.validator, loginController_1.loginUser);
router.post('/refresh', ControllerrefreshToken_1.default);
exports.default = router;
