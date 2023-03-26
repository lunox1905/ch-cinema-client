import { UPDATE_MOVIE, GET_ALL_MOVIE, GET_MOVIE, ADD_MOVIE, DELETE_MOVIE} from "../contexts/constants"

export const movieReducer = (state, action) => {
    const { type, payload} = action
    switch(type) {
        case GET_MOVIE:
            return {
                ...state,
                movie: payload
            }
        case GET_ALL_MOVIE:
            return {
                ...state,
                movies: payload
            }
        case ADD_MOVIE:
            return {
                ...state,
                movies: [...state.movies, payload]
            }
        case UPDATE_MOVIE:
            const newMovie = state.movies.map(movie =>
                movie._id === payload._id ? payload : movie
            )

            return {
                ...state,
                movies: newMovie
            }
        case DELETE_MOVIE:
            return {
                ...state,
                
                movies: state.movies.filter(movie => movie._id !== payload)
            }
        default:
            return {
                state
            }
    }
}