import { PrismaClient } from '@prisma/client'
const db = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
    ],
})

db.$on('query', async (e) => {
    //console.log(`${e.query} ${e.params}`)
})
export default db
