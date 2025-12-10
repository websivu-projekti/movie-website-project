import pool from '../database.js'

// hakee ryhmät (kaikki)
export async function getAll(){
    try{
        const findGroups = await pool.query(
            'SELECT * FROM "group"'
        )
        return findGroups.rows
    }catch(error){
        throw error
    }
}

// hakee ryhmän (yksi)
export async function getOne(groupId){
    try{
        const result = await pool.query(
            'SELECT group_id, group_name, groupicon_url FROM "group" where group_id = $1',
            [groupId]
        )

        if(result.rows.length === 0){
            throw new Error("Group not found")
        }
        
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

// luo ryhmän
export async function createNewGroup(groupname, groupiconurl){
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
            'INSERT INTO "group" (group_name, groupicon_url) VALUES ($1, $2) RETURNING group_id, group_name, groupicon_url',
            [groupname, groupiconurl]
        )
        return createdGroup.rows[0]
    }
    catch(error){
        throw error
    }
}

// yhdistää ryhmän ja käyttäjän
export async function combineUserGroup(userId, groupId, isOwner){
    try{
        const userGroupCombined = await pool.query(
            'INSERT INTO user_group (user_id, group_id, isOwner) VALUES ($1, $2, $3) RETURNING *',
            [userId, groupId, isOwner]
        )

        return userGroupCombined.rows[0]
    }catch(error){
        throw error
    }
}

export async function deleteGroup(groupId){
    try{
        const result = await pool.query(
            'DELETE FROM "group" WHERE group_id = $1 RETURNING group_id, group_name',
            [groupId]
        )

        if(result.rows.length === 0){
            throw new Error("Group not found")
        }

        return result.rows[0]
    } catch(error){
        throw error
    }
}