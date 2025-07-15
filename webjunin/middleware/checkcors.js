import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const cors = require('cors')

const ACCEPTED_ORIGINS =  
[
  'http://localhost:4200'  
]
  export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true)
      }
      if (!origin) {
        return callback(null, true)
      }
      return callback(new Error('Not allowed by CORS'))
    }
})