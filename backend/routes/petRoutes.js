const router = require('express').Router();
const Pet = require('../models/Pet');
const User = require('../models/User'); // We need the User model to update the owner's pet list

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