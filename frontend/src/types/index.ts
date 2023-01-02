export interface Post {
    id: number
    ownerId: number
    address: string
    country: string
    city: string
    flat: number
    floor: number
    maxFloor: number
    geoLat: string
    geoLon: string
    house: string
    name: string
    description: '1'
    price: number
    pricePeriod: 'day' | 'month'
    rooms: string
    square: number
    type: 'rent' | 'sell'
    createdAt: string
    updatedAt: null | string
    deletedAt: null | string
    owner: User
    media: Media[]
}
export interface User {
    id: number
    phoneNumber: string
    email: null | string
    name: null | string
    createdAt: string
    updatedAt: null | string
    deletedAt: null | string
}
export interface Media {
    id: number
    url: string
    postId: number
    createdAt: null | string
    updatedAt: null | string
    deletedAt: null
}
