import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  availableRooms: { type: Number, default: 10 },
  image: { type: String, required: true }, // URL ou chemin de l'image
});

export default mongoose.model('Hotel', hotelSchema);