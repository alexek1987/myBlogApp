import mongoose from "mongoose";

const instance = new mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId, // _id is set by default, (you can remove this line)

    /*
      name = Object key
      String = Type
    */
    title: String,
    description: String,
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
  },
  {
    timestamps: true,
    // this creates and maintains:
    // {
    //   createdAt: Date,
    //   updatedAt: Date,
    // }
  }
);

// NOTE! use a singular model name, mongoose automatically creates a collection like so:
// model: 'User' === collection: 'users'
const modelName = "Blog";

export default mongoose.model(modelName, instance);
