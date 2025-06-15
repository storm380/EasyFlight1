import Flight from '../models/Flight.js';

// Obtenir les vols disponibles
export const getAvailableFlights = async (req, res) => {
    const { departure, destination, date } = req.query;
    // console.log(req.query)
    try {
      const startDate = new Date(date);
      const endDate = new Date(date);
      // console.log(typeof date)
      endDate.setDate(startDate.getDate() + 1); // couvre toute la journée
      // console.log(endDate, startDate)
      console.log(startDate, new Date(date))
      
      const flights = await Flight.aggregate([
        {
          $match: {
            departure: departure,
            destination: destination
          }
        }
      ]);
      // console.log("flights : ", flights[0].date, startDate)

      if (flights.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Aucun vol disponible pour les critères spécifiés.",
        });
      }
  
      res.status(200).json({ success: true, data: flights });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  export const getAllFlights = async (req, res) => {
    // console.log(req.query)
    try {
     
      const flights = await Flight.find({}) 

      if (flights.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Aucun vol disponible.",
        });
      }
  
      res.status(200).json({ success: true, data: flights });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  

// Réserver un vol
export const bookFlight = async (req, res) => {
  const { id } = req.params;

  try {
    const flight = await Flight.findById(id);

    if (!flight || flight.availableSeats <= 0) {
      return res.status(400).json({
        success: false,
        message: "Vol non disponible ou places épuisées.",
      });
    }

    flight.availableSeats -= 1;
    await flight.save();

    res.status(200).json({
      success: true,
      message: "Réservation réussie.",
      data: flight,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const createFlight = async (req, res) => {
  try {
    const flightData = {
      ...req.body,
      date: req.body.date
        ? new Date(new Date(req.body.date).setHours(0, 0, 0, 0))
        : new Date(new Date().setHours(0, 0, 0, 0))
    };

    const newFlight = new Flight(flightData);
    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
