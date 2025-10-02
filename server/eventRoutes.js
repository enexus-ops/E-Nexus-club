const express = require('express');
const router = express.Router();
const Event = require('./Event');

// POST: Create a new event
router.post('/', async (req, res) => {
  try {
    const { title, description, category, dateTime, venue, image, organizer, registrationLink } = req.body;
    const newEvent = new Event({
      title,
      description,
      category,
      dateTime,
      venue,
      image,
      organizer,
      registrationLink
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET: Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ dateTime: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// GET: Get single event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;