const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    important: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Note', NoteSchema);
