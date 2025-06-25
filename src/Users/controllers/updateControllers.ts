import { Request, Response } from "express";
import generateHash from "../Helpers/generateHash";
import { ContratanteDTO, ContratistaDTO, InformalDTO } from "../DTO/TipoUser";
import UserService from "../Services/UserServices";
import { subirFotoPerfil } from "../Helpers/BlobServices";
import eliminarFotoAnterior from "../Helpers/BlobDelete";

const updateUser = async (req: Request, res: Response) => {
    try {
        const tokenInfo = req.user;

        const userId = tokenInfo?.data?.id;
        const rol = tokenInfo?.data?.rol;

        if (!userId || !rol) {
            res.status(401).json({ error: "Token inválido o incompleto" });
            return;
        }

        const existingUser = await UserService.getUserById(userId);
        if (!existingUser) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }

        const input = req.body;
        console.log("Datos de entrada: ", input);

        // Encriptar la contraseña si se envía
        if (input.password) {
            input.password = await generateHash(input.password);
        }

        if (input.fotoPerfil && typeof input.fotoPerfil === 'string' && input.fotoPerfil.trim().startsWith('data:image')) {
        // Si hay una nueva foto en base64, elimina la anterior y sube la nueva
        if (existingUser.fotoPerfil) {
            await eliminarFotoAnterior(existingUser.fotoPerfil); // debes tener esta función
        }
            input.fotoPerfil = await subirFotoPerfil(input.fotoPerfil); // asume que devuelve la URL
        } else {
            // Si no se envía una nueva, mantener la actual
            input.fotoPerfil = existingUser.fotoPerfil;
        }

        let result;

        if (rol === "contratante_formal") {
            const dto = new ContratanteDTO(
                input.NIT ?? existingUser.NIT,
                input.sector ?? existingUser.sector,
                input.nombreCompleto ?? existingUser.nombreCompleto,
                input.email ?? existingUser.email,
                input.telefono ?? existingUser.telefono,
                input.telefono2 ?? existingUser.telefono2,
                input.password ?? existingUser.password,
                input.descripcion ?? existingUser.descripcion,
                input.fotoPerfil ?? existingUser.fotoPerfil,
                input.municipio ?? existingUser.municipio,
                input.tipoDocumento ?? existingUser.tipoDocumento,
                input.numeroCedula ?? existingUser.numeroCedula,
                input.genero ?? existingUser.genero,
                input.estadoPerfil ?? existingUser.estadoPerfil,
                input.tipo_usuario ?? existingUser.tipo_usuario,
                userId
            );
            result = await UserService.updateContratante(dto);

        } else if (rol === "contratista") {
            const dto = new ContratistaDTO(
                input.HabilidadesTecnicas ?? existingUser.HabilidadesTecnicas,
                input.HabilidadesSociales ?? existingUser.HabilidadesSociales,
                input.EstudiosComplementario ?? existingUser.EstudiosComplementario,
                input.experiencia ?? existingUser.experiencia,
                input.Ocupacion ?? existingUser.Ocupacion,
                input.categoria_trabajo ?? existingUser.categoria_trabajo,
                input.nombreCompleto ?? existingUser.nombreCompleto,
                input.email ?? existingUser.email,
                input.telefono ?? existingUser.telefono,
                input.telefono2 ?? existingUser.telefono2,
                input.password ?? existingUser.password,
                input.descripcion ?? existingUser.descripcion,
                input.fotoPerfil ?? existingUser.fotoPerfil,
                input.municipio ?? existingUser.municipio,
                input.tipoDocumento ?? existingUser.tipoDocumento,
                input.numeroCedula ?? existingUser.numeroCedula,
                input.genero ?? existingUser.genero,
                input.estadoPerfil ?? existingUser.estadoPerfil,
                input.tipo_usuario ?? existingUser.tipo_usuario,
                userId
            );
            result = await UserService.updateContratista(dto);

        } else if (rol === "contratante_informal") {
            const dto = new InformalDTO(
                input.nombreCompleto ?? existingUser.nombreCompleto,
                input.email ?? existingUser.email,
                input.telefono ?? existingUser.telefono,
                input.telefono2 ?? existingUser.telefono2,
                input.password ?? existingUser.password,
                input.descripcion ?? existingUser.descripcion,
                input.fotoPerfil ?? existingUser.fotoPerfil,
                input.municipio ?? existingUser.municipio,
                input.tipoDocumento ?? existingUser.tipoDocumento,
                input.numeroCedula ?? existingUser.numeroCedula,
                input.genero ?? existingUser.genero,
                input.estadoPerfil ?? existingUser.estadoPerfil,
                input.tipo_usuario ?? existingUser.tipo_usuario,
                userId
            );
            result = await UserService.updateInformal(dto);
        }

        res.status(200).json({
            message: "Usuario actualizado con éxito",
            result
        });

    } catch (error: any) {
        console.error("Error actualizando usuario:", error);
        res.status(500).json({ error: error.message });
        return;
    }
};

export {
    updateUser
}