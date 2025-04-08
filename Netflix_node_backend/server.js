const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));