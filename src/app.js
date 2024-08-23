// this is app.js

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRoutes from './routes/user.route.js';
import testRoutes from './routes/test.route.js';
import submissionRoutes from './routes/submission.route.js';

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cookieParser())



// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/submissions', submissionRoutes);

export {app}
