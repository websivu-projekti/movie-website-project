import { Router } from "express"
import { createGroup, getAllGroups, getOneGroup, deleteOneGroup, getUserOwnedGroups, addContent } from "../controllers/group_controller.js"
import { authenticateToken } from "../controllers/auth_controller.js"

const groupRouter = Router()

groupRouter.post("/newgroup", authenticateToken, createGroup)
groupRouter.get("/myowngroups/:userid", authenticateToken, getUserOwnedGroups)
// todo: lisää autentikointi
groupRouter.post("/add", addContent)
groupRouter.delete("/deletegroup/:id", deleteOneGroup)
// tähän ei varsinaisesti autentikointia mutta tarkistus onko ryhmän jäsen
groupRouter.get("/group/:groupId", getOneGroup)

groupRouter.get("/all", getAllGroups)



export default groupRouter