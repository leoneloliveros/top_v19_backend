const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CreditCardSchema = new mongoose.Schema({
  expMonth: {
    type: String,
    require: true,
    trim: true,
  },
  expYear: {
    type: String,
    require: true,
    trim: true,
  },
  name: {
    type: String,
    require: true,
    trim: true,
  },
  mask: {
    type: String,
    require: true,
    trim: true,
  },
  tokenId: {
    type: String,
    require: true,
    trim: true,
  },
});

const BillingSchema = new mongoose.Schema({
  creditCards: [CreditCardSchema],
  customerId: String, //[{platform: 'epayco', id: ''}, {platform: 'paypal', id: ''}]
});

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
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
    billing: BillingSchema,
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function (next) {
  const user = this;
  try {
    if (!user.isModified('password')) {
      return next();
    }

    //Generate a password hash
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  try {
    return await bcrypt.compare(candidatePassword, user.password);
  } catch (error) {
    throw error;
  }
};

UserSchema.virtual('profile').get(function () {
  const { firstName, email, role } = this;
  return { description: `${firstName} con role ${role}`, email };
});

module.exports = mongoose.model('User', UserSchema);
