import { Router } from "express"
import { createGroup, getAllGroups } from "../controllers/group_controller.js"

const groupRouter = Router()

groupRouter.post("/newgroup", createGroup)
groupRouter.get("/", getAllGroups)

export default groupRouter