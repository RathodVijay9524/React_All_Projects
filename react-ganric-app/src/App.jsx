
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import EmployeeEdit from './components/EmployeeEdit';
import EmployeeAdd from './components/EmployeeAdd';
import ListEmployee from './components/ListEmployee';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for displaying the employee list */}
        <Route path="/" element={<ListEmployee />} />

        {/* Route for editing an employee */}
        <Route path="/edit/:id" element={<EmployeeEdit />} />

        {/* Route for adding a new employee */}
        <Route path="/add-employee" element={<EmployeeAdd />} />

        {/* Optional: Handle invalid routes */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
