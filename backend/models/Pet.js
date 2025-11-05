const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petSchema = new Schema(
  {
    // Link to the user who owns this pet profile
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User', // References the 'User' model
      required: true,
      index: true, // Good for finding pets by owner
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    species: {
      type: String,
      required: true,
      enum: ['Dog', 'Cat', 'Other'], // Enforces 'Dog', 'Cat', or 'Other'
      trim: true,
    },
    breed: {
      type: String,
      trim: true,
      default: 'Unknown', // Not all pets have a known breed
    },
    age: {
      type: Number, // Age in years
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
      enum: ['Male', 'Female'],
    },
    bio: {
      type: String,
      trim: true,
      maxLength: 500, // Good to set a limit
    },
    // This will be an array of URLs to photos
    photos: [
      {
        type: String,
        trim: true,
        // We can add validation later to ensure these are valid URLs
      },
    ],
    // --- Fields for matching preferences ---
    lookingFor: {
      type: [String], // Array of strings
      enum: ['Playmate', 'Friendship', 'Breeding'],
      default: ['Playmate'], // Default preference
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;