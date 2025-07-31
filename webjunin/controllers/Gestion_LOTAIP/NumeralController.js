import {createRequire} from 'node:module'
import {NumeralModel} from '../../models/Gestion_LOTAIP/Numeral_model.js'
import { validateNumeral,validatePartialNumeral } from '../../schemas/Gestion_LOTAIP/numeral_validate.js';

const require = createRequire(import.meta.url)

export class NumeralController{

    static async getAll(request, res){
        try{
            const numerals = await NumeralModel.findAll(
                {where: {estadoEliminado: false} }
            );
            return res.status(200).json({numerals});
        }catch(error){
            return res.status(500).json({message: 'Internal server error'});
        }
    }


static async create(request, res) {
  try {
    // Agregamos campos extra antes de validar
    const input = {
  ...request.body,
  articulo: Number(request.body.articulo),
  fechaRegistro: new Date(),
  estadoEliminado: false
};

    console.log(input); // Opcional: para depuración

    const validar = validateNumeral(input);

    if (!validar.success) {
      console.log('Error de validación:', validar.error);
      return res.status(400).json({
        error: JSON.parse(validar.error.message)
      });
    }

    const result = await NumeralModel.create(validar.data);
    return res.status(201).json(result);

  } catch (error) {
    console.log('Error del servidor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


    static async search(request,res){
        console.log(request.body);
        try{
          const {id} = request.params;
          const numerals = await NumeralModel.findByPk(id);
          if(!numerals){
            return res.status(404).json({ message: 'Registro no encontrado' })
          }
          return res.status(200).json(numerals);
        }catch(error){
            console.log(error)
          return res.status(500).json({message: 'Internal server error'})
        }
      }

      static async update(request,res) { 
        try{ 
            const validar = validatePartialNumeral(request.body);
            if(!validar.success){
                return res.status(400).json({ error: JSON.parse(validar.error.message)})
            }
            const {id} = request.params; 
            // const updateData = request.body;
            const result = await NumeralModel.update(
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
            const editEstado = await NumeralModel.update(
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