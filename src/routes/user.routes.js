import express from "express";
const router = express.Router();
import {
    getAdminProfile,
    postAuthUser,
    putUpdateAdmin,
} from "../controllers/user.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.post("/admin/login", postAuthUser);
router
    .route("/settings")
    .put(protect, admin, putUpdateAdmin)
    .get(protect, admin, getAdminProfile);

export default router;
