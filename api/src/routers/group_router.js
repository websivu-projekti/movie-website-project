import { Router } from "express"
import { createGroup, getAllGroups, getOneGroup, deleteOneGroup, getAllGroupUsr } from "../controllers/group_controller.js"
import { requestToJoin, seeJoinRequest, approveRequest, rejectRequest, getGroupStatus } from "../controllers/group_controller.js"
import { authenticateToken } from "../controllers/auth_controller.js"

const groupRouter = Router()

groupRouter.post("/newgroup", authenticateToken, createGroup)

groupRouter.get("/all", getAllGroups)
groupRouter.get("/allusr", getAllGroupUsr)
groupRouter.get("/group/:id", getOneGroup)
groupRouter.delete("/deletegroup/:id", deleteOneGroup)

groupRouter.post("/join-request", authenticateToken, requestToJoin)
groupRouter.get("/:group_id/requests", authenticateToken, seeJoinRequest)
groupRouter.post("/requests/:request_id/approve", authenticateToken, approveRequest)
groupRouter.post("/requests/:request_id/reject", authenticateToken, rejectRequest)
groupRouter.get("/:group_id/status", authenticateToken, getGroupStatus);

export default groupRouter