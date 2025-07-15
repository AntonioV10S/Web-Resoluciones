import z from 'zod'

const noticiaSchema = z.object({
    id_categoria: z.number().int(),
    titular: z.string(),
    titulo: z.string(),
    cuerpo: z.string(),
    img_portada: z.string(),
    img_cuerpo: z.string(),
    lugar_noticia: z.string(),
    fecha_publicacion: z.coerce.date(),
    num_visualizaciones: z.number.int(),
    estado: z.string(),
})

export function validateNoticia(input){
    return noticiaSchema.safeParse(input)
}
export function validateNoticia(input){
    return noticiaSchema.partial().safeParse(input)
}