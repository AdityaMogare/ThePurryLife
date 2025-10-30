import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MapPin } from "lucide-react";
import { Pet } from "./SwipeCard";

interface LikedPetsProps {
  pets: Pet[];
}

const LikedPets = ({ pets }: LikedPetsProps) => {
  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-xl text-muted-foreground">No liked pets yet. Start swiping!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <Card key={pet.id} className="overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-[var(--transition-smooth)]">
          <div className="relative">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 right-2">
              <Heart className="w-6 h-6 text-accent fill-accent" />
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">{pet.name}, {pet.age}</CardTitle>
            <p className="text-sm text-muted-foreground">{pet.breed}</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="w-4 h-4" />
              <span>{pet.location}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{pet.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LikedPets;
