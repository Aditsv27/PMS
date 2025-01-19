const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Routes for appointment management
router.post(
    '/',
    authMiddleware,
    roleMiddleware(['Patient']),
    appointmentController.createAppointment
); // Patients can create appointments

router.get(
    '/',
    authMiddleware,
    roleMiddleware(['Admin', 'Doctor', 'Patient']),
    appointmentController.getAppointments
); // Admin, Doctor, and Patient can get appointments

router.put(
    '/:appointmentId',
    authMiddleware,
    roleMiddleware(['Doctor', 'Patient']),
    appointmentController.updateAppointment
); // Doctors and Patients can update their appointments

router.delete(
    '/:appointmentId',
    authMiddleware,
    roleMiddleware(['Admin', 'Patient']),
    appointmentController.deleteAppointment
); // Admin and Patient can delete appointments

module.exports = router;
