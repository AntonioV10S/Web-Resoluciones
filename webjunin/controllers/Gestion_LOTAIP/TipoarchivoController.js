import {createRequire} from 'node:module'
import {TipoArchivoModel} from '../../models/Gestion_LOTAIP/TipoArchivo_model.js'
import {validateTipoArchivo,validatePartialTipoArchivo} from '../../schemas/Gestion_LOTAIP/tipoArchivo_validate.js'

const require = createRequire(import.meta.url)

export class TipoArchivoController{

    static async getAll(request, res) {
    try {
        const tipo_archivos = await TipoArchivoModel.findAll({
            where: { estadoEliminado: false }
        });

        const fechaActual = new Date().toISOString().split('T')[0]; // "2025-07-16"

        return res.status(200).json({
            tipo_archivos,
            fechaActual
        });
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }
    }



        static async create(request, res) {
        try {
            //console.log('📥 Datos recibidos:', request.body);

            const input = {
            ...request.body,
            fechaRegistro: new Date(), 
            estadoEliminado: false
            };
            console.log(input);

            const validar = validateTipoArchivo(input);

            if (!validar.success) {
            console.log('Error de validación:', validar.error);
            return res.status(400).json({
                error: JSON.parse(validar.error.message)
            });
            }

            const result = await TipoArchivoModel.create(validar.data);
            return res.status(201).json(result);

        } catch (error) {
            console.log('Error del servidor:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        }




    static async search(request,res){
        try{
          const {id} = request.params;
          const tipo_archivos = await TipoArchivoModel.findByPk(id);
          if(!categoria){
            return res.status(404).json({ message: 'Registro no encontrado' })
          }
          return res.status(200).json(tipo_archivos);
        }catch(error){
          return res.status(500).json({message: 'Internal server error'})
        }
      }

      static async update(request,res) { 
        try{ 
            const validar = validatePartialTipoArchivo(request.body);
            if(!validar.success){
                return res.status(400).json({ error: JSON.parse(validar.error.message)})
            }
            const {id} = request.params; 
            // const updateData = request.body;
            const result = await TipoArchivoModel.update(
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
            const editEstado = await TipoArchivoModel.update(
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