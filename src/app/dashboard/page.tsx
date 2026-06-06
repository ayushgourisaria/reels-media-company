
'use client';

import { useEffect, useState } from 'react';
import { getLeads } from '@/app/lib/actions';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Phone, Mail, Calendar } from "lucide-react";
import Link from 'next/link';

export default function Dashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeads() {
      const data = await getLeads();
      setLeads(data);
      setLoading(false);
    }
    loadLeads();
  }, []);

  return (
    <main className="min-h-screen bg-background p-6 md:p-12 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <Link href="/" className="hover:underline flex items-center gap-1 text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Site
              </Link>
            </div>
            <h1 className="text-4xl font-bold font-headline">Lead Dashboard</h1>
            <p className="text-muted-foreground">Admin view for Ayush Gourisaria</p>
          </div>
          <div className="flex gap-4">
             <Badge variant="outline" className="px-4 py-2 text-md border-primary/20 bg-primary/5 text-primary">
              {leads.length} Total Requests
             </Badge>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <Card key={i} className="h-48 animate-pulse bg-white/5 border-white/5" />
            ))}
          </div>
        ) : leads.length === 0 ? (
          <Card className="bg-card/50 border-white/5 border-dashed py-20">
            <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">No Leads Yet</h3>
              <p className="text-muted-foreground max-w-xs">New business inquiries will appear here as soon as potential clients fill out the contact form.</p>
              <Button asChild variant="outline">
                <Link href="/#contact">Test Form</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            <Card className="bg-card/50 border-white/5 overflow-hidden">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow>
                    <TableHead className="w-[200px]">Client</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Business / Niche</TableHead>
                    <TableHead>Received</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-white/5 transition-colors">
                      <TableCell className="font-bold">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                            {lead.name.charAt(0)}
                          </div>
                          {lead.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail className="w-3 h-3" /> {lead.email}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                          {lead.businessType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.timestamp).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="hover:text-primary">
                          View Message
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leads.slice(0, 3).map((lead) => (
                <Card key={lead.id} className="bg-card/30 border-white/5 group hover:border-primary/30 transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg flex justify-between">
                      {lead.name}
                      <span className="text-xs font-normal text-muted-foreground">{new Date(lead.timestamp).getHours()}:{new Date(lead.timestamp).getMinutes()}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 italic">
                      "{lead.message || "No message provided"}"
                    </p>
                    <div className="pt-2">
                       <Button size="sm" className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white border-0 transition-all">
                        Quick Reply
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
