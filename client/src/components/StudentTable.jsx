import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';

const StudentTable = ({ students, onDelete }) => {
  if (!students || students.length === 0) {
    return <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>No students found.</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Course</th>
            <th>Sem</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.8rem'
                }}>
                  {student.name.charAt(0)}
                </div>
                {student.name}
              </td>
              <td>{student.rollNumber}</td>
              <td>{student.course}</td>
              <td>{student.semester}</td>
              <td>{student.gender}</td>
              <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link to={`/students/${student._id}`} title="View" style={{ color: 'var(--primary-color)' }}>
                    <Eye size={18} />
                  </Link>
                  <Link to={`/edit-student/${student._id}`} title="Edit" style={{ color: '#38a169' }}>
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => onDelete(student._id)} title="Delete" style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer' }}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
