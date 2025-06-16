// models/Lead.js
import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  website: { type: String, default: '' },
  category: { type: String, default: '' },
  
  // Business source
  source: { type: String, default: 'Google Maps' },
  extractedBy: { type: String, default: '' }, // e.g., 'Chrome Extension'

  // Reach-out logic
  assignedTo: { type: String, default: '' }, // agent name or ID
  reachStatus: { type: String, enum: ['pending', 'in-progress', 'contacted', 'converted', 'dead'], default: 'pending' },
  contactedVia: { type: String, enum: ['phone', 'email', 'whatsapp', 'none'], default: 'none' },
  aiFollowupNote: { type: String, default: '' },  // AI-generated message or summary
  humanFollowupNote: { type: String, default: '' },  // Actual agent input
  followupDate: { type: Date },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema);
