import express from 'express';
import connectDB from './connect.js';
import urlRoutes from './routes/url.js';
import Url from './models/url.js';
import staticRouter from './routes/staticRouter.js';
import userRoutes from './routes/user.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import {restrictToLoggedinUserOnly,checkAuth} from './middleware/auth.js';

const app = express();
const port = 8000;
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/url', restrictToLoggedinUserOnly,urlRoutes);
app.use('/user', userRoutes);
app.use('/',checkAuth, staticRouter);
connectDB('mongodb://127.0.0.1:27017/url-shortner').then(() =>  console.log('Connected to MongoDB'))
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


app.listen(port,()=> console.log(`Server is running on http://localhost:${port}`));