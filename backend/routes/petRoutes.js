const router = require('express').Router();
const Pet = require('../models/Pet');
const User = require('../models/User'); // We need the User model to update the owner's pet list

/**
 * @route   GET /api/pets
 * @desc    Get all pets for the swiping deck, excluding the user's own.
 * @access  Public (for now)
 * @query   ?userId=<the_user_s_database_id>
 */
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query; // Get the user's ID from the query string

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // 1. Find the user to confirm they exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. This is the CRUCIAL LOGIC:
    // Find all pets where the 'owner' field is NOT ($ne) the user's ID.
    const petsForSwiping = await Pet.find({ owner: { $ne: user._id } });
    
    // We can add more filtering here later (e.g., by species, location).

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
    // 1. Get all pet data from the request body
    // 'owner' will be the User's _id from our database
    const { owner, name, species, age, gender, bio } = req.body;

    // 2. Simple validation
    if (!owner || !name || !species || !age || !gender) {
      return res.status(400).json({ message: 'Missing required pet fields' });
    }

    // 3. Find the owner to make sure they exist
    const petOwner = await User.findById(owner);
    if (!petOwner) {
      return res.status(404).json({ message: 'Owner (User) not found' });
    }

    // 4. Create the new pet instance
    const newPet = new Pet({
      owner: owner,
      name: name,
      species: species,
      age: age,
      gender: gender,
      bio: bio,
      // You can add other fields like breed, photos here
    });

    // 5. Save the new pet to the database
    const savedPet = await newPet.save();

    // 6. IMPORTANT: Add this new pet's ID to the owner's 'pets' array
    petOwner.pets.push(savedPet._id);
    await petOwner.save(); // Save the updated user

    // 7. Respond with the new pet's data
    res.status(201).json(savedPet);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error creating pet', error: err.message });
  }
});

module.exports = router;