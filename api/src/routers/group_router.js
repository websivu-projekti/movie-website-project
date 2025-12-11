import { Router } from "express"
import { createGroup, getAllGroups, getOneGroup, deleteOneGroup, getUserOwnedGroups } from "../controllers/group_controller.js"
import { authenticateToken } from "../controllers/auth_controller.js"

const groupRouter = Router()

groupRouter.post("/newgroup", authenticateToken, createGroup)

groupRouter.get("/all", getAllGroups)
groupRouter.get("/myowngroups/:userid", authenticateToken, getUserOwnedGroups)
groupRouter.get("/group/:id", getOneGroup)
groupRouter.delete("/deletegroup/:id", deleteOneGroup)

export default groupRouter