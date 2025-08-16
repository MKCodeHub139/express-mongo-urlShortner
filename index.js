import express from 'express';
import connectDB from './connect.js';
import urlRoutes from './routes/url.js';

const app = express();
const port = 8000;
connectDB('mongodb://127.0.0.1:27017/url-shortner').then(() =>  console.log('Connected to MongoDB'))
app.use(express.json());
app.use('/url', urlRoutes);

app.listen(port,()=> console.log(`Server is running on http://localhost:${port}`));