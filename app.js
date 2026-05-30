// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Declare any necessary variables or in-memory data structures here
// Track alarms with fields for medicine name, alarm time, and status
let alarms = [
    { id: 1, medicineName: 'Paracetamol', time: '08:00', status: 'Active' },
    { id: 2, medicineName: 'Vitamin C', time: '13:30', status: 'Active' }
];

// TASK: Define appropriate routes below
// ---------------------------------------------------

// 1. Define a route to render the index page (View all alarms)
app.get('/', (req, res) => {
    res.render('index', { alarms: alarms });
});

// 2. Define a route to render the "Add Medicine Alarm" page
app.get('/add', (req, res) => {
    res.render('add');
});

// 3. Define a route to handle submission of a new alarm form
app.post('/add', (req, res) => {
    const { medicineName, time } = req.body;
    
    // Generate a simple incremented unique ID
    const newId = alarms.length > 0 ? alarms[alarms.length - 1].id + 1 : 1;
    
    const newAlarm = {
        id: newId,
        medicineName: medicineName,
        time: time,
        status: 'Active'
    };
    
    alarms.push(newAlarm);
    res.redirect('/');
});

// 4. Define a route to handle removing an alarm schedule
app.post('/delete/:id', (req, res) => {
    const alarmId = parseInt(req.params.id);
    alarms = alarms.filter(alarm => alarm.id !== alarmId);
    res.redirect('/');
});

// ---------------------------------------------------

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});