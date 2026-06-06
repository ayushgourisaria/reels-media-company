
import { CheckCircle2, FastForward } from "lucide-react";

const steps = [
  { title: "Idea & Hook", description: "Viral concepts sourced from trending data." },
  { title: "Fast Scripting", description: "High-retention structure built in minutes." },
  { title: "Rapid Content", description: "Final edit delivered straight to your feed." },
];

export function Timeline() {
  return (
    <section className="py-24 px-6 bg-secondary/10 rounded-3xl mx-4">
      <div className="max-w-5xl mx-auto space-y-16 text-center">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
            <FastForward className="w-4 h-4" />
            Super Fast Production
          </div>
          <h2 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">From Idea to Content.</h2>
          <p className="text-muted-foreground text-lg">Our streamlined process gets you ready-to-post faster than any agency.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-2xl border border-white/5 bg-background text-left space-y-4 shadow-sm group hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {idx + 1}
              </div>
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
              <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase">
                <CheckCircle2 className="w-4 h-4" />
                Done Fast
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
