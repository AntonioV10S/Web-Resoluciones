import z from 'zod'

const ordenanzaSchema = z.object({
    descripcion: z.string(),
    dia_publicacion: z.number().int(),
    estado: z.string(),
    
})