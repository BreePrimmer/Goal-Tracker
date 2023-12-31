const { mongoose, Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');

const goalSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: String,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp)
  }
});

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    default: 'General'
  },
  goals: [
    goalSchema
  ]
});

const todoScema = new Schema({
  text: {
    type: String,
    required: true
  }
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  categories: [
    categorySchema
  ],
  todos : [
    todoScema
  ]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew) {
    // Create the "General" category only for new users
    this.categories = [{ name: 'General' }];
  }

  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
