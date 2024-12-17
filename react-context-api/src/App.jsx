import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeList from './componants/employees/EmployeeList';
import AddEmployee from './componants/employees/AddEmployee';
import EditEmployee from './componants/employees/EditEmployee';



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
