import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store'; // Adjust the path to your store
import { fetchEmployees, deleteEmployee } from '../../redux/service/slices/employeeSlice'; // Adjust path to your slice
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();  // Initialize navigate hook
  const { items: employees, loading, error, successMessage } = useSelector(
    (state: RootState) => state.employees
  );

  // Fetch employees on component mount
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  // Handle delete
  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  // Handle navigate to Add Employee form
  const handleAddEmployee = () => {
    navigate('/employees/add');
  };

  // Handle navigate to Edit Employee form
  const handleEditEmployee = (id: number) => {
    navigate(`/employees/edit/${id}`);
  };

  return (
    <div>
      <h1>Employee List</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {/* Add Employee Button */}
      <button onClick={handleAddEmployee}>Add Employee</button>

      {/* Employee List */}
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName} ({employee.emailId})
            <button onClick={() => handleEditEmployee(employee.id)}>Edit</button>
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
