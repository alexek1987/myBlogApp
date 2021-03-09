import express from "express";
import {
  createNewBlog,
  deleteBlog,
  fetchBlogById,
  fetchAllBlogs,
  updateBlog,
} from "../controllers/blogController.js";

const router = express.Router();

router.get("/", fetchAllBlogs);
router.post("/", createNewBlog);

router.get("/:id", fetchBlogById);
router.delete("/:id", deleteBlog);

router.patch("/:id", updateBlog);

export default router;
