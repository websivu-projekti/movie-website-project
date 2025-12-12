import { Router } from "express"
import { createGroup, getAllGroups, getOneGroup, deleteOneGroup, getUserOwnedGroups, addContent, getAllGroupContent, deleteFromGroup } from "../controllers/group_controller.js"
import { authenticateToken } from "../controllers/auth_controller.js"

const groupRouter = Router()

groupRouter.post("/newgroup", authenticateToken, createGroup)
groupRouter.get("/myowngroups/:userid", authenticateToken, getUserOwnedGroups)
groupRouter.post("/add", authenticateToken, addContent)
groupRouter.get("/groupcontent/:groupId", authenticateToken, getAllGroupContent)
groupRouter.delete("/remove", authenticateToken, deleteFromGroup)
// todo: lisää autentikointi
groupRouter.delete("/deletegroup/:id", deleteOneGroup)
// tähän ei varsinaisesti autentikointia mutta tarkistus onko ryhmän jäsen
groupRouter.get("/group/:groupId", getOneGroup)

groupRouter.get("/all", getAllGroups)



export default groupRouter