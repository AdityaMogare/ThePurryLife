const mongoose = require('mongoose');

// Mongoose 'Schema' is the blueprint for the document
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // This 'firebaseUid' is the unique ID from Firebase Auth
    firebaseUid: {
      type: String,
      required: true,
      unique: true, // No two users can share a Firebase ID
      index: true,  // Improves query performance for this field
    },
    email: {
      type: String,
      required: true,
      unique: true, // No two users can share an email
      trim: true,     // Removes whitespace
      lowercase: true,
    },
    // The user's public-facing name
    username: {
      type: String,
      required: true,
      trim: true,
    },
    // This will be an array of "Pet" document IDs
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pet', // This tells Mongoose to reference the 'Pet' model
      },
    ],
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// Mongoose 'model' is the class we use to interact with the collection
const User = mongoose.model('User', userSchema);

module.exports = User;