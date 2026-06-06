
import { Hero } from "@/components/sections/hero";
import { Timeline } from "@/components/sections/timeline";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from './logo.png';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 relative">
            <Image 
              src={logo} 
              alt="Reels Media Company Logo" 
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">Reels Media Company</span>
        </div>
        
        <Button asChild className="bg-primary text-white hover:bg-primary/90 rounded-full font-bold">
          <a href="mailto:ayush0gouriasria@gmail.com">Contact Us</a>
        </Button>
      </nav>

      <Hero />
      
      <div className="py-12">
        <Timeline />
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-background text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-muted-foreground text-sm font-medium">
            Reels Media Company
          </p>
          <div className="text-xs text-muted-foreground/60 mt-2">© 2024 Reels Media Company</div>
          <div className="mt-4">
            <a href="mailto:ayush0gouriasria@gmail.com" className="text-primary hover:underline text-sm font-bold">
              ayush0gouriasria@gmail.com
            </a>
          </div>
          <p className="text-[10px] text-muted-foreground/40 mt-4 italic">Founded by Ayush Gourisaria</p>
        </div>
      </footer>
    </main>
  );
}
