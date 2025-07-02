import { error } from "console";
import postulacion from "../DTO/DtoPostulacion";
import PostulacionRepository from "../Models/Repository";

class postulacionServices {
	static async registrarPostulacion(post: postulacion): Promise<void> {
			
    	const { rowCount } = await PostulacionRepository.registrarPost(post); 

    	if (rowCount !== 1) {
      	throw new Error('Usuario no postulado');
    	}
  	}

	static async getpostulacion(id: string) {
  		const result = await PostulacionRepository.GetPostulacion(id);

  		if (!result || result.length === 0) {
    		throw new Error('El usuario no tiene postulaciones');
  		}

  		return result;          
	}
}

export default postulacionServices;