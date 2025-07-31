import { createRequire } from 'node:module'
import { LotaipModel } from '../../models/Gestion_LOTAIP/Lotaip_model.js'
import { TipoArchivoModel } from '../../models/Gestion_LOTAIP/TipoArchivo_model.js'
import { NumeralModel } from '../../models/Gestion_LOTAIP/Numeral_model.js'
import { YearMesModel } from '../../models/Gestion_mes_year/Year_mes_model.js'
import { validatelotaip,validatePartiallotaip } from '../../schemas/Gestion_LOTAIP/lotaip_validate.js'

const require = createRequire(import.meta.url)

export class LotaipController{ 

    static async getAll(request, res){
        try{
            const lotaip = await LotaipModel.findAll({
                where: {estadoEliminado: false}, 
                attributes: { exclude: ['estadoEliminado','id_tipo_archivo','id_numeral','id_year_mes'] },
                include: [{
                    model: TipoArchivoModel,
                    attributes:['descripcion']
                },{
                    model: NumeralModel,
                    attributes: ['descripcion']
                },{
                    model: YearMesModel,
                    attributes: ['mes','id_year']
                }],
            }
            );
            return res.status(200).json({lotaip});
        }catch(error){
            return res.status(500).json({message: 'Internal server error'});
        }
    }

static async create(request, res) {
  try {
    // Construimos input con campos extra y conversiones si hace falta
    const input = {
      ...request.body,
      id_year_mes: Number(request.body.id_year_mes),
      id_tipo_archivo: Number(request.body.id_tipo_archivo),
      id_numeral: Number(request.body.id_numeral),
      fechaRegistro: new Date(),
      estadoEliminado: false
    };

    console.log(input); // Para depuración

    const validar = validatelotaip(input);

    if (!validar.success) {
      console.log('Error de validación:', validar.error);
      return res.status(400).json({
        error: JSON.parse(validar.error.message)
      });
    }

    const result = await LotaipModel.create(validar.data);
    return res.status(201).json(result);

  } catch (error) {
    console.log('Error del servidor:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


    static async search(request,res){
        try{
          const {id} = request.params;
          const lotaip = await LotaipModel.findByPk(id);
          if(!lotaip){
            return res.status(404).json({ message: 'Registro no encontrado' })
          }
          return res.status(200).json(lotaip);
        }catch(error){
            console.log(error);
          return res.status(500).json({message: 'Internal server error'})
        }
      }

      static async update(request,res) { 
        try{ 
            const validar = validatePartiallotaip(request.body);
            if(!validar.success){
                return res.status(400).json({ error: JSON.parse(validar.error.message)})
            }
            const {id} = request.params; 
            // const updateData = request.body;
            const result = await LotaipModel.update(
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
            const editEstado = await LotaipModel.update(
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