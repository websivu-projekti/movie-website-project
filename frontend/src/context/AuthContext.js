import React, { createContext, useState, useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decodedUser = jwtDecode(token)
                const isExpired = decodedUser.exp * 1000 < Date.now()
                if (!isExpired) {
                    setUser({ ...decodedUser, token})
                } else {
                    console.log("Expired token")
                    localStorage.removeItem('token')
                }
            } catch (error) {
                console.error("Invalid token:", error)
                localStorage.removeItem('token')
            }
        }
    }, [])

    const login = (token) => {
        localStorage.setItem('token', token)
        const decodedUser = jwtDecode(token)
        setUser({ ...decodedUser, token})
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    return (
        <AuthContext.Provider value ={{ user, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}