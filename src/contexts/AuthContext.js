import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../store/authReducer'
import axios from 'axios'
import { LOCAL_STORAGE_TOKEN_NAME, URL } from './constants'
import setAuthToken from '../utils/setAuthToken'
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    
    const Navigate = useNavigate()

    const loadUser = async() => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const res = await axios.get(`http://${URL}/auth`)
            if(res.data.success) {  
                console.log(res.data) 
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: res.data.user}
                })
            }
        } catch(e) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null}
            
            })
        }
    
    }

    useEffect(() => {
        loadUser()
    }, [])

    const loginUser = async userForm => {
        try {
            const response = await axios.post(`http://${URL}/login`, userForm)
            if(response.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
                console.log('login')
                loadUser()
            }
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    const registerUser = async userForm => {
        try {
            const response = await axios.post(`http://${URL}/register`, userForm)
            if(response.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
                
            }
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    const editPassWord = async password => {
        try {
            const response = await axios.post(`http://${URL}/editpassword`, password)
            if(response.data.success){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
                
            }
            return response.data
        } catch (err) {
            return err.response.data
        }
    }

    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        setAuthToken(null)
        dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null}
        })
        window.location.reload()
    }

    const AuthContextData = { loginUser, registerUser, authState, logoutUser, editPassWord }
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider