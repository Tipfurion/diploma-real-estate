import _ from 'lodash'
import { http } from './base'

interface getAdressSuggestionsParams {
    query: string
}
interface createPostParams {
    post: any
}
interface getOnePostParams {
    id: number
}
interface getPostComments {
    postId: number
}
interface createCommentParams {}
export const getAdressSuggestions = async (params: getAdressSuggestionsParams): Promise<{ data: any; error: any }> => {
    const res = await http.get(`/geo/address/suggest?query=${params.query}`)
    return res.data
}
export const getOnePost = async (params: getOnePostParams): Promise<{ data: any; error: any }> => {
    const res = await http.get(`/post/get-one?id=${params.id}`)
    return res.data
}
export const createPost = async (params: createPostParams): Promise<{ data: any; error: any }> => {
    const formData = new FormData()
    formData.append('post', JSON.stringify(_.omit(params.post, 'fileList')))
    params.post.fileList.forEach((file: any, i: number) => {
        formData.append(`media-${i}`, file.file)
    })
    const res = await http.post(`/post`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return res.data
}
export const getPostComments = async (params: getPostComments): Promise<{ data: any; error: any }> => {
    const res = await http.get(`/post/comments?postId=${params.postId}`)
    return res.data
}
export const createComment = async (params: createCommentParams): Promise<{ data: any; error: any }> => {
    const res = await http.post('/post/comment', { ...params })
    return res.data
}
