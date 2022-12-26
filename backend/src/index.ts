require('dotenv').config()
import authRouter from './routes/auth'
import geoRouter from './routes/geo'
import postRouter from './routes/post'
async function main() {
    const express = require('express')
    const cors = require('cors')
    const app = express()
    app.use(cors())
    app.use(express.json({ limit: '2mb' }))
    app.use('/auth', authRouter)
    app.use('/geo', geoRouter)
    app.use('/post', postRouter)

    app.listen(3000)
}

main()
