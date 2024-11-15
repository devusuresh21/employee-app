import React, { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const [employees, setEmployees] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (username && email && status) {
      const newEmployee = { 
        id: Date.now(), 
        username,
        email,
        status
      };
      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
      setUsername('');
      setEmail('');
      setStatus('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDelete = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };

  const handleEdit = (employee) => {
    setUsername(employee.username);
    setEmail(employee.email);
    setStatus(employee.status);
    handleDelete(employee.id);
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>Employee Management</h1>
      </div>

      {/* Main Page Content */}
      <div className="page-content">
        {/* Employee Form */}
        <div>
          <form onSubmit={handleAddEmployee}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button type="submit">Add Employee</button>
          </form>
        </div>

        {/* Employee List */}
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.username}</td>
                    <td>{employee.email}</td>
                    <td>{employee.status}</td>
                    <td>
                      <button className="edit" onClick={() => handleEdit(employee)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(employee.id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No employees available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
