import express from 'express'

const router = express.Router();
import { getAvailableFlights, bookFlight, createFlight, getAllFlights } from '../controllers/flightController.js';
import Flight from '../models/Flight.js';

// Obtenir les vols disponibles
router.get('/', getAvailableFlights);
router.get('/all', getAllFlights);
router.post('/', createFlight);
// Update flight
router.put('/:id', async (req, res) => {
    try {
      // Si une date est fournie, on la tronque à minuit
      if (req.body.date) {
        req.body.date = new Date(new Date(req.body.date).setHours(0, 0, 0, 0));
      }
  
      const updatedFlight = await Flight.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.json(updatedFlight);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  
  // Delete flight
  router.delete('/:id', async (req, res) => {
    try {
      await Flight.findByIdAndDelete(req.params.id);
      res.json({ message: 'Flight deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Réserver un vol
router.post('/:id/book', bookFlight);

export default router;
