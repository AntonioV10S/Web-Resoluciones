import z, { string } from 'zod'
import { number } from "zod"

const yearSchema = z.object({
    year: number().int()
})
export function validateyear (input) {
    return yearSchema.safeParse(input)
}
export function validatePartialyear (input){
    return yearSchema.partial().safeParse(input);
}
