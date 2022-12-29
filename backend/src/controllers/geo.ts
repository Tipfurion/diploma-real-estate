import { Request, Response } from 'express'
import * as _ from 'lodash'
import axios from 'axios'
const geoController = {
    getAddressSuggestions: async (req: Request, res: Response) => {
        try {
            let { query } = req.query
            const suggestions = await axios('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
                method: 'POST',
                headers: {
                    Authorization: `Token ${process.env.DADATA_TOKEN}}`,
                },
                data: { query, from_bound: { value: 'country' }, to_bound: { value: 'house' } },
            }).then((r) => r.data?.suggestions)
            return res.json({
                error: null,
                data: suggestions,
            })
        } catch (err) {
            console.error('error', err)
            return res.status(500).json({
                error: { message: 'internal server error' },
                data: null,
            })
        }
    },
}
export default geoController
