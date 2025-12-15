import { createNewGroup, combineUserGroup, getAll, getSingleGroup, deleteGroup, getGroupOwnerName, groupOwnerName, getGroupMemberNames, getUserGroups, getMemberGroups, getAllOwners, addOne, isAdded, getGroupContent, deleteOne, leaveGroup } from "../models/group_model.js"
import { sendJoinRequest, getJoinRequest, approveJoinRequest, rejectJoinRequest, getGroupStatusDB } from "../models/group_model.js"
import pool from "../database.js"

// ***********************************************
// *               GROUP MANAGEMENT              *
// ***********************************************

// luo ryhmän

export async function createGroup(req, res){
    try{
        const { group_name, groupicon_url } = req.body
        const userId = req.user.userId

        if(!group_name){
            return res.status(400).json({ error: "A group name is required" })
        }

        const newGroup = await createNewGroup(group_name, groupicon_url)
        const newGroupOwner = await combineUserGroup(userId, newGroup.group_id, true)

        res.status(201).json({
            message: "Group created successfully",
            group: newGroup,
            groupOwner: newGroupOwner
        })
    } catch (error){
        console.error("Error occurred while creating a group: ", error)
        if(error.message === "A group already exists with this name"){
            return res.status(409).json({ error: error.message })
        }
        res.status(500).json({ error: "Internal server error" })
    }
}


// hakee kaikki ryhmät ja ryhmänomistajien käyttäjänimet
export async function getAllGroups(req, res, next){
    try{
        const userGroups = await getAll()
        const ownerNames = await getAllOwners()
        res.json({
            userGroups: userGroups,
            ownerNames: ownerNames
        })
    } catch (err){
        next(err)
    }
}


// hakee käyttäjän omistamat ryhmät ja käyttäjänimen
export async function getUserOwnedGroups(req, res, next){
    try{
        const userId = req.user.userId

        const ownedGroups = await getUserGroups(userId)

        const groupOwner = await getGroupOwnerName(userId)

        res.json({
            ownedGroups: ownedGroups,
            groupOwner: groupOwner
        })
    } catch(err) {
        console.error("Error occurred while finding owned groups: ", err)
        res.status(500).json({ error: "Failed to find owned groups"})
    }
}

// hakee ryhmät jossa käyttäjä on jäsenenä
export async function getUserMemberGroups(req,res){
    try{
        const userId = req.user.userId
        
        const groups = await getMemberGroups(userId)
        const groupIdArray = groups?.map(i => i.group_id || [])
        const groupowner = await groupOwnerName(groupIdArray)

        res.json({
            groups: groups,
            groupowner: groupowner
        })
    }catch(error){
        console.error("Error occurred while fetching user's groups: ", error)
        res.status(500).json({ error: "Failed to fetch user's groups" })
    }
}

// hakee yhden ryhmän ja sen jäsenet
export async function getOneGroup(req, res, next){
    try{
        const groupId = req.params.groupId

        const foundGroup = await getSingleGroup(groupId)
        const groupMembers = await getGroupMemberNames(groupId)
        
        if(!foundGroup){
            return res.status(404).json({ error: "Group not found" })
        }

        res.json({
            group: foundGroup,
            groupMembers: groupMembers
        })
    } catch(err){
        console.error("Get group error: ", err)
        res.status(500).json({ err: "Failed to find group by id" })
    }
}


// Poista ryhmä (omistajan tarkastus tapahtuu front-endissä)
export async function deleteOneGroup(req, res, next){
    try{
        const { groupId } = req.body

        const deletedGroup = await deleteGroup(groupId)

        if(!deletedGroup){
            return res.status(404).json({ error: "Group not found" })
        }

        res.json({
            message: "Group deleted",
            group: deletedGroup
        })
    }catch(err){
        console.error("Delete group error: ", err)
        res.status(500).json({ err: "Failed to delete group" })
    }
}

// lähetä ryhmään liittymispyyntö
export async function requestToJoin(req,res) {
    try{
        const {group_id} = req.body
        const userId = req.user.userId

        if(!group_id){
            return res.status(400).json({error: "group_id is required"})
        }

        const request = await sendJoinRequest(group_id, userId)

        res.json({
            message: "Join request sent",
            request
        })
    } catch (error) {
        console.error("Join request error: ", error)
        res.status(400).json({error: error.message})
    }
}


// hae liittymispyynnöt
export async function seeJoinRequest(req,res){
    try{
        const {group_id} = req.params

        const requests = await getJoinRequest(group_id)

        res.json({
            message: "available requests fetched",
            requests
        })
    } catch (error) {
        console.error("Fetch requests error: ", error)
        res.status(500).json({error: "Failed to fetch requests"})
    }
}


// hyväksy liittymispyyntö
export async function approveRequest (req, res){
    try {
        const {request_id} = req.params

        if(!request_id){
            return res.status(400).json({error: "request_id required"})
        }

        const result = await approveJoinRequest(request_id)

        res.json({
            message: "User added to group",
            result
        })
    } catch (error) {
        console.error("Approve request error:", error)
        res.status(400).json({error: error.message})
    }
}

// estä liittymispyyntö
export async function rejectRequest (req, res){
    try {
        const {request_id} = req.params

        if(!request_id){
            return res.status(400).json({error: "request_id required"})
        }

        const result = await rejectJoinRequest(request_id)

        res.json({
            message: "Join request rejected",
            result
        })
    } catch (error) {
        console.error("Reject request error:", error)
        res.status(400).json({error: error.message})
    }
}

// hae onko käyttäjä ryhmänomistaja vai ryhmän jäsen
export async function getGroupStatus(req,res){
    const userId = req.user.userId
    const groupId = req.params.group_id

    try{
        const status = await getGroupStatusDB(userId, groupId)
        res.json(status)
    } catch(err){
        console.error(err)
        res.status(500).json({error: "Failed to fetch group status"})
    }
}

// käyttäjä lähtee ryhmästä
export async function leaveFromGroup(req, res){
    const userId = req.user.userId
    const groupId = req.body.groupId

    try{
        const leave = await leaveGroup(userId, groupId)
        res.json({
            message: "Successfully left from group",
            leave: leave
        })
    }catch(error){
        console.error(error)
        res.status(500).json({ error: "Failed to leave from group" })
    }
}

// käyttäjä poistetaan ryhmästä
export async function deleteUserFromGroup(req,res){
    const { userId, groupId } = req.body

    try{
        const deleted = await leaveGroup(userId, groupId)
        res.json({
            message: "Successfully deleted user from group",
            deleted: deleted
        })
    }catch(error){
        console.error(error)
        res.status(500).json({ error: "Failed to delete user from group" })
    }
}

// ***********************************************
// *           GROUP CONTENT MANAGEMENT          *
// ***********************************************

// lisää tavaraa
export async function addContent(req, res, next){
    try{
        const { groupId, contentId }= req.body

        console.log('Adding to group - groupId: ', groupId, 'contentId: ', contentId)

        if (!contentId) {
            return res.status(400).json({ error: "Content ID is required" })
        }

        const alreadyAdded = await isAdded(groupId, contentId)

        if(alreadyAdded){
            return res.status(400).json({ error: "Already in group" })
        }

        const addedContent = await addOne(groupId, contentId)
        console.log('Successfully added content:', addedContent)

        res.json({
            message: "Added content",
            addedContent: addedContent
        }) 

    }catch(err){
        console.error("Add content error: ", err)
        console.error("Error details:", err.message, err.stack)
        res.status(500).json({ err: "Failed to add content" })
    }
}

// hae ryhmän sisältö
export async function getAllGroupContent(req, res, next){
    try{
        const groupId = req.params.groupId
        const content = await getGroupContent(groupId)

        res.json({
            content: content
        })
    }catch(error){
        console.error("Get group content error: ", error)
        res.status(500).json({ error: "Failed to fetch group content" })
    }
}

export async function deleteFromGroup(req, res, next){
    try{
        const { groupId, contentId, tmdbId } = req.body

        let resolvedContentId = contentId
        if (!resolvedContentId && tmdbId) {
            const contentRes = await pool.query(
                "SELECT content_id FROM content WHERE tmdb_id = $1",
                [tmdbId]
            )
            if (contentRes.rows.length === 0) {
                return res.status(404).json({ error: "Movie not found in database" })
            }
            resolvedContentId = contentRes.rows[0].content_id
        }

        const content = await deleteOne(groupId, resolvedContentId)

        if(!content){
            return res.status(404).json({ error: "Content not found" })
        }

        res.json({
            message: "Content removed from group",
            content: content
        })
    }catch(error){
        console.error("Delete from group error: ", error)
        res.status(500).json({ error: "Failed to delete group content" })
    }
}
