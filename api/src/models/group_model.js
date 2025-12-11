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

// hakee kaikkien ryhmänomistajien käyttjänimet
export async function getAllOwners(){
    try{
        const getAllGroupOwners = await pool.query(
            `SELECT u.username FROM user_group g
            JOIN "user" u ON g.user_id = u.user_id
            WHERE is_owner = true`
        )
        return getAllGroupOwners.rows
    }catch(error){
        throw error
    }
}

// hakee yhden ryhmänomistajan käyttäjänimen
export async function getGroupOwnerName(userId){
    try{
        const findGroupOwners = await pool.query(
            `SELECT u.username FROM user_group g 
            JOIN "user" u ON g.user_id = u.user_id
            WHERE is_owner = true AND u.user_id = $1`
            ,[userId]
        )
        return findGroupOwners.rows
    }catch(error){
        throw error
    }
}



// hakee käyttäjän omistamat ryhmät
export async function getUserGroups(userId){
    try{
        const findOwnedGroups = await pool.query(
            `SELECT u.user_id, g.* FROM user_group u 
            JOIN "group" g ON u.group_id = g.group_id
            WHERE u.user_id = $1 AND is_owner = true`,
            [userId]
        )

        return findOwnedGroups.rows
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
            'INSERT INTO user_group (user_id, group_id, is_owner) VALUES ($1, $2, $3) RETURNING *',
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