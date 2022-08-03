const express = require('express');
const app = express();
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000

connectDB();
app.get('/', (req, res) => res.send('Api running'));
app.use(express.json({ extended: false}));
app.use('/api/users', require('./routes/api/user'));
app.use('/api/tasks', require('./routes/api/task'));

app.listen(PORT, () => console.log(`server running on port ${PORT}`));