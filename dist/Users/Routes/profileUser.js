"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Verifytoken_1 = __importDefault(require("../Middleware/Verifytoken"));
const Controllersprofile_1 = __importDefault(require("../controllers/Controllersprofile"));
const router = (0, express_1.Router)();
router.post('/profile', Verifytoken_1.default, Controllersprofile_1.default.profile);
router.post('/desactivarcuenta', Verifytoken_1.default, Controllersprofile_1.default.deactivateUser);
exports.default = router;
