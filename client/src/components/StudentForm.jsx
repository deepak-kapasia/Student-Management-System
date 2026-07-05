import { useState, useEffect } from 'react';

const StudentForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phone: '',
    gender: '',
    course: '',
    semester: '',
    attendance: '',
    dob: '',
    admissionDate: '',
    address: '',
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // Format dates for input fields (YYYY-MM-DD)
      const formattedData = { ...initialData };
      if (formattedData.dob) formattedData.dob = formattedData.dob.substring(0, 10);
      if (formattedData.admissionDate) formattedData.admissionDate = formattedData.admissionDate.substring(0, 10);
      setFormData(formattedData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.rollNumber) newErrors.rollNumber = 'Roll Number is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = 'Phone must contain only digits';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.semester) newErrors.semester = 'Semester is required';
    
    if (formData.attendance === '') {
      newErrors.attendance = 'Attendance is required';
    } else if (isNaN(formData.attendance) || formData.attendance < 0 || formData.attendance > 100) {
      newErrors.attendance = 'Attendance must be between 0 and 100';
    }
    
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.admissionDate) newErrors.admissionDate = 'Admission date is required';
    if (!formData.address) newErrors.address = 'Address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error-text">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label>Roll Number *</label>
          <input
            type="text"
            name="rollNumber"
            className="form-control"
            value={formData.rollNumber}
            onChange={handleChange}
          />
          {errors.rollNumber && <div className="error-text">{errors.rollNumber}</div>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="error-text">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <select
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <div className="error-text">{errors.gender}</div>}
        </div>

        <div className="form-group">
          <label>Course *</label>
          <input
            type="text"
            name="course"
            className="form-control"
            value={formData.course}
            onChange={handleChange}
          />
          {errors.course && <div className="error-text">{errors.course}</div>}
        </div>

        <div className="form-group">
          <label>Semester *</label>
          <input
            type="text"
            name="semester"
            className="form-control"
            value={formData.semester}
            onChange={handleChange}
          />
          {errors.semester && <div className="error-text">{errors.semester}</div>}
        </div>

        <div className="form-group">
          <label>Attendance % *</label>
          <input
            type="number"
            name="attendance"
            className="form-control"
            value={formData.attendance}
            onChange={handleChange}
            min="0"
            max="100"
          />
          {errors.attendance && <div className="error-text">{errors.attendance}</div>}
        </div>

        <div className="form-group">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <div className="error-text">{errors.dob}</div>}
        </div>

        <div className="form-group">
          <label>Admission Date *</label>
          <input
            type="date"
            name="admissionDate"
            className="form-control"
            value={formData.admissionDate}
            onChange={handleChange}
          />
          {errors.admissionDate && <div className="error-text">{errors.admissionDate}</div>}
        </div>
      </div>

      <div className="form-group">
        <label>Address *</label>
        <textarea
          name="address"
          className="form-control"
          rows="3"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
        {errors.address && <div className="error-text">{errors.address}</div>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Student'}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
