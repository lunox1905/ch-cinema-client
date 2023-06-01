import { createContext } from "react";
import { URL } from "./constants";
import axios from "axios";

export const ShowTimeContext = createContext()

const ShowTimeProvider = ({children}) => {
    const getShowTimes = async () => {
        try {
		
			const res = await axios.get(`http://${URL}/showtime/getshowtimes`)
			return res.data
		} catch {
			
		}
    }

    const getShowTime = async (id) => {
        try {
			const res = await axios.get(`http://${URL}/showtime/getshowtime/${id}`)
			
			if(res.data.success) {
				return res.data
			}
		} catch {
			
		}
    }

    const getShowTimeByMovie = async (id) => {
        try {
		
			const res = await axios.get(`http://${URL}/showtime/getShowTimeByMovie/${id}`)
			return res.data
		} catch {
			
		}
    }

    const getShowTimeByCinema = async (id) => {
        try {
		
			const res = await axios.get(`http://${URL}/showtime/getShowTimeByCinema/${id}`)
			return res.data
		} catch {
			
		}
    }

    const addShowTime = async (showTime) => {
        try {
		
			const res = await axios.post(`http://${URL}/showtime/addShowTime`,showTime)
			
			if(res.data.success) {
				return res.data
			}
		} catch {
			
		}
    }

    const deleteShowTime = async (id) => {
        try {
		
			const res = await axios.post(`http://${URL}/showtime/deleteShowTime/`,id)
			console.log(id)
			return res.data
		} catch {
			
		}
    }

    const editShowTime = async (id, showTime) => {
        try {
		
			const res = await axios.post(`http://${URL}/showtime/editShowTime/${id}`,showTime)
			
			if(res.data.success) {
				return res.data
			}
		} catch {
			
		}
    }

    const ShowTimeContextData = { getShowTime, addShowTime, editShowTime, deleteShowTime,
        getShowTimes, getShowTimeByCinema, getShowTimeByMovie }
    return (
        <ShowTimeContext.Provider value={ShowTimeContextData}>
            {children}
        </ShowTimeContext.Provider>
    )
}

export default ShowTimeProvider