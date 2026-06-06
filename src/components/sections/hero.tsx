
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-12 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-tight">
          Reels Media <br />
          <span className="text-primary">Company.</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The fastest content production pipeline for Instagram. <br />
          Systematized. Scalable. Viral.
        </p>

        <div className="flex items-center justify-center pt-4">
          <Button asChild size="lg" className="h-16 px-10 text-lg font-bold bg-primary hover:bg-primary/90 transition-all rounded-full group">
            <a href="mailto:ayush0gouriasria@gmail.com" className="flex items-center">
              Get Started
              <ArrowRight className="ml-2 w-6 h-6" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
