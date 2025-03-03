import mongoose from "mongoose"; // ✅ Importing Mongoose

const userSchema = new mongoose.Schema({ // ✅ Defining schema
  name: {
    type: String,
    required: true, // ✅ Field is required
  },
  email: {
    type: String,
    required: true,
    unique: true, // ✅ Email should be unique
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true }); // ✅ Adds `createdAt` and `updatedAt` automatically

const User = mongoose.model("User", userSchema); // ✅ Creating the model

export default User; // ✅ Exporting the model
