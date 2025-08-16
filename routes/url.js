import express from 'express';
import {handleGenerateShortUrl,handleUrlById,hanleGetAnalaytics} from '../controllers/url.js';

const router = express.Router();

router.post('/',handleGenerateShortUrl);

router.get('/:shortId',handleUrlById)

router.get('/analaytics/:shortId',hanleGetAnalaytics)

export default router;