import pool from "../database.js"
import bcrypt from "bcryptjs"

// Uuden käyttäjän rekisteröinti
export async function registerUser(email, password, username) {
    try {
        // Tarkista jos käyttäjä on olemassa
        const existingUser = await pool.query(
            'SELECT * FROM "user" WHERE email = $1',
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
            'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email',
            [username, email, hashedPassword]
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
            'SELECT * FROM "user" WHERE email = $1',
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
            'SELECT user_id, email, username, pfp_url FROM "user" WHERE user_id = $1',
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

// Poista käyttäjä (ja kaskadoi liittyvät tiedot ON DELETE CASCADE)
export async function deleteUser(userId) {
    try {
        const result = await pool.query(
            'DELETE FROM "user" WHERE user_id = $1 RETURNING user_id, username, email',
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

export async function getUserByPassword(userId) {
    const result = await pool.query(
        'SELECT password FROM "user" WHERE user_id = $1',
        [userId]
    );

    if (result.rows.length === 0) {
        throw new Error("User not found");
    }

    return result.rows[0];
}

// Salasanan vaihto
export async function changeUserPassword(userId, newPassword, currentPassword) {
    try {
        const user = await getUserByPassword(userId)

        const isValidPassword = await bcrypt.compare(currentPassword, user.password)

        if (!isValidPassword) {
            throw new Error("Current password is incorrect")
        }

        const saltRounds = 10
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

        const result = await pool.query(
            'UPDATE "user" SET password = $1 WHERE user_id = $2 RETURNING user_id, username, email',
            [hashedNewPassword, userId]
        )

        return result.rows[0]
    } catch (error) {
        throw error
    }
}