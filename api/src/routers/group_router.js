import { Router } from "express"
import { createGroup, getAllGroups, getOneGroup, deleteOneGroup, getUserOwnedGroups, getUserMemberGroups, addContent, getAllGroupContent, deleteFromGroup, leaveFromGroup, deleteUserFromGroup } from "../controllers/group_controller.js"
import { requestToJoin, seeJoinRequest, approveRequest, rejectRequest, getGroupStatus } from "../controllers/group_controller.js"
import { authenticateToken } from "../controllers/auth_controller.js"

const groupRouter = Router()

// create group
groupRouter.post("/newgroup", authenticateToken, createGroup)
groupRouter.get("/myowngroups/:userid", authenticateToken, getUserOwnedGroups)
groupRouter.post("/add", authenticateToken, addContent)
groupRouter.get("/groupcontent/:groupId", authenticateToken, getAllGroupContent)
groupRouter.get("/usersgroups", authenticateToken, getUserMemberGroups)
// delete content from group
groupRouter.delete("/remove", authenticateToken, deleteFromGroup)
// delete the whole group
groupRouter.delete("/deletegroup/", authenticateToken, deleteOneGroup)
// delete self from group
groupRouter.delete("/leavegroup", authenticateToken, leaveFromGroup)
// delete an user from group
groupRouter.delete("/deletefromgroup", authenticateToken, deleteUserFromGroup)
groupRouter.post("/join-request", authenticateToken, requestToJoin)
groupRouter.get("/:group_id/requests", authenticateToken, seeJoinRequest)
groupRouter.post("/requests/:request_id/approve", authenticateToken, approveRequest)
groupRouter.post("/requests/:request_id/reject", authenticateToken, rejectRequest)
groupRouter.get("/:group_id/status", authenticateToken, getGroupStatus)

groupRouter.get("/group/:groupId", getOneGroup)
groupRouter.get("/all", getAllGroups)

export default groupRouter