import { http } from './base'
interface getAdressSuggestionsParams {
    query: string
}
export const getAdressSuggestions = async (params: getAdressSuggestionsParams): Promise<{ data: any; error: any }> => {
    const res = await http.get(`/geo/address/suggest?query=${params.query}`)
    return res.data
}
