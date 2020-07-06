const express = require('express');

// Route files
const students = require('./routes/students');
const subjects = require('./routes/subjects');

// middleware
const logger = require('./middleware/logger');

const app = express();

app.use(express.json());

// Mount middleware
app.use(logger);

// Mount routers
app.use('/api/v1/students', students);
app.use('/api/v1/subjects', subjects);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
