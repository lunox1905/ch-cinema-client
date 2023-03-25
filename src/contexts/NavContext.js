import { createContext, useReducer, useEffect } from 'react'
import { navReducer } from '../store/navReducer'
import axios from 'axios'
import { GET_MENU, ADD_MENU, URL, UPDATE_MENU} from './constants'

export const NavContext = createContext()

const NavContextProvider = ({children}) => {
    const [navState, dispatch] = useReducer(navReducer, {
        menu: []
    })
   

    const getMenu = async () => {
		try {
			const res = await axios.get(`http://${URL}/getmenu`)
			if(res.data.success) {
				dispatch ({type: GET_MENU, payload: res.data.menu})
			}
		} catch (e){
			console.log('err get menu' + e)
		}
	}

	useEffect(() => {
        getMenu()
    }, [])

	const addMenu = async (menu) => {
		try {
		
			const res = await axios.post(`http://${URL}/addmenu`, menu)
			
			if(res.data.success) {
				dispatch({type: ADD_MENU, payload: res.data.menu})
				return res.data
			}
		} catch {
			
		}
	}

	const editMenu = async (menu, id) => {
		try {
		
			const res = await axios.post(`http://${URL}/editmenu/${id}`, menu)
			
			if(res.data.success) {
				dispatch({type: UPDATE_MENU, payload: menu})
				
			}
		} catch {
			
		}
	}

    const NavContextData = { getMenu, addMenu, editMenu, navState}
    return (
        <NavContext.Provider value={NavContextData}>
            {children}
        </NavContext.Provider>
    )
}

export default NavContextProvider