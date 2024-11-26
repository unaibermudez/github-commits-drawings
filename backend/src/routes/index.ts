import express from 'express';
import { getItems } from '../controllers/itemController';

const router = express.Router();

// Define routes
router.get('/items', getItems);


export default router;
