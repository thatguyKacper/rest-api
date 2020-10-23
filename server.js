const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');
const { connect } = require('http2');

const app = express();

app.use(cors({ origin: 'http://localhost:8000', methods: 'GET, POST, PUT, DELETE' }));

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(express.json());

app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});
