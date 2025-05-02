
import IdDto from "../Dto/IdDto";
import TextoDto from "../Dto/TextoDto";
import {ConsultarTexto, DeleteTexto, TextoRepositorio, UpdateTexto} from "../Repository/RepositoryPublicaciones";

class ServiceTexto {
    static async AddTexto (Text:TextoDto) {
        return await TextoRepositorio.AñadirTexto(Text)
    }
    static async UpTexto(id: IdDto, texto:TextoDto) {
        return await UpdateTexto.updateTexto(id, texto);
    }
    static async DeleTexto(id:IdDto){
        return await DeleteTexto.DeleteTexto(id)
    }
    static async GetTexto(id:IdDto){
        return await ConsultarTexto.consultarTexto(id)
    }
    
    

}

export default ServiceTexto;