
'use server';

import { z } from 'zod';

// Simple in-memory "database" for leads (resets on deploy)
let leads: any[] = [];

const InquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  businessType: z.string().min(2, "Business type is required"),
  message: z.string().optional(),
});

export async function submitInquiry(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    businessType: formData.get('businessType'),
    message: formData.get('message'),
  };

  const validatedData = InquirySchema.safeParse(rawData);

  if (!validatedData.success) {
    return { success: false, errors: validatedData.error.flatten().fieldErrors };
  }

  const newInquiry = {
    ...validatedData.data,
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString(),
  };

  // In a real app, this would be a database call
  leads.push(newInquiry);
  
  return { success: true };
}

export async function getLeads() {
  // Simple "admin" check would go here
  return leads.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
