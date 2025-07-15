import z, { boolean } from 'zod'
import { number } from "zod"


const numeralSchema = z.object({
    descripcion: z.string(),
    articulo: z.number().int(),
    indice: z.number().int(),
    fechaRegistro: z.coerce.date(),
    estadoEliminado: z.boolean()
}) 

export function validateNumeral (input){
    return numeralSchema.safeParse(input);
}

export function validatePartialNumeral(input){
    return numeralSchema.partial().safeParse(input);
}