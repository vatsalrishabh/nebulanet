// app/api/leadGeneration/chromeMapExtension/route.js
import { NextResponse } from 'next/server';
import connectDb from '../../config/db';
import Lead from '../../models/Leads';

// @POST - /api/leadGeneration/chromeMapExtension
export async function POST(request) {
  await connectDb();
  try {
    const data = await request.json();
    console.log('Received lead data:', data);

    const newLead = await Lead.create({
      name: data.name || '',
      phone: data.phone || '',
      address: data.address || '',
      website: data.website || '',
      category: data.category || '',
      source: 'Google Maps',
      extractedBy: 'Chrome Extension',
    });

    return NextResponse.json({ success: true, lead: newLead }, { status: 201 });
  } catch (error) {
    console.error('Lead saving error:', error);
    return NextResponse.json({ error: 'Lead save failed' }, { status: 500 });
  }
}
