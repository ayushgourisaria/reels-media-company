
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { submitInquiry } from "@/app/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await submitInquiry(formData);
      if (result.success) {
        toast({ title: "Inquiry Sent", description: "Ayush Gourisaria will contact you soon." });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({ variant: "destructive", title: "Error", description: "Please fill out all required fields correctly." });
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to send inquiry. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 px-4 bg-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold font-headline">Ready to Scale?</h2>
              <p className="text-muted-foreground text-lg">
                Join high-performing creators and brands leveraging Reels Media Company's systems.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase">Email Us</div>
                  <div className="font-medium">contact@reelsmedia.company</div>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-background transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase">Call Founder</div>
                  <div className="font-medium">+91-9830555997</div>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-white/10 group-hover:text-white transition-all">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase">Founder</div>
                  <div className="font-medium">Ayush Gourisaria</div>
                </div>
              </div>
            </div>
          </div>

          <Card className="glass-panel border-white/5 p-2">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input name="name" required placeholder="John Doe" className="bg-background/50 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input name="email" type="email" required placeholder="john@example.com" className="bg-background/50 border-white/10" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input name="phone" required placeholder="+91 98XXX XXXXX" className="bg-background/50 border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Business / Niche</label>
                    <Input name="businessType" required placeholder="Fitness / Tech / Lifestyle" className="bg-background/50 border-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message (Optional)</label>
                  <Textarea name="message" placeholder="Tell us about your goals..." className="bg-background/50 border-white/10 min-h-[100px] resize-none" />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-12 bg-primary hover:bg-primary/90 font-bold">
                  {loading ? "Sending..." : "Book My Free Consultation"}
                </Button>
                <p className="text-[10px] text-center text-muted-foreground pt-2">
                  By submitting, you agree to be contacted regarding our services at Reels Media Company.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
