
// import { db } from "../config/database";
import Usuario from "../DTO/UserDto";
import generateHash from "../Helpers/generateHash";
import UserRepository from "../Models/UserRepository";

class UserService {

    static async registerUser(user: Usuario) {
        user.password = await generateHash(user.password);
        return await UserRepository.add(user);
    }
    /*
    // Login- falta el ingreso
    static async login(auth: Auth) {
        return await UserRepository.login(auth)
    }
    */
}

export default UserService;