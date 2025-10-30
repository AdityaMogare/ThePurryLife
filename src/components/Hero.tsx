import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";

const Hero = () => {
  const scrollToSwipe = () => {
    document.getElementById("swipe-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-12 h-12 text-accent fill-accent animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
            Find Your Paw-fect Match
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
            Swipe through adorable pets waiting for their forever home. 
            Every swipe could change a life.
          </p>
          
          <Button 
            variant="hero" 
            size="lg"
            onClick={scrollToSwipe}
            className="text-lg px-8 py-6 h-auto"
          >
            Start Swiping
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
