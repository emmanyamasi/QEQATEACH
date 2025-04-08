import express from "express";
import { protect } from "../middlewares/auth/protect";
import { getUserProfile} from "../controllers/profileController";
;

const router = express.Router();

router.get("/me", protect, getUserProfile);

//router.put("/me", protect, updateUserProfile);
export default router;
