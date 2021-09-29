import express from "express";
const router = express.Router();
import {
    getAllPost,
    getPostById,
    postNewPost,
    deletePost,
    updatePostById,
    postCommentOnPost,
    deleteCommentOnPost,
} from "../controllers/blogController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getAllPost).post(protect, admin, postNewPost);
router
    .route("/:id")
    .get(getPostById)
    .delete(protect, admin, deletePost)
    .put(protect, admin, updatePostById);
router.route("/:id/comment").post(protect, postCommentOnPost);
router.route("/:id/:comment_id").delete(protect, admin, deleteCommentOnPost);

export default router;
