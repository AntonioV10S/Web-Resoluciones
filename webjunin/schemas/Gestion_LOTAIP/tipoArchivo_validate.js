import z from 'zod'
import { number } from "zod"


const tipoArchivoSchema = z.object({    
    descripcion: z.string(),
    fechaRegistro: z.coerce.date(),
    estadoEliminado: z.boolean(),
    indice: z.number().int(),
    icono_tipo_archivo: z.string()
})
export function validateTipoArchivo (input) {
    return tipoArchivoSchema.safeParse(input)
}
export function validatePartialTipoArchivo (input){
    return tipoArchivoSchema.partial().safeParse(input);
}