const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    rollNumber: {
      type: String,
      required: [true, 'Please add a roll number'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      match: [/^\d+$/, 'Phone number must contain only digits'],
    },
    gender: {
      type: String,
      required: [true, 'Please specify gender'],
      enum: ['Male', 'Female', 'Other'],
    },
    course: {
      type: String,
      required: [true, 'Please add a course'],
    },
    semester: {
      type: String,
      required: [true, 'Please add a semester'],
    },
    attendance: {
      type: Number,
      required: [true, 'Please add attendance percentage'],
      min: 0,
      max: 100,
    },
    dob: {
      type: Date,
      required: [true, 'Please add date of birth'],
    },
    admissionDate: {
      type: Date,
      required: [true, 'Please add admission date'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    profilePhoto: {
      type: String,
      default: '', // Optional profile photo URL
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
