import express from 'express'

const router = express.Router();
import { getAvailableCars } from '../controllers/carController.js';

// Obtenir les voitures disponibles
router.get('/cars', getAvailableCars);

export default router;