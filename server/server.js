const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const carRoutes = require('./routes/car');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
