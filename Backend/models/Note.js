const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  content: { type: String, default: '' },
});

module.exports = mongoose.model('Note', noteSchema);