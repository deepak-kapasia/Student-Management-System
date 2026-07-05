import { useState, useEffect } from 'react';
import { getStudents, deleteStudent } from '../services/studentService';
import StudentTable from '../components/StudentTable';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Modal from '../components/Modal';
import Loader from '../components/Loader';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination & Filters State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, [currentPage, search, filters, sort]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents({
        page: currentPage,
        limit: 10,
        search,
        ...filters,
        sort,
      });
      setStudents(data.students);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError('Failed to fetch students. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearch(term);
    setCurrentPage(1);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSort = (sortVal) => {
    setSort(sortVal);
    setCurrentPage(1);
  };

  const confirmDelete = (id) => {
    setStudentToDelete(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteStudent(studentToDelete);
      setIsModalOpen(false);
      setStudentToDelete(null);
      fetchStudents(); // Refresh list
    } catch (err) {
      setError('Failed to delete student.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0 }}>Student Management</h1>
        <SearchBar onSearch={handleSearch} />
      </div>

      <FilterPanel onFilter={handleFilter} onSort={handleSort} />

      {error && <div className="error-text" style={{ marginBottom: '1rem' }}>{error}</div>}

      {loading ? (
        <Loader />
      ) : (
        <>
          <StudentTable students={students} onDelete={confirmDelete} />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete this student record? This action cannot be undone.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
          <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </Modal>
    </div>
  );
};

export default StudentList;
