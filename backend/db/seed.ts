import db from './db'
import _ from 'lodash'
async function createUsers() {
    const defaultPassword = {
        password: 'qwerty123',
        hash: '$2a$10$zZnTjLEEJy0FRUe2pvtRKuSMh1giDY/gWzMNdCwpCYhJi70KX0tvm',
    }
    const users = [
        {
            phoneNumber: '+78005553535',
            passwordHash: defaultPassword.hash,
            email: 'user1@mail.ru',
            name: 'Анатолий',
        },
        {
            phoneNumber: '+78005553536',
            passwordHash: defaultPassword.hash,
            email: 'user2@mail.ru',
            name: 'Борис',
        },
        {
            phoneNumber: '+78005553537',
            passwordHash: defaultPassword.hash,
            email: 'user3@mail.ru',
            name: 'Анна',
        },
    ]
    return await db.$transaction(users.map((user) => db.user.create({ data: user })))
}
async function createPosts(createdUsers: any) {
    const posts = [
        {
            type: 'sell',
            address: 'г Курск, ул Ленина, зд 12',
            country: 'Россия',
            city: 'Курск',
            house: '12',
            geoLat: '51.733673',
            geoLon: '36.192505',
            flat: 12,
            rooms: '2',
            square: 56,
            floor: 3,
            maxFloor: 5,
            price: 6000000,
            pricePeriod: null,
            name: 'Название',
            description:
                'Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание Описание ',
            userId: createdUsers[0].id,
            media: [
                { url: 'https://cdn-p.cian.site/images/20/479/241/kvartira-murino-petrovskiy-bulvar-1429740287-1.jpg' },
                { url: 'https://cdn-p.cian.site/images/20/479/241/kvartira-murino-petrovskiy-bulvar-1429740281-1.jpg' },
                { url: 'https://cdn-p.cian.site/images/95/768/341/kvartira-murino-petrovskiy-bulvar-1438675995-1.jpg' },
                { url: 'https://cdn-p.cian.site/images/01/479/241/kvartira-murino-petrovskiy-bulvar-1429741055-1.jpg' },
            ],
        },
    ]
    Promise.all(
        posts.map(async (post) => {
            const createdPost = await db.post.create({
                data: { ...(_.omit(post, ['userId', 'media']) as any), owner: { connect: { id: post.userId } } },
            })
            await db.media.createMany({
                data: post.media.map((media) => ({ url: media.url, postId: createdPost.id })) as any,
            })
        })
    )
}

async function seed() {
    const createdUsers = await createUsers()
    await createPosts(createdUsers)
    console.log('seed finished')
}
seed()
