import Blog from "../models/blogModel.js";
import Image from "../models/imageModel.js";

export async function createNewBlog(req, res) {
  try {
    // getting the data form Front end
    const { title, description, image } = req.body;

    const newImage = new Image({
      name: image.name,
      type: image.type,
      size: image.size,
      base64: image.base64,
    });

    await newImage.save();

    // creating an instance of the model object
    const newBlog = new Blog({
      title,
      description,
      image: newImage._id,
    });

    // save to the database, it knows to save in the blogs collection, because of the blog instance in the model
    await newBlog.save();

    // return data to front end
    res.status(201).json({
      message: "Blog created!",
      blog: newBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
}

export async function fetchAllBlogs(req, res) {
  try {
    const fetchedBlogs = await Blog.find().populate("image");

    res.status(200).json({
      message: "All blogs fetched!",
      blogs: fetchedBlogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
}

export async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    await Blog.deleteOne({ _id: id });
    res.status(200).json({
      message: "Blog deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
}

export async function fetchBlogById(req, res) {
  try {
    const { id } = req.params;

    const fetchedBlog = await Blog.findOne({ _id: id })
      .select("title description image createdAt updatedAt __v")
      .populate("image");

    res.status(200).json({
      message: "Blog fetched!",
      blog: fetchedBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
}
