import { ObjectId } from "mongodb";
import connectToDatabase from "../config/config-db";
import IdDto from "../Dto/IdDto";
import TextoDto from "../Dto/TextoDto";


class TextoRepositorio {
    static async AñadirTexto(texto:TextoDto) {
        const db = await connectToDatabase(); 
        const documento ={
            texto
        } 
        const values = await db.collection("Texto").insertOne(documento);
        return  values
    }
}
class UpdateTexto{
    static async updateTexto(id:IdDto, texto:TextoDto){
        const db = await connectToDatabase();
        const filter = {
            _id: new ObjectId(id.id) 
        }
        const update = {
            $set: { texto } 
        };
        const values = await db.collection("Texto").updateOne(filter, update)
        return values
    }
}

class DeleteTexto{
    static async DeleteTexto(id:IdDto){
        const db = await connectToDatabase();
        const deleteT ={
            _id: new ObjectId(id.id)
        }
        const values = await db.collection("Texto").deleteOne(deleteT)
        return values
    }
}


class ConsultarTexto{
    static async consultarTexto(id:IdDto){
        const db = await connectToDatabase();
        const consultarT ={
            _id: new ObjectId(id.id)
        }
        const values = await db.collection("Texto").findOne(consultarT)
        return values
    }
}
export {TextoRepositorio, UpdateTexto, DeleteTexto, ConsultarTexto};
