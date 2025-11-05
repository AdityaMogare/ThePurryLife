const router = require('express').Router();
const User = require('../models/User'); // Import the User model

/**
 * @route   POST /api/users
 * @desc    Create a new user in the database
 * @access  Public (for now, will be secured later)
 */
router.post('/', async (req, res) => {
  try {
    // 1. Get the data from the request body
    const { firebaseUid, email, username } = req.body;

    // 2. Simple validation
    if (!firebaseUid || !email || !username) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ firebaseUid: firebaseUid });
    if (existingUser) {
      // User already exists, just return their data
      return res.status(200).json(existingUser);
    }

    // 4. Create a new user instance
    const newUser = new User({
      firebaseUid: firebaseUid,
      email: email,
      username: username,
    });

    // 5. Save the new user to the database
    const savedUser = await newUser.save();

    // 6. Respond with the new user's data
    res.status(201).json(savedUser); // 201 = "Created"

  } catch (err) {
    // Handle errors (e.g., duplicate email)
    console.error(err);
    if (err.code === 11000) { // MongoDB duplicate key error
      return res.status(409).json({ message: 'Email or username already in use' });
    }
    res.status(500).json({ message: 'Server error creating user', error: err.message });
  }
});

// (We will add other routes here later, like "get user details")

module.exports = router;