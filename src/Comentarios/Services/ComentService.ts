import Comentario from "../Dto/ComentarioDto";
import codDto from "../Dto/IdDto";
import {ComentarioRepositorio, GetComent, UpdateComent, DeleteComent} from "../Repository/RepositoryComent";

class ServiceComent {
    static async AddComent (coment:Comentario) {
        return await ComentarioRepositorio.add(coment)
    }
    static async GetComent (coment:codDto ) {
        return await GetComent.getComent(coment)
    }
    static async UpComent (coment:Comentario, id:codDto) {
        return await UpdateComent.updateComent(id,coment)
    }
    static async DeleteComent (id:codDto) {
        return await DeleteComent.deleteComent(id)
    }


}

export default ServiceComent;