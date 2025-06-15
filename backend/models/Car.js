import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  location: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  availableCars: { type: Number, default: 5 },
  image: { type: String, required: true }, // URL ou chemin de l'image
});

export default mongoose.model('Car', carSchema);