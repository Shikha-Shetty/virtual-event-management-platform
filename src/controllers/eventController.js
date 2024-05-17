const Event = require('../models/Event');
const User = require('../models/User');

const createEvent = async (req, res) => {
    if (req.user.role !== 'organizer') {
        return res.status(403).json({ message: 'Forbidden: Only admin users can perform this operation' });
    }
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


const viewEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const viewEventByID = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateEvent = async (req, res) => {
    if (req.user.role !== 'organizer') {
        return res.status(403).json({ message: 'Forbidden: Only admin users can perform this operation' });
    }
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        Object.assign(event, req.body);
        await event.save();
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteEvent = async (req, res) => {
    if (req.user.role !== 'organizer') {
        return res.status(403).json({ message: 'Forbidden: Only admin users can perform this operation' });
    }
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const registerUserForEvent = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user._id;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user is already registered for the event
        if (event.participants.includes(userId)) {
            return res.status(400).json({ message: 'User already registered for the event' });
        }

        event.participants.push(userId);
        await event.save();

        res.json({ message: 'User registered for the event successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { createEvent, updateEvent, viewEvents, viewEventByID, deleteEvent, registerUserForEvent };


