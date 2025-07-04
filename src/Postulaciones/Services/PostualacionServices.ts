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

	static async cancelarPostulacion(idPost: string, userId: string) {
    	const owns = await PostulacionRepository.findByIdAndUser(idPost, userId);
    	if (!owns) throw new Error('POST_NOT_FOUND');

    	const deleted = await PostulacionRepository.deleteById(idPost);
    	if (deleted !== 1) throw new Error('DELETE_FAILED');
    	return true;
  	}

	static async listarPostulacionesDeVacante (creatorId: string) {
		return PostulacionRepository.findByVacanteAndCreator(creatorId);
	}

	static async chageStatus (id: string, estado: string)  {
		const updated = await PostulacionRepository.updatePostulacionStatus(id, estado)
		console.log(updated)
		if(!updated) throw new Error('Status Failed');
		return true;
	}
}

export default postulacionServices;