
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Copy, Check } from "lucide-react";
import { generateReelCaptionAndHashtags } from "@/ai/flows/generate-reel-caption-and-hashtags-flow";
import { useToast } from "@/hooks/use-toast";

export function CaptionTool() {
  const [concept, setConcept] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ captions: string[], hashtags: string[] } | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!concept.trim()) {
      toast({ variant: "destructive", title: "Concept required", description: "Please enter a concept for your reel." });
      return;
    }

    setLoading(true);
    try {
      const output = await generateReelCaptionAndHashtags({ concept });
      setResult(output);
    } catch (error) {
      toast({ variant: "destructive", title: "Generation failed", description: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast({ title: "Copied!", description: "Content copied to clipboard." });
  };

  return (
    <section id="ai-tool" className="py-24 px-4 bg-gradient-to-b from-transparent to-primary/5">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-headline">ReelsPulse AI</h2>
          <p className="text-muted-foreground text-lg">
            Generate optimized captions and trending hashtags in seconds.
          </p>
        </div>

        <Card className="glass-panel border-white/5 overflow-hidden shadow-2xl">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Describe your Reel concept</label>
              <Textarea 
                placeholder="Example: A cinematic day-in-the-life of a digital nomad in Bali..."
                className="min-h-[120px] bg-background/50 border-white/10 focus:border-accent resize-none text-md"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleGenerate} 
              disabled={loading}
              className="w-full h-12 text-md font-semibold bg-accent text-background hover:bg-accent/90"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-background/20 border-t-background rounded-full animate-spin" />
                  Generating Magic...
                </div>
              ) : "Generate Content"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-headline">Captions</h3>
              {result.captions.map((caption, idx) => (
                <Card key={idx} className="bg-card/50 border-white/5 relative group">
                  <CardContent className="p-4 pr-12 text-sm leading-relaxed">
                    {caption}
                    <button 
                      onClick={() => copyToClipboard(caption, idx)}
                      className="absolute top-2 right-2 p-2 rounded-md hover:bg-white/10 text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      {copiedIndex === idx ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-headline">Hashtags</h3>
              <Card className="bg-card/50 border-white/5 h-fit">
                <CardContent className="p-6 flex flex-wrap gap-2">
                  {result.hashtags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-medium border border-primary/30">
                      {tag}
                    </span>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 border border-white/5 hover:bg-white/5"
                    onClick={() => copyToClipboard(result.hashtags.join(' '), 99)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All Hashtags
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
