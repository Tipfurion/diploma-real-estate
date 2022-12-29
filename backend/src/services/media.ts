import firebase from '../../db/firebase'
const mediaService = {
    createMedia: async (files: File[]) => {
        console.log('files', files)

        /*    files.map(async (file) => {
            const fileFormat = file.mimetype.split('/')[1]
            const fileName = `${uuid.v4()}.${fileFormat}`
            await storage.bucket(fbStorageImageBucket).file(fileName).save(file.data)
            const loadedFileUrl = (
                await storage.bucket(fbStorageImageBucket).file(fileName).getSignedUrl({
                    action: 'read',
                    expires: '03-09-2491',
                })
            )[0]
            return { name: fileName, url: loadedFileUrl }
        }) */
    },
}
export default mediaService
