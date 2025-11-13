import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import apiClient from '@/api/apiClient';
import { useAuth } from '@/context/AuthContext'; // To check if user is loaded

// --- Define the type for a Pet object ---
// This should match your backend Pet model
interface Pet {
  _id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Other';
  age: number;
  gender: 'Male' | 'Female';
  bio?: string;
  photos?: string[];
  // Add any other fields you fetch
}

const Dashboard: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { currentUser } = useAuth(); // Get user from context

  // --- 1. Fetch pets from the backend ---
  useEffect(() => {
    // Only fetch if the user is logged in
    if (currentUser) {
      const fetchPets = async () => {
        try {
          setLoading(true);
          // Our secure apiClient automatically sends the auth token
          const response = await apiClient.get<Pet[]>('/pets');
          setPets(response.data);
        } catch (error) {
          console.error('Failed to fetch pets:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchPets();
    }
  }, [currentUser]); // Re-run if currentUser changes

  // --- 2. Handle swipe events ---
  const handleSwipe = (direction: string, petId: string) => {
    console.log(`You swiped ${direction} on pet ${petId}`);
    // TODO: Send swipe data to the backend
  };

  const handleCardLeftScreen = (petName: string) => {
    console.log(`${petName} left the screen.`);
    // You can remove the pet from the 'pets' array here
    // to prevent them from re-appearing on re-render.
  };

  if (loading) {
    return <div className="p-4">Loading pets...</div>;
  }

  // --- 3. Render the card deck ---
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Find a new friend for your pet!
      </h1>
      
      {/* --- Card Deck --- */}
      <div className="relative w-full max-w-sm h-[60vh] max-h-[500px]">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <TinderCard
              key={pet._id}
              onSwipe={(dir) => handleSwipe(dir, pet._id)}
              onCardLeftScreen={() => handleCardLeftScreen(pet.name)}
              // preventSwipe={['up', 'down']}
              className="absolute w-full h-full"
            >
              {/* This is the card's content */}
              <div 
                className="relative w-full h-full p-4 bg-white rounded-xl shadow-lg"
                // Basic styling using the first photo as a background
                // We'll add a fallback image soon
                style={{
                  backgroundImage: `url(${pet.photos?.[0] || 'https://via.placeholder.com/400'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
                
                {/* Pet Info */}
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="text-2xl font-bold">
                    {pet.name}, <span className="font-light">{pet.age}</span>
                  </h3>
                  <p className="text-sm">{pet.bio || 'No bio provided.'}</p>
                </div>
              </div>
            </TinderCard>
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-white rounded-xl shadow-lg">
            <p className="text-gray-500">No more pets found!</p>
          </div>
        )}
      </div>
      
      {/* TODO: Add Swipe Buttons (Like, Dislike) */}
    </div>
  );
};

export default Dashboard;