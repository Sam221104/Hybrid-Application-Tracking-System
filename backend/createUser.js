//used to create the username and password for admin and bot
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // adjust path if needed

async function createUser(username, plaintext, role) {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(plaintext, salt);

  const existing = await User.findOne({ username });
  if (existing) {
    console.log('User exists, updating password & role...');
    existing.passwordHash = passwordHash;
    existing.role = role;
    await existing.save();
    console.log('Updated:', existing);
  } else {
    const u = await User.create({ username, passwordHash, role });
    console.log('Created user:', u);
  }
  await mongoose.disconnect();
}

// change values as needed
//createUser('admin', 'admin@123', 'admin').catch(console.error);
//createUser('atsBot', 'bot@123', 'bot').catch(console.error);
