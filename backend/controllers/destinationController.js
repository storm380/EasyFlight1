import Hotel from '../models/Hotel.js';
import Car from '../models/Car.js';

// Obtenir les hôtels et voitures pour une destination spécifique
export const getDestinationDetails = async (req, res) => {
  const { destination } = req.params;

  try {
    const hotels = await Hotel.find({ location: destination });
    const cars = await Car.find({ location: destination });

    res.status(200).json({
      success: true,
      data: {
        hotels,
        cars,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};