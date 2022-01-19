const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      uppercase: true,
      required: true,
    },
    lastName: {
      type: String,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'company'],
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
