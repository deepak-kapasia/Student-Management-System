const Student = require('../models/Student');

// @desc    Get all students (with pagination, search, filter, sort)
// @route   GET /api/students
// @access  Private
const getStudents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, course, semester, gender, sort } = req.query;

    let query = { createdBy: req.user.id };

    // Search by name or rollNumber
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter
    if (course) query.course = course;
    if (semester) query.semester = semester;
    if (gender) query.gender = gender;

    // Sorting
    let sortOptions = { createdAt: -1 };
    if (sort === 'name') sortOptions = { name: 1 };
    else if (sort === 'attendance') sortOptions = { attendance: -1 };
    else if (sort === 'admissionDate') sortOptions = { admissionDate: -1 };

    const students = await Student.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Student.countDocuments(query);

    res.json({
      students,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalStudents: count,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
const getStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    // Make sure the logged in user matches the student creator
    if (student.createdBy.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
};

// @desc    Add new student
// @route   POST /api/students
// @access  Private
const addStudent = async (req, res, next) => {
  try {
    const studentData = { ...req.body, createdBy: req.user.id };
    const student = await Student.create(studentData);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    // Make sure the logged in user matches the student creator
    if (student.createdBy.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private
const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404);
      throw new Error('Student not found');
    }

    // Make sure the logged in user matches the student creator
    if (student.createdBy.toString() !== req.user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await student.deleteOne();
    res.json({ id: req.params.id, message: 'Student deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStudents,
  getStudent,
  addStudent,
  updateStudent,
  deleteStudent,
};
