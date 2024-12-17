import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from '../../redux/employeeSlice'
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const employee = useSelector((state) => state.employees.employees.find((emp) => emp.id === parseInt(id)));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updatedEmployee, setUpdatedEmployee] = useState(employee);

  useEffect(() => {
    if (employee) {
      setUpdatedEmployee(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({
      ...updatedEmployee,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateEmployee({ id: updatedEmployee.id, employee: updatedEmployee }));
    navigate('/employees');
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      {employee ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={updatedEmployee.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            value={updatedEmployee.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="emailId"
            value={updatedEmployee.emailId}
            onChange={handleChange}
            required
          />
          <button type="submit">Update Employee</button>
        </form>
      ) : (
        <div>Employee not found!</div>
      )}
    </div>
  );
};

export default EditEmployee;
