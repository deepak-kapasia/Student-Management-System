import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getStudentById } from '../services/studentService';
import Loader from '../components/Loader';
import { ArrowLeft, User, Phone, Mail, Calendar, BookOpen, MapPin } from 'lucide-react';

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (err) {
        setError('Failed to fetch student details.');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;
  if (!student) return <div>Student not found.</div>;

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link to="/students" className="btn btn-outline" style={{ padding: '0.5rem' }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ margin: 0 }}>Student Details</h1>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--primary-color)', 
            color: 'white', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            fontSize: '4rem',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            {student.name.charAt(0)}
          </div>
          
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{student.name}</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              Roll Number: <strong>{student.rollNumber}</strong> | Course: <strong>{student.course}</strong>
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Mail style={{ color: 'var(--primary-color)' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>Email</p>
                  <p style={{ margin: 0, fontWeight: 500 }}>{student.email}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Phone style={{ color: 'var(--primary-color)' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>Phone</p>
                  <p style={{ margin: 0, fontWeight: 500 }}>{student.phone}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <User style={{ color: 'var(--primary-color)' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>Gender</p>
                  <p style={{ margin: 0, fontWeight: 500 }}>{student.gender}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Calendar style={{ color: 'var(--primary-color)' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>Date of Birth</p>
                  <p style={{ margin: 0, fontWeight: 500 }}>{new Date(student.dob).toLocaleDateString()}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <BookOpen style={{ color: 'var(--primary-color)' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>Semester</p>
                  <p style={{ margin: 0, fontWeight: 500 }}>{student.semester}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <MapPin style={{ color: 'var(--primary-color)' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>Address</p>
                  <p style={{ margin: 0, fontWeight: 500 }}>{student.address}</p>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, color: 'var(--text-light)' }}>Admission Date</p>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '1.1rem' }}>{new Date(student.admissionDate).toLocaleDateString()}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, color: 'var(--text-light)' }}>Attendance</p>
                  <p style={{ 
                    margin: 0, 
                    fontWeight: 700, 
                    fontSize: '1.5rem',
                    color: student.attendance >= 75 ? 'var(--success-color)' : 'var(--danger-color)'
                  }}>
                    {student.attendance}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
