import Hotel from '../models/Hotel.js';


// Obtenir les hôtels disponibles
export const getAvailableHotels = async (req, res) => {
  const { location } = req.query;

  try {
    const hotels = await Hotel.find({ location });

    if (hotels.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucun hôtel disponible pour la destination spécifiée.",
      });
    }

    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};