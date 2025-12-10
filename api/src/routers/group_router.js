import { Router } from "express"
import { createGroup, getAllGroups, getOneGroup, deleteOneGroup } from "../controllers/group_controller.js"

const groupRouter = Router()

groupRouter.post("/newgroup", createGroup)

groupRouter.get("/all", getAllGroups)
groupRouter.get("/group/:id", getOneGroup)
groupRouter.delete("/deletegroup/:id", deleteOneGroup)

export default groupRouter