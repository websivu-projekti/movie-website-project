import { createNewGroup, combineUserGroup, getAll } from "../models/group_model.js"

export async function createGroup(req, res){
    try{
        const { group_name, groupicon_url } = req.body

        if(!group_name){
            return res.status(400).json({ error: "A group name is required" })
        }

        const newGroup = await createNewGroup(group_name, groupicon_url)

        res.status(201).json({
            message: "Group created successfully",
            group: newGroup
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