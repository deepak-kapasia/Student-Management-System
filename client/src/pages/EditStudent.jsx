import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById, updateStudent } from '../services/studentService';
import StudentForm from '../components/StudentForm';
import Loader from '../components/Loader';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (err) {
        setError('Failed to fetch student details.');
      } finally {
        setIsFetching(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setIsSaving(true);
      setError('');
      await updateStudent(id, formData);
      navigate('/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student. Please try again.');
      setIsSaving(false);
    }
  };

  if (isFetching) return <Loader />;

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Edit Student</h1>
      {error && <div className="error-text" style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fed7d7', borderRadius: '4px' }}>{error}</div>}
      {student && (
        <StudentForm initialData={student} onSubmit={handleSubmit} isLoading={isSaving} />
      )}
    </div>
  );
};

export default EditStudent;
