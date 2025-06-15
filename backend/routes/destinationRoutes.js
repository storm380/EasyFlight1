import express from 'express'

const router = express.Router();
import { getDestinationDetails } from '../controllers/destinationController.js';

// Obtenir les hôtels et voitures pour une destination spécifique
router.get('/destination/:destination', getDestinationDetails);

export default router;