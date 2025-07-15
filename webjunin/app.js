import { createRequire } from 'node:module'
import express, { json } from 'express'
import {ApiRouter} from './routes/api_routes.js'
import { corsMiddleware } from './middleware/checkcors.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

const require = createRequire(import.meta.url)
//const express = require('express')
 

require('dotenv').config();
const app = express()
app.use(corsMiddleware())
app.use(cookieParser())
app.disable('x-powered-by') 
app.use(json())
app.use('/api/',ApiRouter)
app.use(bodyParser.json())


app.listen(process.env.PORT,() =>{
    console.log(`server listening on port ${process.env.SERVER_IP}:${process.env.PORT}`)
})