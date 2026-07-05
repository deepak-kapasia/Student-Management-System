const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');

// Add protect middleware to all routes
router.route('/').get(protect, getStudents).post(protect, addStudent);
router
  .route('/:id')
  .get(protect, getStudent)
  .put(protect, updateStudent)
  .delete(protect, deleteStudent);

module.exports = router;
