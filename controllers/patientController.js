const Patient = require('../models/Patient');

exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate('doctor', 'name');
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching patients', error });
    }
};

exports.createPatient = async (req, res) => {
    try {
        const { name, age, doctor } = req.body;
        const patient = new Patient({ name, age, doctor });
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Error creating patient', error });
    }
};
// Update a patient record
exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, doctor } = req.body;

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Role-based access control: Only Admins and Doctors can update
        if (req.user.role === 'Patient' && patient.doctor.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        patient.name = name || patient.name;
        patient.age = age || patient.age;
        patient.doctor = doctor || patient.doctor;

        await patient.save();
        res.status(200).json({ message: 'Patient updated successfully', patient });
    } catch (error) {
        res.status(500).json({ message: 'Error updating patient', error: error.message });
    }
};

// Delete a patient record
exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;

        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Role-based access control: Only Admins can delete
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        await patient.deleteOne();
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting patient', error: error.message });
    }
};