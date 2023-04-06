import { createContext, useReducer, useEffect } from 'react'
import { cinemaReducer } from '../store/cinemaReducer'
import axios from 'axios'
import { GET_CINEMA, ADD_CINEMA, URL, UPDATE_CINEMA, DELETE_CINEMA} from './constants'

export const CinemaContext = createContext()

const CinemaContextProvider = ({children}) => {
    const [cinemaState, dispatch] = useReducer(cinemaReducer, {
        cinemas: [],
    })

    const getCinema = async (slug) => {
		try {
			const res = await axios.get(`http://${URL}/cinema/getcinema/${slug}`)
			if(res.data.success) {
				return res.data
			}
		} catch (e){
			console.log('err get cinema' + e)
		}
	}
   
    const getCinemas = async () => {
		try {
			const res = await axios.get(`http://${URL}/cinema/getcinema`)
			if(res.data.success) {
				dispatch ({type: GET_CINEMA, payload: res.data.cinema})
			}
		} catch (e){
			console.log('err get Cinema' + e)
		}
	}

	useEffect(() => {
		getCinemas()
	}, [])
	
	const addCinema = async (cinema) => {
		try {
		
			const res = await axios.post(`http://${URL}/cinema/addcinema`, cinema)
			
			if(res.data.success) {
				dispatch({type: ADD_CINEMA, payload: res.data.cinema})
				return true
			}
		} catch {
			
		}
	}

	const editCinema = async (cinema, id) => {
		try {
		
			const res = await axios.post(`http://${URL}/cinema/editcinema/${id}`, cinema)
			
			if(res.data.success) {
				dispatch({type: UPDATE_CINEMA, payload: cinema})
				return true
			}
		} catch {
			
		}
	}

	const deleteCinema = async (id) => {
		try {
		
			const res = await axios.post(`http://${URL}/cinema/deletecinema`, id)
			
			if(res.data.success) {
				dispatch({type: DELETE_CINEMA, payload: id})
				return res
			}
		} catch {
			
		}
	}

    const CinemaContextData = { getCinemas, getCinema, addCinema, editCinema, deleteCinema, cinemaState}
    return (
        <CinemaContext.Provider value={CinemaContextData}>
            {children}
        </CinemaContext.Provider>
    )
}

export default CinemaContextProvider