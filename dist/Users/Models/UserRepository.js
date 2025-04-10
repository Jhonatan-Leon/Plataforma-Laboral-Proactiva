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
const config_db_1 = __importDefault(require("../Config/config-db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserRepository {
    // Agregar usuario
    static add(User) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!User.estadoPerfil) {
                User.estadoPerfil = "activo";
            }
            console.log("Estado del perfil antes de insertar:", User.estadoPerfil);
            console.log(User.nombreCompleto, User.email, User.telefono, User.password, User.descripcion, User.estadoPerfil, (_a = User.fotoPerfil) !== null && _a !== void 0 ? _a : null, User.tipoUsuario);
            const sql = `INSERT INTO usuarios (nombre_usuario, email, telefono, password, descripcion_usuario, foto_perfil, estado_perfil, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [User.nombreCompleto, User.email, User.telefono, User.password, User.descripcion, (_b = User.fotoPerfil) !== null && _b !== void 0 ? _b : null, User.estadoPerfil, User.tipoUsuario];
            console.log("Consulta: ", sql);
            console.log("Variables Repository: ", values);
            try {
                const [result] = yield config_db_1.default.execute(sql, values);
                return result.insertId;
            }
            catch (error) {
                console.error("Error al insertar usuario:", error);
                throw error;
            }
        });
    }
    static addContratante(User) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO Contratantes (id_contratate, NIT) VALUES (?, ?)`;
            const values = [User.usuarioId, User.NIT];
            console.log(values);
            return yield config_db_1.default.execute(sql, values);
        });
    }
    static addContratista(User) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO Contratistas (id_contratista, cedula, categoria_trabajo, hoja_vida) VALUES (?, ?, ?, ?)`;
            const values = [User.usuarioId, User.cedula, User.categoriaTrabajo, User.hojaDeVida];
            return yield config_db_1.default.execute(sql, values);
        });
    }
    static login(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT id_usuario, estado_perfil, tipo_usuario, password FROM usuarios WHERE email = ?';
                const values = [auth.email];
                const rows = yield config_db_1.default.execute(sql, values);
                if (!rows || rows.length === 0) {
                    return { logged: false, status: "Correo o Contraseña incorrectos" };
                }
                const user = rows[0][0];
                if (user.estado_perfil === "inactivo") {
                    return { logged: false, status: "Cuenta inactiva. Contacte al soporte." };
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(auth.password, user.password);
                if (!isPasswordValid) {
                    return { logged: false, status: "Correo o Contraseña incorrectos" };
                }
                return {
                    logged: true,
                    status: "Autenticación válida",
                    id: user.id_usuario,
                    estado_perfil: user.estado_perfil,
                    rol: user.tipo_usuario
                };
            }
            catch (error) {
                console.error("Error en el login:", error);
                return { logged: false, status: "Error interno del servidor" };
            }
        });
    }
    static getUserById(Id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT u.id_usuario, u.nombre_usuario, u.email, u.telefono, u.password, u.descripcion_usuario, u.foto_perfil, u.estado_perfil, u.tipo_usuario, c.NIT AS contratante_NIT, t.cedula AS contratista_cedula, t.categoria_trabajo, t.hoja_vida FROM usuarios u
          LEFT JOIN contratantes c ON u.id_usuario = c.id_contratante AND u.tipo_usuario = 'contratante' LEFT JOIN contratistas t ON u.id_usuario = t.id_contratista AND u.tipo_usuario = 'contratista'
          WHERE u.id_usuario = ?;`;
                const [rows] = yield config_db_1.default.execute(query, [Id]);
                if (rows.length === 0)
                    return null;
                let user = rows[0];
                console.log(user);
                // Recorrer objeto y eliminar variables con parametros null
                Object.keys(user).forEach((key) => {
                    if (user[key] === null) {
                        delete user[key];
                    }
                });
                return user;
            }
            catch (error) {
                console.error("Error al obtener el usuario:", error);
                throw error;
            }
        });
    }
    static getByRol(tipo_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT u.id_usuario, u.nombre_usuario, u.email, u.telefono, u.password, u.descripcion_usuario, u.foto_perfil, u.estado_perfil, u.tipo_usuario, c.NIT AS contratante_NIT, t.cedula AS contratista_cedula, t.categoria_trabajo, t.hoja_vida FROM usuarios u
          LEFT JOIN contratantes c ON u.id_usuario = c.id_contratante AND u.tipo_usuario = 'contratante' LEFT JOIN contratistas t ON u.id_usuario = t.id_contratista AND u.tipo_usuario = 'contratista'
          WHERE u.tipo_usuario = ?;`;
                const values = [tipo_usuario];
                console.log(values);
                const [rows] = yield config_db_1.default.execute(query, values);
                if (rows.length === 0)
                    return null;
                let list = rows.map((user) => {
                    Object.keys(user).forEach((key) => {
                        if (user[key] === null) {
                            delete user[key];
                        }
                    });
                    return user;
                });
                return list;
            }
            catch (err) {
                console.error("Error al obtener al usuario: ", err);
                throw err;
            }
        });
    }
    static getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `
              SELECT u.id_usuario, u.nombre_usuario, u.email, u.telefono, u.password, u.descripcion_usuario, u.foto_perfil, u.estado_perfil, u.tipo_usuario, c.NIT AS contratante_NIT, 
                t.cedula AS contratista_cedula, t.categoria_trabajo, t.hoja_vida FROM usuarios u LEFT JOIN contratantes c ON u.id_usuario = c.id_contratante LEFT JOIN contratistas t ON u.id_usuario = t.id_contratista
                WHERE u.email = ?;`;
                const [rows] = yield config_db_1.default.execute(query, [email]);
                if (rows.length === 0)
                    return null;
                let user = rows[0];
                console.log("Usuario obtenido:", user);
                return user;
            }
            catch (error) {
                console.error("Error al obtener el usuario:", error);
                throw error;
            }
        });
    }
    static updateUser(user, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const put = `UPDATE usuarios SET nombre_usuario = COALESCE(?, nombre_usuario), telefono = COALESCE(?, telefono), password = COALESCE(?, password), descripcion_usuario = COALESCE(?, descripcion_usuario),
            foto_perfil = COALESCE(?, foto_perfil), estado_perfil = COALESCE(?, estado_perfil), tipo_usuario = COALESCE(?, tipo_usuario) WHERE email = ?;`;
                const values = [user.nombre_usuario, user.telefono, user.password, user.descripcion_usuario, user.foto_perfil, user.estado_perfil, user.tipo_usuario, email];
                const [rows] = yield config_db_1.default.execute(put, values);
                if (rows.affectedRows === 0) {
                    return { message: "No se realizaron cambios o el usuario no existe." };
                }
                return { message: "Usuario actualizado con éxito", affectedRows: rows.affectedRows };
            }
            catch (err) {
                console.error("Error registro usuarios: ", err);
                throw err;
            }
        });
    }
    static updateContratante(dataUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const put = `UPDATE contratantes SET NIT = COALESCE(?, NIT) WHERE id_contratante = ?;`;
                const values = [dataUpdate.NIT, dataUpdate.usuarioId];
                const [rows] = yield config_db_1.default.execute(put, values);
                return rows;
            }
            catch (err) {
                console.error("Error al actualizar datos: ", err);
                throw err;
            }
        });
    }
    static updateContratista(dataUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const put = `UPDATE contratistas SET cedula = COALESCE(?, cedula), categoria_trabajo = COALESCE(?, categoria_trabajo), hoja_vida = COALESCE(?, hoja_vida) WHERE id_contratista = ?;;`;
                const values = [dataUpdate.cedula, dataUpdate.categoriaTrabajo, dataUpdate.hojaDeVida, dataUpdate.usuarioId];
                const [rows] = yield config_db_1.default.execute(put, values);
                return rows;
            }
            catch (err) {
                console.error("Error al actualizar datos: ", err);
                throw err;
            }
        });
    }
    static deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userdelete = `DELETE FROM usuarios WHERE email = ?`;
            const values = [email];
            return yield config_db_1.default.execute(userdelete, values);
        });
    }
    static desactivarUser(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const userdesactivar = `UPDATE usuarios SET estado_perfil = 'inactivo' WHERE id_usuario = ? AND estado_perfil != 'inactivo'`;
            const values = [idUser];
            const [rows] = yield config_db_1.default.execute(userdesactivar, values);
            return rows.affectedRows > 0;
        });
    }
}
exports.default = UserRepository;
