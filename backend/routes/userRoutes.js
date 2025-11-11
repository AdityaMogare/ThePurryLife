const router = require('express').Router();
const User = require('../models/User'); // Import the User model
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route   POST /api/users
 * @desc    Create a new user in the database
 * @access  Public (for now, will be secured later)
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    // 3. Get secure data from the verified token (via middleware)
    const { uid: firebaseUid, email } = req.user;
    
    // 4. Get other data (like username) from the request body
    const { username } = req.body;

    // 5. Simple validation
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    // 6. Check if user already exists (using the secure firebaseUid)
    const existingUser = await User.findOne({ firebaseUid: firebaseUid });
    if (existingUser) {
      // User already exists, just return their data
      return res.status(200).json(existingUser);
    }

    // 7. Create a new user instance with secure data
    const newUser = new User({
      firebaseUid: firebaseUid, // From token
      email: email,             // From token
      username: username,       // From body
    });

    // 8. Save the new user to the database
    const savedUser = await newUser.save();

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