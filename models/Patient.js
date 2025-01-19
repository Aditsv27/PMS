const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    records: { type: String }, // Store patient-specific records
});

module.exports = mongoose.model('Patient', PatientSchema);
