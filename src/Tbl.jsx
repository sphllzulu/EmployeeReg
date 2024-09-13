import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import './Tbl.css';
import EmployeeCount from './EmployeeCount';
import Loader from './Loader';

function Popup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup">
      <p>{message}</p>
    </div>
  );
}

function Tbl() {
  const initialList = [
    // Initial list as defined
  ];

  const [lists, setList] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [editState, setEditState] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const storedLists = localStorage.getItem('employees');
    if (storedLists) {
      setList(JSON.parse(storedLists));
      setLoading(false);
    } else {
      localStorage.setItem('employees', JSON.stringify(initialList));
      setList(initialList);
    }
  }, []);

  useEffect(() => {
    if (lists.length) {
      localStorage.setItem('employees', JSON.stringify(lists));
    }
  }, [lists]);

  function handleEdit(id) {
    setEditState(id);
  }

  function handleUpdate(id, updatedItem) {
    const updatedList = lists.map(item => item.id === id ? updatedItem : item);
    setList(updatedList);
    setEditState(-1);
    setPopupMessage('Employee updated successfully');
  }

  function handleDelete(id) {
    const updatedList = lists.filter(item => item.id !== id);
    setList(updatedList);
    setPopupMessage('Employee deleted successfully');
  }

  function closePopup() {
    setPopupMessage('');
  }

  const filteredLists = lists.filter(item => item.id.toString().includes(searchId));

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {popupMessage && <Popup message={popupMessage} onClose={closePopup} />}
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <EmployeeCount count={lists.length} />

        <div style={{ margin: '10px' }}>
          <input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
      </div>

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
          <tr>
            <td colSpan="8">
              <AddEmployee setList={setList} lists={lists} setPopupMessage={setPopupMessage} />
            </td>
          </tr>
          {filteredLists.map((current) => (
            editState === current.id ?
              <Edit key={current.id} current={current} handleUpdate={handleUpdate} /> :
              <tr key={current.id}>
                <td data-label="Image"><img src={current.image} alt={current.name} /></td>
                <td data-label="ID">{current.id}</td>
                <td data-label="Name">{current.name}</td>
                <td data-label="Email">{current.email}</td>
                <td data-label="Phone">{current.phone}</td>
                <td data-label="Position">{current.position}</td>
                <td data-label="Status">{current.status}</td>
                <td data-label="Actions">
                  <button className='edit' onClick={() => handleEdit(current.id)}><CiEdit style={{ fontSize: "26px" }} /></button>
                  <button className='delete' onClick={() => handleDelete(current.id)}><MdDelete style={{ fontSize: "26px" }} /></button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Edit({ current, handleUpdate }) {
  // Same Edit component as before
}

function AddEmployee({ setList, lists, setPopupMessage }) {
  const [image, setImage] = useState(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const phone = event.target.elements.phone.value;
    const position = event.target.elements.position.value;
    const status = event.target.elements.status.value;

    const newId = lists.length ? Math.max(...lists.map(item => item.id)) + 1 : 1;

    const newList = {
      image,
      id: newId,
      name,
      email,
      phone,
      position,
      status
    };

    const updatedList = lists.concat(newList);
    setList(updatedList);
    localStorage.setItem('employees', JSON.stringify(updatedList));

    setPopupMessage('Employee added successfully');
    event.target.reset();
    setImage(null);
  }

  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <input type="file" name='image' onChange={handleImageChange} required />
      <input type="text" name='name' placeholder='Name' required />
      <input type="email" name='email' placeholder='Email' required />
      <input type="tel" name='phone' placeholder='Cell No' required />
      <input type="text" name='position' placeholder='Position' required />
      <input type="text" name='status' placeholder='Status' required />
      <button className='add'>Add</button>
    </form>
  );
}

export default Tbl;
