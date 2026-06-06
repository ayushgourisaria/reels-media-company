
import { Card, CardContent } from "@/components/ui/card";
import { Layers, Zap, Search, Send } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Market Analysis",
    description: "We deep-dive into your niche to identify trending formats and hooks that resonate with your target audience.",
  },
  {
    icon: Layers,
    title: "Process Scripting",
    description: "Systematic script generation using our proprietary frameworks designed specifically for high-retention reels.",
  },
  {
    icon: Zap,
    title: "Semi-Automated Editing",
    description: "Our proprietary pipeline streamlines transitions, subtitles, and audio syncing for maximum production speed.",
  },
  {
    icon: Send,
    title: "Strategic Uploads",
    description: "Automated scheduling and SEO optimization for every reel to ensure maximum reach within Instagram's algorithm.",
  }
];

export function Blueprint() {
  return (
    <section id="blueprint" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold font-headline">The Content Blueprint</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our systematic approach transforms chaos into a predictable growth engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <Card key={idx} className="bg-card/50 border-white/5 hover:border-primary/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-xs font-mono opacity-20 group-hover:opacity-40 transition-opacity">0{idx + 1}</div>
              <CardContent className="pt-8 pb-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-headline">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
