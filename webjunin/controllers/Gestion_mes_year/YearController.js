import {createRequire} from 'node:module'
import { YearModel } from '../../models/Gestion_mes_year/Year_model.js'
import { validateyear,validatePartialyear } from '../../schemas/Gestion_mes_year/year_validate.js'
const require = createRequire(import.meta.url)

export class YearController{

    static async getAll(request, res){
        try{
            const years = await YearModel.findAll(
            );
            return res.status(200).json({years});
        }catch(error){
            console.log(error)
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async create(request,res){
        try{
            const validar = validateyear(request.body)
            if(!validar.success){
                return res.status(400).json({ error: JSON.parse(validar.error.message)})
            }    
            // const nuevaCategoria = request.body;
            const result = await YearModel.create(validar.data);
            res.status(201).json(result);
        }catch (error){
            console.log(error)
            res.status(500).json({message:'Internal server error'});
        }
    }

    static async search(request,res){
        try{
          const {id} = request.params;
          const years = await YearModel.findByPk(id);
          if(!years){
            return res.status(404).json({ message: 'Registro no encontrado' })
          }
          return res.status(200).json(years);
        }catch(error){
          return res.status(500).json({message: 'Internal server error'})
        }
      }

      static async update(request,res) { 
        try{ 
            const validar = validatePartialyear(request.body);
            if(!validar.success){
                return res.status(400).json({ error: JSON.parse(validar.error.message)})
            }
            const {id} = request.params; 
            // const updateData = request.body;
            const result = await YearModel.update(
                validar.data,
                {where: {id}}
            );
            if(!result){ 
                return res.status(404).json({ message: 'Registro no encontrado' }); 
            } 
                res.status(200).json({message: 'Registro actualizado correctamente'}); 
        }catch(error) {
            console.log(error)
                res.status(500).json({ message: 'Internal server error' }); 
        } 
    }

}
