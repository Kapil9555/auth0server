import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use('/auth', authRouter);

app.listen(5000, () => console.log("Server running on port 5000"));
