import { createContext, useEffect, useReducer } from "react";
import { toast } from 'react-hot-toast'
import api from "../ApiConfig";

export const AuthContext = createContext();

const initialState = { user: null };

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            localStorage.removeItem("token")
            toast.success("Logout success.")
            return { ...state, user: null }
        default:
            return state
    }
}

// Its a higher order function hof 
const HandleAuthContext = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        async function getCurrentUserData() {
            var token = JSON.parse(localStorage.getItem("token"));

            if (token) {
                try {
                    const response = await api.post("/get-current-user", { token });
                console.log(response.data,"-resspomnse data")
                if (response.data.success) {
                    dispatch({
                        type: "LOGIN",
                        payload: response.data.user
                    })
                } else {
                    dispatch({
                        type: "LOGOUT"
                    });
                }
                } catch (error) {
                    console.log(error);
                }
            }

        }
        getCurrentUserData();
    }, [])

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}

export default HandleAuthContext;