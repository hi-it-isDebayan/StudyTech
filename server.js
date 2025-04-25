const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
const User = require('./models/User'); // Make sure this path is correct

const app = express();
const port = 3000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/student-portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Set EJS and Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', async (req, res) => {
    const { name, code } = req.body;
    try {
        let user = await User.findOne({ name, code });

        if (!user) {
            user = new User({ name, code, status: 'online' });
            await user.save();
        } else {
            user.status = 'online';
            await user.save();
        }

        req.session.user = user;
        res.send(`Welcome ${name}, you are now logged in!`);
        // You can also redirect to a dashboard here
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send("An error occurred during login.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
