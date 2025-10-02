const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Hackathon, Workshop, Meetup
  dateTime: { type: Date, required: true },
  venue: { type: String, required: true },
  image: { type: String }, // URL or base64
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;