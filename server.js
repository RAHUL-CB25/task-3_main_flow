const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS)
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mainflow')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Serve Signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Serve Login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// // Signup route
// app.post('/signup', async (req, res) => {
//     const { username, email, password } = req.body;
    
//     try {
//         // Check if the email already exists
//         const userExists = await User.findOne({ email });
//         if (userExists) return res.status(400).send("Email already registered");
        
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
        
//         // Create a new user
//         const newUser = new User({ username, email, password: hashedPassword });
//         await newUser.save();
        
//         res.redirect('/login');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server error");
//     }
// });

// // Login route
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;
    
//     try {
//         // Check if the email exists
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).send("Email not found");
        
//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).send("Invalid password");
        
//         // Successful login
//         res.send("Login successful");
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server error");
//     }
// });

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if the email already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already registered" });
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        
        // Send success message or redirect URL
        res.json({ message: "Signup successful", redirectUrl: '/login' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Email not found" });
        
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });
        
        // Successful login
        res.json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});


// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
