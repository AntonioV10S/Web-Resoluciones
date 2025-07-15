import { createRequire } from "node:module";
import { Tipo_BoletinModel } from "../../models/Gestion_boletin/Tipo_boletinModel.js";
import { BoletinModel } from "../../models/Gestion_boletin/BoletinModel.js";

const require = createRequire(import.meta.url)

export class BoletinController{

    static async getAll(request, res){
                try {
                    const Boletines = await BoletinModel.findAll({
                        where: {estadoEliminado: false},
                        include: [{
                            model: Tipo_BoletinModel,
                            attributes: ['descripcion']
                        }]
                    });
                    return res.status(200).json({Boletines});
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({message: 'Internal server error'});
                }
            }
    
            static async create(request,res){
                try {
                    const Boletines = await BoletinModel.create(request.body);
                        res.status(201).json(Boletines);
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message: 'Internal server error'});
                }
            }
    
            static async search(request,res){
                try {
                    const {id} = request.params;
                    const Boletines = await BoletinModel.findAll(
                        {where: {id:id,estadoEliminado: false}}    
                    );
                    return res.status(200).json(Boletines);                
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({message: 'Internal server error'});
                }
            }
    
            static async update(request,res){
                try {
                    const {id} = request.params;
                    const Boletines = await BoletinModel.update(
                        request.body,
                        {where: {id}}    
                    );
                    res.status(200).json({message:'Registro actualizado'})
                } catch (error) {
                    console.log(error)
                    res.status(500).json({message:'Internal server error'})
                }
            }
    
            static async delete(request,res){
                    try{
                        const {id} = request.params;
                        const Boletines = await BoletinModel.update(
                            {estadoEliminado: true},
                            {where: {id:id}}
                        );
                        if(!Boletines){
                            return res.status(404).json({message: 'Registro no encontrado'});
                        }
                            res.status(200).json({message: 'Registro eliminado correctamente'});
                    }catch(error){
                        console.log(error);
                        res.status(500).json({message: 'Internal server error'});
                    }
                }

}