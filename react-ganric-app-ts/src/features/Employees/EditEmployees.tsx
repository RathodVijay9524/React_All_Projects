
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmployee } from '../employeeSlice';
import { RootState, AppDispatch } from '../../store/store';;
import { Employee } from '../types';

const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const employees = useSelector((state: RootState) => state.employees.items);
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (id) {
      const emp = employees.find(e => e.id === parseInt(id));
      if (emp) {
        setEmployee(emp);
      }
    }
  }, [id, employees]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee(prevState => prevState ? ({
      ...prevState,
      [name]: value
    }) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee) {
      dispatch(updateEmployee({ id: employee.id, item: employee }));
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
      {employee ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={employee.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={employee.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="emailId"
            placeholder="Email ID"
            value={employee.emailId}
            onChange={handleChange}
          />
          <button type="submit">Update Employee</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditEmployee;
