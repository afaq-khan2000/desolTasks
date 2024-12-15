const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    images: [String],
});

module.exports = mongoose.model('Car', CarSchema);
