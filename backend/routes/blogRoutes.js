import express from "express";
import {
  createNewBlog,
  deleteBlog,
  fetchBlogById,
  fetchAllBlogs,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/blog", fetchAllBlogs);
router.post("/blog", createNewBlog);

router.get("/blog/:id", fetchBlogById);
router.delete("/blog/:id", deleteBlog);

export default router;
