import {createRequire} from 'node:module'
import {Tipo_resolucionModel} from '../../models/Gestion_resoluciones/Tipo_resolucionModel.js';
const require = createRequire(import.meta.url)

export class TipoResolucionController{
 
        static async getAll(request, res){
            try {
                const TipoResoluciones = await Tipo_resolucionModel.findAll({
                    where: {estadoEliminado: false}
                });
                return res.status(200).json({TipoResoluciones});
            } catch (error) {
                console.log(error);
                return res.status(500).json({message: 'Internal server error'});
            }
        }

        static async create(request,res){
            try {
                const TipoResoluciones = await Tipo_resolucionModel.create(request.body);
                    res.status(201).json(TipoResoluciones);
            } catch (error) {
                console.log(error);
                res.status(500).json({message: 'Internal server error'});
            }
        }

        static async search(request,res){
            try {
                const {id} = request.params;
                const TipoResoluciones = await Tipo_resolucionModel.findAll(
                    {where: {id:id,estadoEliminado: false}}    
                );
                return res.status(200).json(TipoResoluciones);                
            } catch (error) {
                console.log(error);
                return res.status(500).json({message: 'Internal server error'});
            }
        }

        static async update(request, res) {
            try {
                const { id } = request.params;
                const { descripcion, estadoEliminado, fechaActualizacion } = request.body;

                await Tipo_resolucionModel.update(
                { descripcion, estadoEliminado, fechaActualizacion },
                { where: { id } }
                );

                res.status(200).json({ message: 'Registro actualizado correctamente' });
            } catch (error) {
                console.error('Error al actualizar:', error);
                res.status(500).json({ message: 'Error interno del servidor' });
            }
        }


        static async delete(request,res){
                try{
                    const {id} = request.params;
                    const TipoResoluciones = await Tipo_resolucionModel.update(
                        {estadoEliminado: true},
                        {where: {id:id}}
                    );
                    if(!TipoResoluciones){
                        return res.status(404).json({message: 'Registro no encontrado'});
                    }
                        res.status(200).json({message: 'Registro eliminado correctamente'});
                }catch(error){
                    console.log(error);
                    res.status(500).json({message: 'Internal server error'});
                }
            }

}