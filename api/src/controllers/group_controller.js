import { createNewGroup, combineUserGroup, getAll, getOne, deleteGroup, getAllGroupUsers } from "../models/group_model.js"
import { sendJoinRequest, getJoinRequest, approveJoinRequest, rejectJoinRequest, getGroupStatusDB } from "../models/group_model.js"

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
        res.json(userGroups)
    } catch (err){
        next(err)
    }
}

export async function getAllGroupUsr(req, res, next){
    try{
        const userGroups = await getAllGroupUsers()
        res.json(userGroups)
    } catch (err){
        next(err)
    }
}

export async function getOneGroup(req, res, next){
    try{
        const { group_id } = req.body

        const foundGroup = await getOne(group_id)
        
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
