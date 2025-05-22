import { Request, Response } from "express";
import generateHash from "../Helpers/generateHash";
import { ContratanteDTO, ContratistaDTO, InformalDTO } from "../DTO/TipoUser";
import UserService from "../Services/UserServices";
import { info } from "console";

const updateUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const userData = req.body;

        // 1. Obtener usuario existente
        const existingUser = await UserService.getUserByEmail(email);
        if (!existingUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // 2. Filtrar solo campos válidos para actualización
        const validFields = [
            'nombreCompleto', 'email', 'telefono', 'telefono2', 'password', 'descripcion', 'fotoPerfil',
            'municipio', 'tipoDocumento', 'numeroCedula', 'genero', 'estadoPerfil', 'tipo_usuario',
            'HabilidadesTecnicas', 'HabilidadesSociales', 'EstudiosComplementario', 'experiencia', 'categoria_trabajo',
            'NIT', 'sector'
        ];

        const updatePayload: any = {};
        
        // 3. Construir payload dinámicamente
        validFields.forEach(field => {
            if (userData[field] !== undefined && userData[field] !== null) {
                updatePayload[field] = userData[field];
            }
        });

        // 4. Manejo especial para contraseña
        if (userData.password) {
            updatePayload.password = await generateHash(userData.password);
        }

        // 5. Manejo específico por tipo de usuario (ejemplo para Contratante)
        if (userData.tipo_usuario === "contratante") {
            const contratanteData = {
                NIT: userData.NIT || existingUser.NIT,
                sector: userData.sector || existingUser.sector,
                ...updatePayload
            };
            await UserService.updateContratante(new ContratanteDTO(contratanteData.NIT, contratanteData.sector, updatePayload.nombreCompleto, updatePayload.email, updatePayload.telefono, updatePayload.telefono2, updatePayload.password, updatePayload.descripcion,
                updatePayload.fotoPerfil, updatePayload.municipio, updatePayload.tipoDocumento, updatePayload.numeroCedula, updatePayload.genero, updatePayload.estadoPerfil, userData.tipo_usuario));
        }else if (userData.tipo_usuario === "contratista") {
            const contratistaData = {
                HabilidadesTecnicas: userData.HabilidadesTecnicas || existingUser.HabilidadesTecnicas,
                HabilidadesSociales: userData.HabilidadesSociales || existingUser.HabilidadesSociales,
                 EstudiosComplementario: userData.EstudiosComplementario || existingUser.EstudiosComplementario,
                experiencia: userData.experiencia || existingUser.experiencia, ... updatePayload
            };
            await UserService.updateContratista(new ContratistaDTO(contratistaData.HabilidadesTecnicas, contratistaData.HabilidadesSociales, contratistaData.EstudiosComplementario, contratistaData.experiencia, userData.categoria_trabajo || existingUser.categoria_trabajo, updatePayload.nombreCompleto, updatePayload.email, updatePayload.telefono, updatePayload.telefono2, updatePayload.password, updatePayload.descripcion,
                updatePayload.fotoPerfil, updatePayload.municipio, updatePayload.tipoDocumento, updatePayload.numeroCedula, updatePayload.genero, updatePayload.estadoPerfil, userData.tipo_usuario
            ));
        }else if (userData.tipo_usuario === "informal") {
            const informalData = {
                ...updatePayload
            };
            await UserService.updateInformal(new InformalDTO(informalData.nombreCompleto, informalData.email, informalData.telefono, informalData.telefono2, informalData.password, informalData.descripcion,
                informalData.fotoPerfil, informalData.municipio, informalData.tipoDocumento, informalData.numeroCedula, informalData.genero, informalData.estadoPerfil, userData.tipo_usuario
            ));
        }

        res.status(200).json({ 
            message: "Usuario actualizado con éxito",
            updatedFields: Object.keys(updatePayload)
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};



export {
    updateUser
}