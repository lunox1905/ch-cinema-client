import { createContext } from 'react'
import axios from 'axios'
import { URL} from './constants'

export const FoodContext = createContext()

const FoodContextProvider = ({children}) => {

    const getFood = async (slug) => {
		try {
			const res = await axios.get(`http://${URL}/Food/getFood/${slug}`)
			if(res.data.success) {
				return res.data
			}
		} catch (e){
			console.log('err get Food' + e)
		}
	}
   
    const getFoods = async () => {
		try {
			const res = await axios.get(`http://${URL}/Food/getFood`)
			if(res.data.success) {
				return res.data
			}
		} catch (e){
			console.log('err get Food' + e)
		}
	}
	
	const addFood = async (food) => {
		try {
		
			const res = await axios.post(`http://${URL}/Food/addFood`, food)
			
			if(res.data.success) {
				return true
			}
		} catch {
			
		}
	}

	const editFood = async (food, id) => {
		try {
		
			const res = await axios.post(`http://${URL}/Food/editFood/${id}`, food)
			
			if(res.data.success) {
				return true
			}
		} catch {
			
		}
	}

	const deleteFood = async (id) => {
		try {
		
			const res = await axios.post(`http://${URL}/Food/deleteFood`, id)
			
			if(res.data.success) {
				return true
			}
		} catch {
			
		}
	}

    const FoodContextData = { getFoods, getFood, addFood, editFood, deleteFood}
    return (
        <FoodContext.Provider value={FoodContextData}>
            {children}
        </FoodContext.Provider>
    )
}

export default FoodContextProvider