

import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import './Tbl.css';
import Navbar from './Navbar';
import BottomNavbarSmall from './BottomNavbarSmall';
import './Removed.css'

function ActiveEmployees() {
  const [lists, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    status: ''
  });

  useEffect(() => {
    const storedLists = localStorage.getItem('employees');
    if (storedLists) {
      setList(JSON.parse(storedLists));
    }
  }, []);

  function handleDelete(id) {
    const updatedList = lists.filter(item => item.id !== id);
    setList(updatedList);
    localStorage.setItem('employees', JSON.stringify(updatedList));
  }

  function handleEdit(employee) {
    setCurrentEmployee(employee);
    setFormData(employee);
    setIsEditing(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSave() {
    const updatedList = lists.map(item => 
      item.id === formData.id ? formData : item
    );
    setList(updatedList);
    localStorage.setItem('employees', JSON.stringify(updatedList));
    setIsEditing(false);
    setCurrentEmployee(null);
    setFormData({
      id: '',
      name: '',
      email: '',
      phone: '',
      position: '',
      status: ''
    });
  }

  const activeEmployees = lists.filter(item => item.status === 'Active');

  return (
    <div>
      <Navbar/>
      <h2>Active Employees</h2>
      {isEditing && (
        <div className='edit-form'>
          <h3>Edit Employee</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
            <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button type="submit">Save</button>
          </form>
        </div>
      )}
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activeEmployees.map((employee) => (
            <tr key={employee.id}>
              <td><img src={employee.image} alt={employee.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} /></td>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.position}</td>
              <td>{employee.status}</td>
              <td>
                <button className='edit' onClick={() => handleEdit(employee)}>
                  <CiEdit style={{ fontSize: "26px" }} />
                </button>
                <button className='delete' onClick={() => handleDelete(employee.id)}>
                  <MdDelete style={{ fontSize: "26px" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BottomNavbarSmall/>
    </div>
  );
}

export default ActiveEmployees;
