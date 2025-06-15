import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  departure: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  price: { type: Number, required: true },
  availableSeats: { type: Number, default: 100 },
  image: { type: String, required: true },
});

export default mongoose.model('Flight', flightSchema);
