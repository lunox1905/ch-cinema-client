import { UPDATE_MENU } from "../contexts/constants"

export const navReducer = (state, action) => {
    const { type, payload} = action
    switch(type) {
        case 'GET_MENU':
            return {
                ...state,
                menu: payload
            }
        case 'ADD_MENU':
            return {
                ...state,
                menu: payload
            }
        case UPDATE_MENU:
            const newCart = state.menu.map(menu =>
                menu._id === payload._id ? payload : menu
            )

            return {
                ...state,
                menu: newCart
            }
        default:
            return {
                state
            }
    }
}