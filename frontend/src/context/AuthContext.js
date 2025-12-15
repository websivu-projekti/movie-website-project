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

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/profile`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                setUser({ ...data.user, token})
            }
        } catch (error) {
            console.error("Failed to fetch user data", error)
        }
    }

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