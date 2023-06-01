import { createContext, useReducer, useEffect } from 'react'
import { movieReducer } from '../store/movieReducer'
import axios from 'axios'
import { GET_MOVIE, GET_ALL_MOVIE, ADD_MOVIE, URL, UPDATE_MOVIE, DELETE_MOVIE} from './constants'

export const MovieContext = createContext()

const MovieContextProvider = ({children}) => {
    const [movieState, dispatch] = useReducer(movieReducer, {
        movies: [],
        movie: null
    })

    const getMovie = async (slug) => {
		try {
			const res = await axios.get(`http://${URL}/movie/getmovie/${slug}`)
			if(res.data.success) {
				dispatch ({type: GET_MOVIE, payload: res.data.movie})
				return res.data
			}
		} catch (e){
			console.log('err get MOVIE' + e)
		}
	}
   

    const getMovies = async () => {
		try {
			const res = await axios.get(`http://${URL}/movie/getmovie`)
			if(res.data.success) {
				dispatch ({type: GET_ALL_MOVIE, payload: res.data.movie})
			}
		} catch (e){
			console.log('err get MOVIE' + e)
		}
	} 

	useEffect(() => {
		getMovies()
	}, [])
	
	const addMovie = async (movie) => {
		try {
		
			const res = await axios.post(`http://${URL}/movie/addMovie`, movie)
			
			if(res.data.success) {
				dispatch({type: ADD_MOVIE, payload: res.data.movie})
				return res.data
			}
		} catch {
			
		}
	}

	const editMovie = async (movie, id) => {
		try {
		
			const res = await axios.post(`http://${URL}/movie/editMovie/${id}`, movie)
			
			if(res.data.success) {
				dispatch({type: UPDATE_MOVIE, payload: movie})
			}
		} catch {
			
		}
	}

	const deleteMovie = async (id) => {
		try {
		
			const res = await axios.post(`http://${URL}/movie/deleteMovie`, id)
			
			if(res.data.success) {
				dispatch({type: DELETE_MOVIE, payload: res.data.movie})
				return res.data
			}
		} catch {
			
		}
	}

	const updateRating = async (id, rating) => {
		try {
			const res = await axios.post(`http://${URL}/movie/updaterating/${id}`, rating)
			return res.data
		} catch (err) {
			return err.res.data
		}
	}

    const MovieContextData = { getMovies, getMovie, addMovie, editMovie, deleteMovie, updateRating, movieState}
    return (
        <MovieContext.Provider value={MovieContextData}>
            {children}
        </MovieContext.Provider>
    )
}

export default MovieContextProvider