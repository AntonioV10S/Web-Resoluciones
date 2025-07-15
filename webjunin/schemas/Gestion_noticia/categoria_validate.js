import z from 'zod'

const categoriaSchema = z.object({
    descripcion: z.string().max(200),
})
export function validateCategoria (input) {
    return categoriaSchema.safeParse(input)
}
export function validatePartialCategoria (input){
    return categoriaSchema.partial().safeParse(input);
}

