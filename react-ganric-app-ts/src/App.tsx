import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';
import EditEmployee from './components/Employee/EditEmployee';
import EmployeesList from './features/Employees/EmployeesList';
import AddEmployees from './features/Employees/AddEmployees';
import EditEmployees from './features/Employees/EditEmployees';


const App: React.FC = () => {
  return (
    <Router>  {/* Wrap your app in Router */}
      <Routes>
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/" element={<EmployeesList />} />
        <Route path="/add-employee" element={<AddEmployees />} />
        <Route path="/edit-employee/:id" element={<EditEmployees />} />
        <Route path="/employees/add" element={<AddEmployee />} />  {/* For Add employee */}
        <Route path="/employees/edit/:id" element={<EditEmployee />} />  {/* For Edit employee */}
      </Routes>
    </Router>
  );
};

export default App;
