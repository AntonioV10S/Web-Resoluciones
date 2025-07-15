import {createRequire} from 'node:module'
import {CategoriaModel} from '../../models/Gestion_noticias/Categorias_model.js';
import {NoticiasModel} from '../../models/Gestion_noticias/Noticias_model.js';
const require = createRequire(import.meta.url)
import {uploadImage} from '../../libs/storage.js';
import { request } from 'node:http';
const path = require('path');

// const uploadImage = require('../libs/storage')

export class NoticiaController{

    static async getAll(request, res){
        
        try{
            const noticias = await NoticiasModel.findAll({
                where: {estadoEliminado: false},
                include: [{
                    model: CategoriaModel,
                    attributes: ['descripcion']
                }]
            });
            return res.status(200).json({noticias});
        }catch(error){
            // console.log('Error',error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async create(request,res){
        try{

            // const nuevoUsuario = request.body;
            const {
            id_categoria,
            titular,
            titulo,
            cuerpo,
            img_cuerpo,
            lugar_noticia,
            fecha_publicacion,
            num_visualizaciones,
            estado,
            estadoEliminado,
            fechaRegistro,
            } = request.body;

            const img_portada = request.file ? request.file.path : null;
            
            //falta guardar la imagen 
            //se esta usando la libreria multer para intentar guardar
            const result = await NoticiasModel.create({
                id_categoria,
                titular,
                titulo,
                cuerpo,
                img_portada,
                img_cuerpo,
                lugar_noticia,
                fecha_publicacion,
                num_visualizaciones,
                estado,
                estadoEliminado,
                fechaRegistro,
            });
            // nuevoUsuario);
            
            res.status(201).json(result);
        }catch (error){
            console.log(error);
            res.status(500).json({message:'Internal server error'});
        }
    }

    static async search(request,res){
    try{
        const {id} = request.params;
        const noticia = await NoticiasModel.findByPk(id);
        if(!noticia){
            return res.status(404).json({message: 'Registro no encontrado'})
        }
        return res.status(200).json(noticia);
    }catch(error){
        console.log(error);
        return res.status(500).json({message: 'Internal server error'})
    }
    }

    static async update(request,res){
        try{
            
        }catch{

        }
    }

    static async delete(request,res){
        try{
            const {id} = request.params;
            const editEstado = await NoticiasModel.update(
                {estadoEliminado: true},
                {where: {id:id}}
            );
            if(!editEstado){
                return res.status(404).json({message: 'Registro no encontrado'});
            }
                res.status(200).json({message: 'Registro eliminado correctamente'});
        }catch(error){
            res.status(500).json({message: 'Internal server error'});
        }
    }
}