import jwt from "jsonwebtoken"
import { registerUser, loginUser, getUserById, deleteUser, changeUserPassword } from "../models/user_model.js"

// JWT Salaus
const JWT_SECRET = process.env.JWT_SECRET || "secret-key-for-development"

// Rekisteröi käyttäjä
export async function register(req, res) {
    try {
        const { email, password, username } = req.body

        // Oikeanlaiset inputit
        if (!email || !password || !username) {
            return res.status(400).json({
                error: "Email, password, and username are required"
            })
        }

        // Oikenlainen sähköposti
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: "Invalid email format"
            })
        }

        // Salasanan vaatimukset: väh. 8 merkkiä, 1 iso kirjain, 1 numero
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                error: "Password must be at least 8 characters, contain one uppercase letter, and one number"
            })
        }

        // Rekisteröi käyttäjä
        const newUser = await registerUser(email, password, username)

        // Generoi JWT tokeni
        const token = jwt.sign(
            { userId: newUser.user_id, email: newUser.email, username: newUser.username },
            JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
            token: token
        })
    } catch (error) {
        console.error("Registration error:", error)
        if (error.message === "User already exists with this email") {
            return res.status(409).json({ error: error.message })
        }
        res.status(500).json({ error: "Internal server error" })
    }
}

// Kirjaudu sisään
export async function login(req, res) {
    try {
        const { email, password } = req.body

        // Oikeanlainen input
        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            })
        }

        // Kirjaudu
        const user = await loginUser(email, password)

        // Generoi JWT tokeni
        const token = jwt.sign(
            { userId: user.user_id, email: user.email, username: user.username },
            JWT_SECRET,
            { expiresIn: "24h" }
        )

        res.json({
            message: "Login successful",
            user: user,
            token: token
        })
    } catch (error) {
        console.error("Login error:", error)
        if (error.message === "Invalid credentials") {
            return res.status(401).json({ error: error.message })
        }
        res.status(500).json({ error: "Internal server error" })
    }
}

// Etsi käyttäjäprofiili
export async function getProfile(req, res) {
    try {
        const userId = req.user.userId
        const user = await getUserById(userId)
        
        res.json({
            user: user
        })
    } catch (error) {
        console.error("Get profile error:", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

// hae toisen käyttäjän profiili
export async function getAnotherUser(req, res){
    try{
        const userId = req.params.userId
        const user = await getUserById(userId)
        
        res.json({
            user: user
        })
    }catch(error){
        console.error("Get another user error: ", error)
        res.status(500).json({ error: "Internal server error" })
    }
}

// Middleware JWT varmistus
export function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ error: "Access token required" })
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" })
        }
        req.user = user
        next()
    })
}

// Poista oma käyttäjätili
export async function deleteAccount(req, res) {
    try {
        const userId = req.user.userId
        const { username: confirmationUsername } = req.body
        
        // Vaadi käyttäjänimen kirjoittaminen poiston aikan
        // !!! ei toimi vielä
        if (!confirmationUsername) {
            return res.status(400).json({ error: "Username confirmation is required" })
        }

        // Etsi databasesta
        const user = await getUserById(userId)

        // vertaa nimiä
        if (user.username !== confirmationUsername) {
            return res.status(403).json({ error: "Username confirmation failed. Deletion not allowed." })
        }

        // poista käyttäjä
        const deleted = await deleteUser(userId)
        
        return res.json({
            message: "Account deleted successfully",
            user: deleted
        })

    } catch (error) {
        console.error("Delete account error:", error)
        if (error.message === "User not found") {
            return res.status(404).json({ error: error.message })
        }
        return res.status(500).json({ error: "Internal server error" })
    }
}

// Salasanan vaihto
export async function changePassword(req, res) {
    try {
        const userId = req.user.userId
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Current and new passwords are required" });
        }   
    

    const updated = await changeUserPassword(userId, newPassword, currentPassword);

    return res.json({
        message: "Password changed successfully",
        user: updated
    });

    } catch (error) {
        console.error("Change password error:", error);
        if (error.message === "Current password is incorrect") {
            return res.status(403).json({ error: error.message });
        }
        if (error.message === "User not found") {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
}
