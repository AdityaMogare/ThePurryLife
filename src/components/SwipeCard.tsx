import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, X, MapPin } from "lucide-react";

export interface Pet {
  id: number;
  name: string;
  age: number;
  breed: string;
  description: string;
  location: string;
  image: string;
}

interface SwipeCardProps {
  pet: Pet;
  onLike: (pet: Pet) => void;
  onPass: (pet: Pet) => void;
}

const SwipeCard = ({ pet, onLike, onPass }: SwipeCardProps) => {
  const [exit, setExit] = useState<"left" | "right" | null>(null);

  const handleLike = () => {
    setExit("right");
    setTimeout(() => onLike(pet), 300);
  };

  const handlePass = () => {
    setExit("left");
    setTimeout(() => onPass(pet), 300);
  };

  return (
    <div
      className={`transition-all duration-300 ${
        exit === "right"
          ? "translate-x-[150%] rotate-12 opacity-0"
          : exit === "left"
          ? "-translate-x-[150%] -rotate-12 opacity-0"
          : ""
      }`}
    >
      <Card className="w-full max-w-sm mx-auto overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="relative">
          <img
            src={pet.image}
            alt={pet.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-primary-foreground">
            <h3 className="text-3xl font-bold mb-1">{pet.name}, {pet.age}</h3>
            <p className="text-lg mb-2">{pet.breed}</p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{pet.location}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-muted-foreground mb-6">{pet.description}</p>
          
          <div className="flex justify-center gap-6">
            <Button
              variant="swipe"
              onClick={handlePass}
              className="bg-secondary hover:bg-secondary/80"
            >
              <X className="w-8 h-8 text-destructive" />
            </Button>
            
            <Button
              variant="swipe"
              onClick={handleLike}
              className="bg-accent hover:bg-accent/90"
            >
              <Heart className="w-8 h-8 text-accent-foreground fill-current" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SwipeCard;
