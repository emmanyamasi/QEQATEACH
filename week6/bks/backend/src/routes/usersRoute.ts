import express from "express";
import { createUser, deleteUser, getOneUser, getUsers, updateUser } from "../controllers/userController";


//instance of router
const router = express.Router()


//routes
router.post("/",createUser)
router.get("/",getUsers)
router.get("/:id",getOneUser)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)

export default router