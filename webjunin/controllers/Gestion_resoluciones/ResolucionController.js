import {createRequire} from 'node:module'
import {Tipo_resolucionModel} from '../../models/Gestion_resoluciones/Tipo_resolucionModel.js'
import {ResolucionModel} from '../../models/Gestion_resoluciones/ResolucionModel.js'
const require= createRequire(import.meta.url)

export class ResolucionController{

    static async getAll(request, res){
        try {
            const Resolucion = await ResolucionModel.findAll({
                where: {estadoEliminado: false},
                attributes: {exclude: ['estadoEliminado','id_tipo_resolucion']},
                include: [{
                    model: Tipo_resolucionModel,
                    attributes: ['descripcion']
                    }]
            });
            return res.status(200).json({Resolucion});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async create(request,res){
        try {
            const Resolucion = await ResolucionModel.create(request.body);
                res.status(201).json(Resolucion);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server error'});
        }
    }

    static async search(request,res){
        try {
            const {id} = request.params;
            const Resolucion = await ResolucionModel.findAll(
                {where: {id:id,estadoEliminado: false}}    
            );
            return res.status(200).json(Resolucion);                
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal server error'});
        }
    }

static async update(request, res) {
  try {
    const { id } = request.params;

    const {
      descripcion,
      estadoEliminado,
      url,
      dia_publicacion,
      id_tipo_resolucion
    } = request.body;

    await ResolucionModel.update(
      { descripcion, estadoEliminado, url, dia_publicacion, id_tipo_resolucion },
      { where: { id } }
    );

    res.status(200).json({ message: 'Resolución actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar resolución:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}


    static async delete(request,res){
            try{
                const {id} = request.params;
                const Resolucion = await ResolucionModel.update(
                    {estadoEliminado: true},
                    {where: {id:id}}
                );
                if(!Resolucion){
                    return res.status(404).json({message: 'Registro no encontrado'});
                }
                    res.status(200).json({message: 'Registro eliminado correctamente'});
            }catch(error){
                console.log(error);
                res.status(500).json({message: 'Internal server error'});
            }
    }

}