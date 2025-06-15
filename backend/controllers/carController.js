import Car from '../models/Car.js';

// Obtenir les voitures disponibles
export const getAvailableCars = async (req, res) => {
  const { location } = req.query;

  try {
    const cars = await Car.find({ location });

    if (cars.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucune voiture disponible pour la destination spécifiée.",
      });
    }

    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};