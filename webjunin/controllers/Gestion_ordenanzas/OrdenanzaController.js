import {createRequire} from 'node:module'
import { CategoriaOrdenanzaModel } from '../../models/Gestion_ordenanzas/Categoria_ordenanzaModel.js'
import { YearMesModel } from '../../models/Gestion_mes_year/Year_mes_model.js'
import { OrdenanzasModel } from '../../models/Gestion_ordenanzas/OrdenanzaModel.js'
const require = createRequire(import.meta.url)

export class OrdenanzaController{
    
    static async getAll(request, res){
        try {
            const Ordenanza = await OrdenanzasModel.findAll({
                where: {estadoEliminado: false},

                include: [{
                    model: CategoriaOrdenanzaModel,
                    attributes:['descripcion']
                },{
                    model: YearMesModel,
                    attributes:['mes','id_year']
                }],
            }); 
                return res.status(200).json({Ordenanza});
        } catch (error) {
                console.log(error);
                return res.status(500).json({message: 'Internal server error'});
        }
    }

    static async create(request, res){
    try {
        console.log('BODY RECIBIDO:', request.body); 

        const Ordenanza = await OrdenanzasModel.create(request.body);
        res.status(201).json(Ordenanza);
    } catch (error) {
        console.log('ERROR:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}


    static async search(request, res){
        try {
            const {id} = request.params;
            const Ordenanza = await OrdenanzasModel.findAll(
                {where: {id:id, estadoEliminado:false}}
            );
            return res.status(200).json(Ordenanza);
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internar server error'});
        }
    }

    static async update(request, res) {
    try {
        const { id } = request.params;
        const { id: _, ...updateData } = request.body;
        const updated = await OrdenanzasModel.update(updateData, {
        where: { id }
        });
        res.status(200).json({ message: 'Registro actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar ordenanza:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    }


    static async delete(request,res){
            try{
                const {id} = request.params;
                const Ordenanza = await OrdenanzasModel.update(
                    {estadoEliminado: true},
                    {where: {id:id}}
                );
                res.status(200).json({message: 'Registro eliminado correctamente'});
            }catch(error){
                console.log(error);
                res.status(500).json({message: 'Internal server error'});
            }
    }

}