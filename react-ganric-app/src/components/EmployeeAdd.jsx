import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, resetSuccessMessage } from '../redux/employeeSlices';
import { useNavigate } from 'react-router-dom';

const EmployeeAdd = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const successMessage = useSelector((state) => state.employees.successMessage);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEmployee(employee));
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleClear = () => {
    setEmployee({
      firstName: '',
      lastName: '',
      emailId: '',
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (successMessage) {
    setTimeout(() => {
      dispatch(resetSuccessMessage());
      navigate('/employees');
    }, 2000);
  }

  return (
    <div>
      <h2>Add Employee</h2>
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
        <button type="submit">Add Employee</button>
        <button type="button" onClick={handleSubmit}>Submit</button>
        <button type="button" onClick={handleClear}>Clear</button>
        <button type="button" onClick={handleCancel}>Cancel</button>

      </form>
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

export default EmployeeAdd;
