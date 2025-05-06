import  { categoriaDto,codDto } from "../Dto/ConsultaDto"
import RegistrarVacante from "../Dto/VacanteDto"
import { VacanteRepository, BrowseRepository, UpdateRepository,DeleteRepository, BrowseRepository2 } from "../Repository/VacanteRepository"


class GestionVacantes{
    static async Add_Vacante(register: RegistrarVacante){
        return await VacanteRepository.AddVacante(register)
    }
    static async browse_vacant(vacant: codDto){
        return await BrowseRepository.buscar(vacant)
    }
    static async browse_vacant2(vacante: categoriaDto){
        return await BrowseRepository2.buscar(vacante)
    }
    static async Editar_vacant(Edit:RegistrarVacante, vacant:codDto){
        return await UpdateRepository.updateVacante(vacant,Edit)
    }
    static async Eliminar_vacant(vacant:codDto){
        return await DeleteRepository.deleteVacante(vacant)
    }
}





export default GestionVacantes