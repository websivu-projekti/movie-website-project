import pool from '../database.js'

// luo ryhmän
export async function createNewGroup(groupname){
    try{
        // onko ryhmännimi jo käytössä
        const groupExists = await pool.query(
            'SELECT * FROM "group" WHERE group_name = $1',
            [groupname]
        )

        if(groupExists.rows.length > 0){
            throw new Error("A group already exists with this name")
        }

        const createdGroup = await pool.query(
            'INSERT INTO "group" (group_name) VALUES ($1) RETURNING group_id, group_name',
            [groupname]
        )

        return createdGroup.rows[0]
    }
    catch(error){
        throw error
    }
}