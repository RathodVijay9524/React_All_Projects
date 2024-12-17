import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee, fetchEmployees } from '../redux/employeeSlices';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the Redux store
  const { data: employees = [], loading, error } = useSelector((state) => state.employees || {});

  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
  });

  // Fetch employees if data is empty
  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    } else {
      const employeeData = employees.find((emp) => emp.id === parseInt(id));
      if (employeeData) setEmployee(employeeData);
    }
  }, [id, employees, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEmployee({ id: parseInt(id), item: employee }));
    navigate('/employees');
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={employee.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={employee.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="emailId"
          placeholder="Email"
          value={employee.emailId}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EmployeeEdit;
