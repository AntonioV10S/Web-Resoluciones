import {createRequire} from 'node:module'
import { YearMesModel } from '../../models/Gestion_mes_year/Year_mes_model.js'
import { YearModel } from '../../models/Gestion_mes_year/Year_model.js'
import {validateMes_year,validatePartialMes_year} from '../../schemas/Gestion_mes_year/mes_year_validate.js'

const require = createRequire(import.meta.url)

export class year_mesController{

    static async getAll(request, res){
        
        try{
            const YearMes = await YearMesModel.findAll({
                include: [{
                    model: YearModel,
                    attributes: ['year']
                }]
            });
            return res.status(200).json({YearMes});
        }catch(error){
            // console.log('Error',error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async create(request,res){
        try{
            const validar = validateMes_year(request.body)
            if(!validar.success){
                return res.status(400).json({ error: JSON.parse(validar.error.message)})
            }    
            // const nuevaCategoria = request.body;
            const result = await YearMesModel.create(validar.data);
            res.status(201).json(result);
        }catch (error){
            res.status(500).json({message:'Internal server error'});
        }
    }

    static async search(request,res){
        try{
          const {id} = request.params;
          const year_mes = await YearMesModel.findByPk(id);
          if(!year_mes){
            return res.status(404).json({ message: 'Registro no encontrado' })
          }
          return res.status(200).json(year_mes);
        }catch(error){
            console.log(error)
          return res.status(500).json({message: 'Internal server error'})
        }
      }
    
      static async update(request,res) { 
        try{ 
            const validar = validatePartialMes_year(request.body);
            if(!validar.success){
                return res.status(400).json({ error: JSON.parse(validar.error.message)})
            }
            const {id} = request.params; 
            // const updateData = request.body;
            const result = await YearMesModel.update(
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
  

}