import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import bodyParser from 'body-parser'

const app = express()
app.use(cors())
app.use(bodyParser.json({ type: 'application/json' }))




app.listen(4000, () => {
    console.log('listening on 4000')
})