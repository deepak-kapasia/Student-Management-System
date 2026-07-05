import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';

const StudentCard = ({ student, onDelete }) => {
  return (
    <div className="card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>
          {student.name.charAt(0)}
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{student.name}</h3>
          <p style={{ margin: 0, color: 'var(--text-light)', fontSize: '0.9rem' }}>
            Roll No: {student.rollNumber} | Course: {student.course}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Link to={`/students/${student._id}`} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--primary-color)' }}>
          <Eye size={18} />
        </Link>
        <Link to={`/edit-student/${student._id}`} className="btn btn-outline" style={{ padding: '0.4rem', color: '#38a169' }}>
          <Edit size={18} />
        </Link>
        <button onClick={() => onDelete(student._id)} className="btn btn-outline" style={{ padding: '0.4rem', color: 'var(--danger-color)' }}>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
