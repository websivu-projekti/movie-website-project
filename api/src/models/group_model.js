import pool from '../database.js'

// ***********************************************
// *               GROUP MANAGEMENT              *
// ***********************************************    

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

// hakee ryhmän (yksi)
export async function getSingleGroup(groupId){
    try{
        const result = await pool.query(
            `SELECT * FROM "group" where group_id = $1`,
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

// hakee kaikki ryhmään kuuluvien käyttäjänimet
export async function getGroupMemberNames(groupId){
    try{
        const findGroupOwners = await pool.query(
            `SELECT u.username FROM user_group g 
            JOIN "user" u ON g.user_id = u.user_id
            WHERE g.group_id = $1`
            ,[groupId]
        )
        return findGroupOwners.rows
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

// poistaa ryhmän
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

// ***********************************************
// *           GROUP CONTENT MANAGEMENT          *
// ***********************************************

// lisää elokuva/sarja group_contenttiin
export async function addOne(groupId, contentId){
    try{
        const result = await pool.query(
            `INSERT INTO group_content (group_id, content_id)
            VALUES ($1, $2)
            RETURNING *`,
            [groupId, contentId]
        )

        return result.rows[0]
    }catch(error){
        throw error
    }
}

// tarkista onko elokuva/sarja jo ryhmässä
export async function isAdded(groupId, contentId){
    try{
        const result = await pool.query(
            `SELECT * FROM group_content
            WHERE group_id = $1 AND content_id = $2`,
            [groupId, contentId]
        )
        return result.rows.length > 0
    }catch(error){
        throw error
    }
}

// hae ryhmään tallennettu sisältö
export async function getGroupContent(groupId){
    try{
        const result = await pool.query(
            `SELECT c.* FROM group_content g
            JOIN content c ON c.content_id = g.content_id
            WHERE g.group_id = $1`
            ,[groupId]
        )
        return result.rows
    }catch(error){
        throw error
    }
}

// poista sisältö ryhmästä
export async function deleteOne(groupId, contentId){
    try{
        const result = await pool.query(
            `DELETE FROM group_content
            WHERE group_id = $1 AND content_id = $2
            RETURNING *`,
            [groupId, contentId]
        )

        return result.rows[0]
    }catch(error){
        throw error
    }
}

export async function sendJoinRequest(groupId, userId){
    try{
        //tarkistaa onko request jo olemassa
        const existing = await pool.query(
            `SELECT * FROM group_join_request WHERE group_id = $1 AND user_id = $2 AND status = 'pending'`,
            [groupId, userId]
        )

        if(existing.rows.length > 0){
            throw new Error ("Join request alredy sent")
        }

        const newRequest = await pool.query(
            `INSERT INTO group_join_request (group_id, user_id) VALUES ($1,$2)
            RETURNING request_id, group_id, user_id, status `,
            [groupId, userId]
        )

        return newRequest.rows[0]
    } catch(error){
        throw error
    }
}

export async function getJoinRequest(groupId){
    try{
        const result = await pool.query(
            `SELECT r.request_id, r.user_id, u.username, r.status, r.created_at
             FROM group_join_request r
             JOIN "user" u ON u.user_id = r.user_id
             WHERE r.group_id = $1 AND r.status = 'pending'`,
            [groupId]
        )
        return result.rows
    }catch(error){
        throw error
    }
}

export async function approveJoinRequest(requestId){
    try{
        //get request info
        const reqData = await pool.query(
           `SELECT * FROM group_join_request WHERE request_id = $1`,
           [requestId]
        )
        if (reqData.rows.length === 0){
            throw new Error ("Request not found")
        }

        const {group_id, user_id} = reqData.rows[0]

        //update status
        await pool.query(
            `UPDATE group_join_request SET status = 'approved'
            WHERE request_id = $1`,
            [requestId]
        )
        //add user to group
        const addedMember = await pool.query(
            `INSERT INTO user_group (user_id, group_id, is_owner)
            VALUES ($1, $2, false)
            RETURNING user_id, group_id, is_owner`,
            [user_id, group_id]
        )   
        return addedMember.rows[0] 
    }  catch (error) {
        throw error;
    }
}

// hylkää liittymispyynnön
export async function rejectJoinRequest(requestId){
    try {
        const reqData = await pool.query(
            `SELECT * FROM group_join_request WHERE request_id = $1`,
            [requestId]
        )

        if (reqData.rows.length === 0){
            throw new Error("Request not found")
        }

        await pool.query(
            `UPDATE group_join_request SET status = 'rejected' WHERE request_id = $1`,
            [requestId]
        )

        return { request_id: requestId, status: 'rejected' }
    } catch (error) {
        throw error
    }
}

export async function getGroupStatusDB(userId, groupId){
    try {
        //tarkistaa onko käyttäjä ryhmän jäsen/omista
        const member = await pool.query(
            'SELECT is_owner FROM user_group WHERE user_id = $1 AND group_id = $2',
            [userId, groupId]
        )
        const isMember = member.rowCount > 0
        const isOwner = isMember ? member.rows[0].is_owner : false

        // tarkistaa onko käyttäjälle tullut liittymis pyyntöjä
        const request = await pool.query(
            'SELECT request_id FROM group_join_request WHERE user_id = $1 AND group_id = $2 AND status = \'pending\'',
            [userId, groupId]
        )
        const requestSent = request.rowCount > 0

        return { isMember, isOwner, requestSent }
    } catch (error) {
        throw error
    }
}

