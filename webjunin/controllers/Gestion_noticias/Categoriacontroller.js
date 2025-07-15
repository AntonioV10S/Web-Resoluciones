import {createRequire} from 'node:module'
import {CategoriaModel} from '../../models/Gestion_noticias/Categorias_model.js'
import {validateCategoria,validatePartialCategoria} from "../../schemas/Gestion_noticia/categoria_validate.js"

const require = createRequire(import.meta.url)

export class CategoriaController{

    static async getAll(request, res){
        try{
            const categorias = await CategoriaModel.findAll(
                {where: {estadoEliminado: false} }
            );
            return res.status(200).json({categorias});
        }catch(error){
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async create(request,res){
        try{
            const validar = validateCategoria(request.body)
            if(!validar.success){
                return res.status(400).json({ error: JSON.parse(validar.error.message)})
            }    
            // const nuevaCategoria = request.body;
            const result = await CategoriaModel.create(validar.data);
            res.status(201).json(result);
        }catch (error){
            res.status(500).json({message:'Internal server error'});
        }
    }

    static async search(request,res){
        try{
          const {id} = request.params;
          const categoria = await CategoriaModel.findByPk(id);
          if(!categoria){
            return res.status(404).json({ message: 'Registro no encontrado' })
          }
          return res.status(200).json(categoria);
        }catch(error){
          return res.status(500).json({message: 'Internal server error'})
        }
      }

    static async update(request,res) { 
        try{ 
            const validar = validatePartialCategoria(request.body);
            if(!validar.success){
                return res.status(400).json({ error: JSON.parse(validar.error.message)})
            }
            const {id} = request.params; 
            // const updateData = request.body;
            const result = await CategoriaModel.update(
                validar.data,
                {where: {id}}
            );
            if(!result){ 
                return res.status(404).json({ message: 'Registro no encontrado' }); 
            } 
                res.status(200).json({message: 'Registro actualizado correctamente'}); 
        }catch(error) {
                res.status(500).json({ message: 'Internal server error' }); 
        } 
    }

    static async delete(request,res){
        try{
            const {id} = request.params;
            const editEstado = await CategoriaModel.update(
                {estadoEliminado: true},
                {where: {id:id}}
            );
            if(!editEstado){
                return res.status(404).json({message: 'Registro no encontrado'});
            }
                res.status(200).json({message: 'Registro eliminado correctamente'});
        }catch(error){
            // console.log(error);
                res.status(500).json({message: 'Internal server error'});
        }
    }
}