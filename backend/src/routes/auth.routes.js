import express from "express";
import { 
    login, 
    logout, 
    signup, 
    verifyEmail, 
    resendVerificationEmail,
    checkAuth, 
    updateProfile 
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Email verification routes
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);

router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;