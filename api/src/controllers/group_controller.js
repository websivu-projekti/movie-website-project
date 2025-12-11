import { createNewGroup, combineUserGroup, getAll, getSingleGroup, deleteGroup, getGroupOwnerName, getUserGroups, getAllOwners } from "../models/group_model.js"

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

export async function getOwnerName(req, res, next) {
    try{
        const userId = req.user.userId
        const ownerGroups = await getGroupOwnerName(userId)
        res.json(ownerGroups)
    } catch(err){
        next(err)
    }
}

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

export async function getOneGroup(req, res, next){
    try{
        const groupId = req.params.groupId

        const foundGroup = await getSingleGroup(groupId)
        
        if(!foundGroup){
            return res.status(404).json({ error: "Group not found" })
        }

        res.json({
            message: "Group found",
            group: foundGroup
        })
    } catch(err){
        console.error("Get group error: ", err)
        res.status(500).json({ err: "Failed to find group by id" })
    }
}

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