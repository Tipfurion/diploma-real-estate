import db from '../db/db'

async function main() {
    const alreadyExists = await db.user.findFirst({
        where: { phoneNumber: '+2121312' },
    })
    console.log('alreadyExists', alreadyExists)
}
main()
