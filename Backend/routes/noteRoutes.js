const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// Save or update a note
router.post('/:roomId', async (req, res) => {
  const { roomId } = req.params;
  const { content } = req.body;

  try {
    let note = await Note.findOne({ roomId });
    if (!note) {
      note = new Note({ roomId, content });
    } else {
      note.content = content;
    }
    await note.save();
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save note' });
  }
});

// Get a note by roomId
router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params;
  try {
    const note = await Note.findOne({ roomId });
    res.status(200).json(note || { content: '' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

module.exports = router;