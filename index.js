import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from "cors"
import Controller from './controller.js';



dotenv.config();

const app = express();

app.use(cors());

// If you want to restrict to only your frontend origin:
app.use(cors({
  origin: "http://127.0.0.1:5500", // or "http://localhost:5500"
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error(' MongoDB connection error:', err));


// Routes
app.use("/api/user",Controller)




// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
