// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;
// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:',err));

// User model
const userSchema = new mongoose.Schema({
    username: { type: 'String', required: true },
    email: { type: 'String', unique: true },
    password: { type: 'String', required:true}
});
const User = mongoose.model('User', userSchema);

// server.js (update the user model save hook)
/*const bcrypt = require('bcryptjs');

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
// Routes
app.post('/Signup', async (req, res) => {
    const {username, email, password} = req.body; 
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        res.status(201).json(savedUser);
    } catch (err) {
        console.error('Error saving user:', err.message); 
        res.status(400).json({ error: err.message });
    }
});*/
// signup
app.post('/Signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(400).json({ message: 'Error in signing up', error: error.message });
    }
  });
//login
app.post('/Login', async (req, res) => {
    const { username, password } = req.body;
    try {
      console.log('Login attempt with username:', username);
      const user = await User.findOne({ username });
      if (!user) {
        console.warn('Login attempt failed because invalid username:', username);
        return res.status(400).json({ message: 'Invalid username or password' });
      }
      console.log('Retrieved user:', user);
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch);
      
      if (!isMatch) {
        console.warn('Login attempt failed because incorrect password for user:', username);
        return res.status(400).json({ message: 'Invalid username or password' });
      }
      res.status(200).json({ message: 'Logged in successfully' });
    } catch (error) {
        console.error('Login error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });  

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
