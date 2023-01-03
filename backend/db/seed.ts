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
    const defaultDescription = `Большинство наших квартир можно посмотреть без собственника в любое удобное для вас время: вы бронируете время просмотра, забираете ключи из сейфа и спокойно осматриваете квартиру. Всю сделку мы оформляем электронно  это так же безопасно, как бумажный договор, но намного проще и удобнее.

    Сдаётся светлая квартира-студия с балконом и евроремонтом в ЖК Десяткино. Можно разбить депозит на 3 месяца равными платежами. Коммунальные платежи и счётчики оплачиваются отдельно. Полы  ламинат и плитка. Квартира оснащена кухонным гарнитуром, всей необходимой мебелью и бытовой техникой. Есть плита, стиральная машина, телевизор и холодильник. Интернет проведён, есть роутер. Можно обсудить покупку дополнительной мебели в счёт аренды или вывезти часть уже имеющейся. Окна выходят на улицу. 
    
    В 12 минутах пешком  м. Девяткино. Автомобилистам будет удобно выезжать на КАД. 
    
    Собственник готов заселить не более 3 взрослых жильцов с детьми. С домашним питомцем нельзя. 
    
    Около дома есть бесплатная парковка. Дом расположен в районе с развитой инфраструктурой, в пешей доступности находятся: школа, детский сад, продуктовые супермаркеты, аптеки, салон красоты, стоматология, кафе. Недалеко  лесной массив.`
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
            description: defaultDescription,
            userId: createdUsers[0].id,
            media: [
                { url: 'https://cdn-p.cian.site/images/20/479/241/kvartira-murino-petrovskiy-bulvar-1429740287-1.jpg' },
                { url: 'https://cdn-p.cian.site/images/20/479/241/kvartira-murino-petrovskiy-bulvar-1429740281-1.jpg' },
                { url: 'https://cdn-p.cian.site/images/95/768/341/kvartira-murino-petrovskiy-bulvar-1438675995-1.jpg' },
                { url: 'https://cdn-p.cian.site/images/01/479/241/kvartira-murino-petrovskiy-bulvar-1429741055-1.jpg' },
            ],
        },
        {
            type: 'rent',
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
            price: 20000,
            pricePeriod: 'month',
            name: 'Название 2',
            description: defaultDescription,
            userId: createdUsers[1].id,
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
