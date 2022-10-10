require('dotenv').config()
async function main() {
    const express = require('express')
    const cors = require('cors')
    const app = express()
    app.use(cors())
    app.use(express.json({ limit: '2mb' }))
}

main()
