const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Todo',
  new mongoose.Schema(
    {
      title: String,
      content: String,
      tags: [String],
      expired: Date,
      completed: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    },
  ),
);
