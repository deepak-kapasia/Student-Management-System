import { useState, useEffect } from 'react';
import { getStudents } from '../services/studentService';
import { Users, GraduationCap, UserCheck, Clock } from 'lucide-react';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    avgAttendance: 0,
  });
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get all students (no pagination limit for stats calculation, though in a real large app we'd want a separate stats API)
      const data = await getStudents({ limit: 1000 });
      const students = data.students || [];

      // Calculate stats
      const total = students.length;
      const male = students.filter(s => s.gender === 'Male').length;
      const female = students.filter(s => s.gender === 'Female').length;
      const totalAttendance = students.reduce((sum, s) => sum + (s.attendance || 0), 0);
      const avgAttendance = total > 0 ? (totalAttendance / total).toFixed(1) : 0;

      setStats({ total, male, female, avgAttendance });
      
      // Get 5 most recent
      setRecentStudents(students.slice(0, 5));
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="error-text">{error}</div>;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      <div className="dashboard-grid">
        <div className="card stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(56, 161, 105, 0.1)', color: 'var(--success-color)' }}>
            <Users size={28} />
          </div>
          <div className="stat-info">
            <p>Total Students</p>
            <h3>{stats.total}</h3>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(43, 108, 176, 0.1)', color: 'var(--primary-hover)' }}>
            <UserCheck size={28} />
          </div>
          <div className="stat-info">
            <p>Male Students</p>
            <h3>{stats.male}</h3>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(229, 62, 62, 0.1)', color: 'var(--danger-color)' }}>
            <GraduationCap size={28} />
          </div>
          <div className="stat-info">
            <p>Female Students</p>
            <h3>{stats.female}</h3>
          </div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-icon" style={{ backgroundColor: 'rgba(214, 158, 46, 0.1)', color: '#d69e2e' }}>
            <Clock size={28} />
          </div>
          <div className="stat-info">
            <p>Avg Attendance</p>
            <h3>{stats.avgAttendance}%</h3>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recently Added Students</h2>
        {recentStudents.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Course</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.map(student => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.rollNumber}</td>
                    <td>{student.course}</td>
                    <td>
                      <span style={{ 
                        color: student.attendance >= 75 ? 'var(--success-color)' : 'var(--danger-color)',
                        fontWeight: 500
                      }}>
                        {student.attendance}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
