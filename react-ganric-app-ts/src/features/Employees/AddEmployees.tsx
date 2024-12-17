import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../../features/employeeSlice';
import { Employee } from '../types';
import { AppDispatch } from '../../store/store';

const AddEmployee: React.FC = () => {
  const [employee, setEmployee] = useState<Employee>({ id: 0, firstName: '', lastName: '', emailId: '' });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee = { ...employee, id: Date.now() };
    dispatch(addEmployee(newEmployee));
    navigate('/');
  };

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
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
