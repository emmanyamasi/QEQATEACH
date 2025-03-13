import express from "express";
import { createUser, deleteUser, getOneUser, getUsers, updateUser } from "../controllers/userController";


//instance of router
const router = express.Router()


//routes
router.post("/",createUser)
router.get("/",getUsers)
router.get("/:user_id",getOneUser)
router.put("/:user_id",updateUser)
router.delete("/:user_id",deleteUser)

export default router