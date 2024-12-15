import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, resetSuccessMessage } from '../../../redux/employeeSlice';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
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
    navigate('/employees'); // Redirect to employee list page
  };

  if (successMessage) {
    setTimeout(() => {
      dispatch(resetSuccessMessage());
      navigate('/employees');
    }, 2000);
  }

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={employee.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={employee.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            name="emailId"
            placeholder="Email"
            value={employee.emailId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="add-btn">Add Employee</button>
          <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default AddEmployee;
