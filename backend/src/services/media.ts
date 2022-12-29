import firebase from '../../db/firebase'
import { v4 as uuidv4 } from 'uuid'
const BUCKET_NAME = process.env.FB_BUCKET_NAME
const mediaService = {
    createMedia: async (files: any[]) => {
        const uploadedFiles = await Promise.all(
            files.map(async (file) => {
                const fileFormat = file.mimetype.split('/')[1]
                const fileName = `${uuidv4()}.${fileFormat}`
                await firebase.storage().bucket(BUCKET_NAME).file(fileName).save(file.data)
                const loadedFileUrl = (
                    await firebase.storage().bucket(BUCKET_NAME).file(fileName).getSignedUrl({
                        action: 'read',
                        expires: '03-09-2491',
                    })
                )[0]
                return { name: fileName, url: loadedFileUrl }
            })
        )
        return uploadedFiles
    },
}
export default mediaService
