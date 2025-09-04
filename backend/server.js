import dotenv from 'dotenv';
dotenv.config(); // ✅ Load env first

import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';

// Import Routes
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import trainerRoutes from './routes/trainerRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import planRoutes from './routes/planRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import coachRoutes from "./routes/coachRoutes.js";
import userRoutes from './routes/userRoutes.js';
import membershipRoutes from './routes/membershipRoutes.js';
import supplementRoutes from './routes/supplementRoutes.js';
import dietRoutes from './routes/dietRoutes.js';
import notificationRoutes from "./routes/notificationRoutes.js";
import billRoutes from "./routes/billRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();
// ✅ CORS config
const whitelist = [
  'http://localhost:5173',                  // Local dev
  'https://gym-ivory-kappa.vercel.app',    // Old Vercel frontend
  'https://gym-6h9gsm6bz-chetturu-khaleels-projects.vercel.app', // New Vercel frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or server-to-server requests)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/users', userRoutes);
app.use('/api/membership', membershipRoutes);
// Add to app middleware
app.use('/api/supplements', supplementRoutes);
app.use('/api/diets', dietRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/billing", billRoutes);
// ✅ Test route
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
