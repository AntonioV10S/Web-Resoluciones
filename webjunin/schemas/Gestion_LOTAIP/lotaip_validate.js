import z from 'zod'
import { number } from "zod"

const lotaipSchema = z.object({
    url: z.string().url(),
    fechaRegistro: z.coerce.date(),
    estadoEliminado: z.boolean(),
    id_numeral: z.number().int(),
    id_year_mes: z.number().int(),
    id_tipo_archivo: z.number().int()
    
})
export function validatelotaip (input) {
    return lotaipSchema.safeParse(input)
}
export function validatePartiallotaip (input){
    return lotaipSchema.partial().safeParse(input);
}
