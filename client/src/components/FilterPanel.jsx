import { useState } from 'react';
import { Filter } from 'lucide-react';

const FilterPanel = ({ onFilter, onSort }) => {
  const [filters, setFilters] = useState({
    course: '',
    semester: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilter(updatedFilters);
  };

  return (
    <div className="card filter-bar">
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label>Course</label>
        <input 
          type="text" 
          name="course" 
          className="form-control" 
          placeholder="Filter by Course" 
          value={filters.course}
          onChange={handleChange}
        />
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label>Semester</label>
        <input 
          type="text" 
          name="semester" 
          className="form-control" 
          placeholder="Filter by Semester" 
          value={filters.semester}
          onChange={handleChange}
        />
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label>Gender</label>
        <select name="gender" className="form-control" value={filters.gender} onChange={handleChange}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group" style={{ marginBottom: 0 }}>
        <label>Sort By</label>
        <select name="sort" className="form-control" onChange={(e) => onSort(e.target.value)}>
          <option value="">Latest Created</option>
          <option value="name">Name</option>
          <option value="attendance">Attendance</option>
          <option value="admissionDate">Admission Date</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
