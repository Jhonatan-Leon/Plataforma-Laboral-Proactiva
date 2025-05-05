import { Request, Response } from "express";
import connectToDatabase from "../Config/Config-db";

let Subirfoto = async(req:Request, res:Response)=>{
    try{
        const {bucket} = await connectToDatabase();

        if(!req.file){
            return res.status(400).json({message: "No se subio ninguna imagen"});
        }

        const readableStream = require("streamifier").createReadStream(req.file.buffer);

        const uploadStream = bucket.openUploadStream(req.file.originalname, {
            contentType: req.file.mimetype,
        })

        readableStream.pipe(uploadStream)
            .on("error", (error:any) =>{
                console.log("Error subiendo la imagen", error);
                res.status(500).json({message: "Error al subir la imagen"});
            })
            .on("finish", () => {
                res.status(201).json({message: "imagen subida", id:uploadStream.id});
            });
            
            
        }catch (error){
            console.log("Error en subir foto", error);
            res.status(500).json({message : "Error interno del servidor"});   
        }
    };

export default Subirfoto;
