import {createRequire} from 'node:module'
import { CategoriaOrdenanzaModel } from '../../models/Gestion_ordenanzas/Categoria_ordenanzaModel.js'

const require = createRequire(import.meta.url)

export class Categoria_OrdenazaController{

        static async getAll(request, res){
            try {
                const CategoriaOrd = await CategoriaOrdenanzaModel.findAll({
                    where: {estadoEliminado: false}
                });
                return res.status(200).json({CategoriaOrd});
            } catch (error) {
                console.log(error);
                return res.status(500).json({message: 'Internal server error'});
            }
        }

        static async create(request,res){
            try {
                const CategoriaOrd = await CategoriaOrdenanzaModel.create(request.body);
                res.status(201).json(CategoriaOrd);
            } catch (error) {
                console.log(error);
                res.status(500).json({message: 'Internal server error'});
            }
        }

        static async search(request,res){
            try {
                const {id} = request.params;
                const CategoriaOrd = await CategoriaOrdenanzaModel.findAll(

                    {where: {id:id,estadoEliminado: false}}    
                );
                return res.status(200).json(CategoriaOrd);                
            } catch (error) {
                console.log(error);
                return res.status(500).json({message: 'Internal server error'});
            }
        }

        static async update(request, res) {
  try {
    const { id } = request.params;
    const { nombre, estadoEliminado, fechaActualizacion } = request.body;

    await Tipo_resolucionModel.update(
      { nombre, estadoEliminado, fechaActualizacion },
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
                    const editEstado = await CategoriaOrdenanzaModel.update(
                        {estadoEliminado: true},
                        {where: {id:id}}
                    );
                    if(!editEstado){
                        return res.status(404).json({message: 'Registro no encontrado'});
                    }
                        res.status(200).json({message: 'Registro eliminado correctamente'});
                }catch(error){
                    console.log(error);
                    res.status(500).json({message: 'Internal server error'});
                }
            }
}