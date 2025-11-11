const router = require('express').Router();
const Pet = require('../models/Pet');
const User = require('../models/User'); // We need the User model to update the owner's pet list
const authMiddleware = require('../middleware/authMiddleware');
router.use(authMiddleware);

/**
 * @route   GET /api/pets
 * @desc    Get all pets for the swiping deck, excluding the user's own.
 * @access  Public (for now)
 * @query   ?userId=<the_user_s_database_id>
 */
router.get('/', async (req, res) => {
  try {
    // 3. GET THE USER'S FIREBASE UID FROM THE REQUEST
    // The middleware attached it for us as 'req.user'
    const firebaseUid = req.user.uid;

    // 4. Find our internal user in MongoDB
    const user = await User.findOne({ firebaseUid: firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User profile not found in database' });
    }

    // 5. Use the user's MONGODB ID for the query
    const petsForSwiping = await Pet.find({ owner: { $ne: user._id } });

    res.status(200).json(petsForSwiping);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error fetching pets', error: err.message });
  }
});



/**
 * @route   POST /api/pets
 * @desc    Create a new pet profile
 * @access  Public (for now, will be secured later)
 */
router.post('/', async (req, res) => {
  try {
    // 6. We no longer need the frontend to send 'owner' in the body.
    // We can get it securely from the token.
    const firebaseUid = req.user.uid; 
    const petOwner = await User.findOne({ firebaseUid: firebaseUid });

    if (!petOwner) {
      return res.status(404).json({ message: 'Owner (User) not found' });
    }

    const { name, species, age, gender, bio } = req.body;
    if (!name || !species || !age || !gender) {
      return res.status(400).json({ message: 'Missing required pet fields' });
    }
    
    const newPet = new Pet({
      owner: petOwner._id, // Use the secure ID
      name,
      species,
      age,
      gender,
      bio,
    });

    const savedPet = await newPet.save();
    petOwner.pets.push(savedPet._id);
    await petOwner.save();

    res.status(201).json(savedPet);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating pet', error: err.message });
  }
});

module.exports = router;