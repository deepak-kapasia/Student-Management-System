import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addStudent } from '../services/studentService';
import StudentForm from '../components/StudentForm';

const AddStudent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError('');
      await addStudent(formData);
      navigate('/students');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem' }}>Add New Student</h1>
      {error && <div className="error-text" style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fed7d7', borderRadius: '4px' }}>{error}</div>}
      <StudentForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default AddStudent;
