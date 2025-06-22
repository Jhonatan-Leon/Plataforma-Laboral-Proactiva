import  { categoriaDto,codDto } from "../Dto/ConsultaDto"
import RegistrarVacante from "../Dto/VacanteDto"
import  VacanteRepository from "../Repository/VacanteRepository"
import {  subirlogoVacante } from "../../Users/Helpers/BlobServices";

class GestionVacantes{
    static async Add_Vacante(register: RegistrarVacante){
        const logo = register.logo;

        if(logo && typeof logo === 'string' && logo.startsWith('data:image')){
             register.logo = await subirlogoVacante(logo);
        }

        const salario = register.salario_vacante;
        const clean = salario.replace(/[.,]/g, '');

        register.salario_vacante = String(Number(clean));

        return await VacanteRepository.AddVacante(register)
    }
    static async browse_vacant(vacant: codDto){
        return await VacanteRepository.buscar(vacant)
    }
    static async browse_vacant2(vacante: categoriaDto){
        return await VacanteRepository.buscarByCategory(vacante)
    }
    static async Editar_vacant(Edit:RegistrarVacante, vacant:codDto){
       // return await VacanteRepository.updateVacante(vacant,Edit)
    }
    static async Eliminar_vacant(vacant:codDto){
        return await VacanteRepository.deleteVacante(vacant)
    }

    static async obtenerTodas(){
         const vacantes = await VacanteRepository.ObtenerTodosVacantes();

         const result = vacantes.map(({id_usuario, logo, ... rest}) => rest)
         return result;     
    }

    static async obtenerVacantByUser (id: string) {
        const vacantes = await VacanteRepository.obtenerVacanteByUser(id)

        const result = vacantes.map(({id_usuario, logo, ...rest}) => rest)
        return result;
    }

    static async actualizarVacante(id: Number, value: RegistrarVacante ){
        const salario = value.salario_vacante
        const clean = salario.replace(/[.,]/g, '');
        value.salario_vacante = String(Number(clean));
        const updateVacante = await VacanteRepository.updateVacante(id, value)
        const {id_usuario, logo , ...rest } = updateVacante;
        return updateVacante;
    }
}





export default GestionVacantes