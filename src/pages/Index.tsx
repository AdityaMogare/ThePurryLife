import { useState } from "react";
import Hero from "@/components/Hero";
import SwipeCard from "@/components/SwipeCard";
import LikedPets from "@/components/LikedPets";
import { mockPets } from "@/data/pets";
import { Pet } from "@/components/SwipeCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [likedPets, setLikedPets] = useState<Pet[]>([]);
  const [showLiked, setShowLiked] = useState(false);

  const currentPet = mockPets[currentPetIndex];

  const handleLike = (pet: Pet) => {
    setLikedPets([...likedPets, pet]);
    setCurrentPetIndex(currentPetIndex + 1);
    toast.success(`You liked ${pet.name}! 💕`);
  };

  const handlePass = (pet: Pet) => {
    setCurrentPetIndex(currentPetIndex + 1);
    toast(`Passed on ${pet.name}`);
  };

  const resetSwipes = () => {
    setCurrentPetIndex(0);
    setShowLiked(false);
  };

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section id="swipe-section" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">
              {showLiked ? "Your Liked Pets" : "Find Your Match"}
            </h2>
            
            <Button
              variant={showLiked ? "default" : "outline"}
              onClick={() => setShowLiked(!showLiked)}
              className="gap-2"
            >
              <Heart className={showLiked ? "fill-current" : ""} />
              {showLiked ? "Back to Swiping" : `Liked (${likedPets.length})`}
            </Button>
          </div>

          {showLiked ? (
            <LikedPets pets={likedPets} />
          ) : currentPet ? (
            <div className="flex flex-col items-center">
              <SwipeCard
                pet={currentPet}
                onLike={handleLike}
                onPass={handlePass}
              />
              <p className="mt-6 text-muted-foreground">
                {mockPets.length - currentPetIndex} pet{mockPets.length - currentPetIndex !== 1 ? 's' : ''} remaining
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">No more pets to show!</h3>
              <p className="text-muted-foreground mb-6">
                You've seen all the pets. Check your liked pets or start over.
              </p>
              <Button onClick={resetSwipes} variant="default" size="lg">
                Start Over
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
