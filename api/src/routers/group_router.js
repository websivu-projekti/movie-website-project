import { Router } from "express"
import { createGroup } from "../controllers/group_controller.js"

const groupRouter = Router()

groupRouter.post("/newgroup", createGroup)

export default groupRouter