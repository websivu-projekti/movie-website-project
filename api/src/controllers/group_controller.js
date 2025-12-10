import { createNewGroup } from "../models/group_model.js"

export async function createGroup(req, res){
    try{
        const { group_name } = req.body

        if(!group_name){
            return res.status(400).json({ error: "A group name is required" })
        }

        const newGroup = await createNewGroup(group_name)

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