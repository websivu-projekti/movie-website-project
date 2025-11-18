import pool from "../database.js"
import bcrypt from "bcryptjs"

// Uuden käyttäjän rekisteröinti
export async function registerUser(email, password, username) {
    try {
        // Tarkista jos käyttäjä on olemassa
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )
        
        if (existingUser.rows.length > 0) {
            throw new Error("User already exists with this email")
        }
        
        // Salasanan hashaus
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        
        // Uuden käyttäjän lisäys databaseen
        const result = await pool.query(
            "INSERT INTO users (email, password, username, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, email, username, created_at",
            [email, hashedPassword, username]
        )
        
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

// Käyttäjän kirjautuminen
export async function loginUser(email, password) {
    try {
        // Etsi sähköpostilla
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        )
        
        if (result.rows.length === 0) {
            throw new Error("Invalid credentials")
        }
        
        const user = result.rows[0]
        
        // Vertaa salasanaa
        const isValidPassword = await bcrypt.compare(password, user.password)
        
        if (!isValidPassword) {
            throw new Error("Invalid credentials")
        }
        
        // Palauta käyttäjä ilman salasanaa
        const { password: _, ...userWithoutPassword } = user
        return userWithoutPassword
    } catch (error) {
        throw error
    }
}

// Etsi ID:llä
export async function getUserById(userId) {
    try {
        const result = await pool.query(
            "SELECT id, email, username, created_at FROM users WHERE id = $1",
            [userId]
        )
        
        if (result.rows.length === 0) {
            throw new Error("User not found")
        }
        
        return result.rows[0]
    } catch (error) {
        throw error
    }
}