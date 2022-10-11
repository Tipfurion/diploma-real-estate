import db from '../db/db'
import jwt from 'jsonwebtoken'
async function main() {
    const PRIVATE_KEY = 'dsadsadsadsa'
    const token = jwt.sign({ a: 2 }, PRIVATE_KEY as string, {
        expiresIn: '8760h',
    })
    const decoded = jwt.verify(token, PRIVATE_KEY)
    console.log('decoded', decoded)
}
main()
