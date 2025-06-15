import express from 'express'

const router = express.Router();
import { getAvailableHotels } from '../controllers/hotelController.js';

// Obtenir les hôtels disponibles
router.get('/hotels', getAvailableHotels);

export default router;