import { UPDATE_CINEMA, GET_CINEMA, ADD_CINEMA, DELETE_CINEMA} from "../contexts/constants"

export const cinemaReducer = (state, action) => {
    const { type, payload} = action
    switch(type) {
        case GET_CINEMA:
            return {
                ...state,
                cinemas: payload
            }
       
        case ADD_CINEMA:
            return {
                ...state,
                cinemas: [...state.cinemas, payload]
            }
        case UPDATE_CINEMA:
            const newCinema = state.cinemas.map(cinema =>
                cinema._id === payload._id ? payload : cinema
            )

            return {
                ...state,
                cinemas: newCinema
            }
        case DELETE_CINEMA:
            return {
                ...state,
                
                cinemas: state.cinemas.filter(cinema => cinema._id !== payload.id)
            }
        default:
            return {
                state
            }
    }
}