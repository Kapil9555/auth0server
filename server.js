import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', async (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use('/auth', authRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
