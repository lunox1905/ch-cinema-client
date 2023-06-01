import axios from 'axios'
import { URL} from './constants'
export const getAmountUser = async () => {
    const res = await axios.get(`http://${URL}/getAmountUser`)
    return res.data
}