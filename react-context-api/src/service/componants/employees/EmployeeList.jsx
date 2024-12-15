import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee, resetSuccessMessage } from '../../../redux/employeeSlice';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, loading, successMessage, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (successMessage) {
    setTimeout(() => {
      dispatch(resetSuccessMessage());
      navigate('/employees');
    }, 2000);

  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id));
    }
  };

  const navigateToAddEmployee = () => {
    navigate('/employees/add'); // Navigate to the Add Employee page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employee List</h2>
      {successMessage && <div>{successMessage}</div>}
      {error && <div>{error}</div>}

      <button onClick={navigateToAddEmployee} style={{ marginBottom: '20px' }}>
        Add Employee
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.emailId}</td>
              <td>
                <button onClick={() => navigate(`/employees/edit/${employee.id}`)}>Edit</button> |
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
