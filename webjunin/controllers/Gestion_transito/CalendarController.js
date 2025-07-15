import {createRequire} from 'node:module'
import {CalendarModel} from '../../models/Gestion_transito/CalendarModel.js'
const require =  createRequire(import.meta.url)

export class CalendarController{
    static async getAll(request,res){
        try {
            const CalendarTran = await CalendarModel.findAll({
                where: {estadoEliminado: false}
            });
            return res.status(200).json({CalendarTran});
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: 'Internal server error'});            
        }
    }
    static async create(request,res){
        try {
            const CalendarTran = await CalendarModel.create(request.body);
            res.status(201).json(CalendarTran);
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server error'});
        }
        }
    
    static async search(request,res){
                try {
                    const {id} = request.params;
                    const CalendarTran = await CalendarModel.findAll(
                        {where: {id:id,estadoEliminado: false}}    
                    );
                    return res.status(200).json(CalendarTran);                
                } catch (error) {
                    console.log(error);
                    return res.status(500).json({message: 'Internal server error'});
                }
            }
    
            static async update(request,res){
                try {
                    const {id} = request.params;
                    const CalendarTran = await CalendarModel.update(
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
                        const CalendarTran = await CalendarModel.update(
                            {estadoEliminado: true},
                            {where: {id:id}}
                        );
                        if(!CalendarTran){
                            return res.status(404).json({message: 'Registro no encontrado'});
                        }
                            res.status(200).json({message: 'Registro eliminado correctamente'});
                    }catch(error){
                        console.log(error);
                        res.status(500).json({message: 'Internal server error'});
                    }
                }
}