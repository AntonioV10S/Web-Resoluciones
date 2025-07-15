import z from 'zod'

const mes_yearSchema = z.object({
    mes: z.string(),
    id_year: z.number().int()
})
export function validateMes_year (input) {
    return mes_yearSchema.safeParse(input)
}
export function validatePartialMes_year (input){
    return mes_yearSchema.partial().safeParse(input);
}
