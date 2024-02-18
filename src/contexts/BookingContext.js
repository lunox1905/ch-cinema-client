import axios from 'axios'
import { URL} from './constants'

export const addBooking = async (booking) => {
    try {
        const res = await axios.post(`http://${URL}/booking/add`, booking)
        return res.data
    } catch {
        
    }
}

export const getBookings = async () => {
    try {
        const res = await axios.get(`http://${URL}/booking/getall`)
        return res.data
    } catch {
        
    }
}

export const getBooking = async () => {
    try {
        const res = await axios.get(`http://${URL}/booking/getbooking`)
        return res.data
    } catch {
        
    }
}

export const reservePlace = async ({showTimeId, seat}) => {
    try {
        const res = await axios.post(`http://${URL}/booking/reserve-place`, {showTimeId, seat})
        return res.data
    } catch {
        
    }
}