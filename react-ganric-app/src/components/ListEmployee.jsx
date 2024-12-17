import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../redux/employeeSlices';
import { useNavigate } from 'react-router-dom';

const ListEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: employees, loading, successMessage, error } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(id));
    }
  };

  const navigateToAddEmployee = () => { navigate('/add-employee'); };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employee List</h2>
      {successMessage && <div>{successMessage}</div>}
      {error && <div>{error}</div>}
      <button onClick={navigateToAddEmployee}>Add Employee</button>
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
                <button onClick={() => navigate(`/edit/${employee.id}`)}>Edit</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
