import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { fetchEmployees, deleteEmployee } from '../../features/employeeSlice';
import { useNavigate } from 'react-router-dom';



const EmployeesList: React.FC = () => {
   const { items: employees, loading, error, successMessage } = useSelector(
     (state: RootState) => state.employees
   );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const navigateToAddEmployee = () => {
    navigate('/add-employee');
  };

  const navigateToEditEmployee = (id: number) => {
    navigate(`/edit-employee/${id}`);
  };

  const navigateToDeleteEmployee = (id: number) => {
      dispatch(deleteEmployee(id));
    };
  

  return (
    <div>
      <h2>Employee List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.firstName} - {employee.lastName} USD
            <button onClick={() => navigateToEditEmployee(employee.id)}>Edit</button>
            <button onClick={() => navigateToDeleteEmployee(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={navigateToAddEmployee}>Add Employee</button>
    </div>
  );
};

export default EmployeesList;
