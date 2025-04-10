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
const generateHash_1 = __importDefault(require("../Helpers/generateHash"));
const UserRepository_1 = __importDefault(require("../Models/UserRepository"));
class UserService {
    static registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.password = yield (0, generateHash_1.default)(user.password);
            return yield UserRepository_1.default.add(user);
        });
    }
    static registerContratante(User) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.addContratante(User);
        });
    }
    static registerContratista(User) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.addContratista(User);
        });
    }
    static login(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.login(auth);
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.getUserById(id);
        });
    }
    static getByRol(tipo_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.getByRol(tipo_usuario);
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.getUserByEmail(email);
        });
    }
    static updateUser(user, email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.updateUser(user, email);
        });
    }
    static updateContratante(updateUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.updateContratante(updateUser);
        });
    }
    static updateContratista(updateUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.updateContratista(updateUser);
        });
    }
    static deleteUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.deleteUser(email);
        });
    }
    static deactivateUser(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository_1.default.desactivarUser(UserId);
        });
    }
}
exports.default = UserService;
