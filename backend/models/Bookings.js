const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['flight', 'hotel', 'car'],
    required: true
  },
  referenceId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);