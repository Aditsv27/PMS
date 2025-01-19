const express = require('express');
const { getPatients, createPatient,updatePatient,
    deletePatient, } = require('../controllers/patientController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', authMiddleware, roleMiddleware(['Admin', 'Doctor']), getPatients);
router.post('/', authMiddleware, roleMiddleware(['Admin', 'Doctor']), createPatient);
router.put('/:id', authMiddleware, roleMiddleware(['Admin', 'Doctor']), updatePatient); // Update a patient
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deletePatient); // Delete a patient
module.exports = router;
