import { createNewGroup, combineUserGroup, getAll, getSingleGroup, deleteGroup, getGroupOwnerName, getGroupMemberNames, getUserGroups, getAllOwners, addOne, isAdded, getGroupContent, deleteOne } from "../models/group_model.js"
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


// hakee ryhmän omistajan käyttäjänimen (atm ei käytössä)
export async function getOwnerName(req, res, next) {
    try{
        const userId = req.user.userId
        const ownerGroups = await getGroupOwnerName(userId)
        res.json(ownerGroups)
    } catch(err){
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


// tarvii vielä varmistuksen onko käyttäjä ryhmän omistaja
export async function deleteOneGroup(req, res, next){
    try{
        const { group_id } = req.body

        const deletedGroup = await deleteGroup(group_id)

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