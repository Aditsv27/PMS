const Appointment = require('../models/Appointment');
const User = require('../models/User');
const mongoose = require('mongoose');// Create an appointment
// exports.createAppointment = async (req, res) => {
//     try {
//         const { doctorId, date, time, reason } = req.body;

//         if (!doctorId || !date || !time || !reason) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         const appointment = new Appointment({
//             patientId: req.user.id, // Patient creating the appointment
//             doctorId,
//             date,
//             time,
//             reason
//         });

//         await appointment.save();
//         res.status(201).json({ message: 'Appointment created successfully', appointment });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };


exports.createAppointment = async (req, res) => {
    try {
      const { doctor, patient, date, time, reason } = req.body;
  
      // Validate ObjectId format for doctor and patient
      if (!mongoose.Types.ObjectId.isValid(doctor) || !mongoose.Types.ObjectId.isValid(patient)) {
        return res.status(400).json({ message: 'Invalid doctor or patient ID' });
      }
  
      const appointment = new Appointment({
        doctor,
        patient,
        date,
        time,
        reason,
      });
  
      await appointment.save();
      res.status(201).json({ message: 'Appointment created successfully', appointment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };

// Get appointments
exports.getAppointments = async (req, res) => {
    try {
        const role = req.user.role;

        let appointments;
        if (role === 'Admin') {
            appointments = await Appointment.find(); // Admin can view all appointments
        } else if (role === 'Doctor') {
            appointments = await Appointment.find({ doctorId: req.user.id }); // Doctor can view their appointments
        } else if (role === 'Patient') {
            appointments = await Appointment.find({ patientId: req.user.id }); // Patient can view their appointments
        } else {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        res.status(200).json({ appointments });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update an appointment
// exports.updateAppointment = async (req, res) => {
//     try {
//         const { appointmentId } = req.params;
//         const { date, time, reason } = req.body;

//         const appointment = await Appointment.findById(appointmentId);

//         if (!appointment) {
//             return res.status(404).json({ message: 'Appointment not found' });
//         }

//         // Role-based access control
//         if (
//             req.user.role === 'Patient' && appointment.patientId.toString() !== req.user.id ||
//             req.user.role === 'Doctor' && appointment.doctorId.toString() !== req.user.id
//         ) {
//             return res.status(403).json({ message: 'Unauthorized access' });
//         }

//         appointment.date = date || appointment.date;
//         appointment.time = time || appointment.time;
//         appointment.reason = reason || appointment.reason;

//         await appointment.save();
//         res.status(200).json({ message: 'Appointment updated successfully', appointment });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };
// Update an appointment
exports.updateAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { date, time, reason } = req.body;

        // Check if the appointment ID is valid
        if (!appointmentId) {
            return res.status(400).json({ message: 'Appointment ID is required' });
        }

        const appointment = await Appointment.findById(appointmentId);

        // If no appointment is found
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Ensure `req.user` exists and contains valid properties
        if (!req.user || !req.user.role || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: Missing or invalid user information' });
        }

        //Role-based access control
        if (
            (req.user.role === 'Patient' && appointment.patient.toString() !== req.user.id)   // Doctor can only update their assigned appointments
        ) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Update appointment fields
        appointment.date = date || appointment.date;
        appointment.time = time || appointment.time;
        appointment.reason = reason || appointment.reason;

        await appointment.save();

        res.status(200).json({
            message: 'Appointment updated successfully',
            appointment,
        });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};


// Delete an appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Validate if the appointment ID is provided
        if (!appointmentId) {
            return res.status(400).json({ message: 'Appointment ID is required' });
        }

        // Find the appointment
        const appointment = await Appointment.findById(appointmentId);

        // If the appointment is not found
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Ensure req.user and its properties exist
        if (!req.user || !req.user.role || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: Missing user information' });
        }

        // Role-based access control
        if (
            (req.user.role === 'Patient' && appointment.patient.toString() !== req.user.id) || 
            (req.user.role === 'Doctor' && appointment.doctor.toString() !== req.user.id)
        ) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Admin or authorized user deletes the appointment
        await appointment.deleteOne();
        return res.status(200).json({ message: 'Appointment deleted successfully' });

    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
