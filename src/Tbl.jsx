import React, { useState, useEffect } from 'react';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import './Tbl.css';
import EmployeeCount from './EmployeeCount';
import Loader from './Loader';

function Tbl() {
  const initialList = [
    {
      id: 1,
      image: "https://picsum.photos/200/300?grayscale",
      name: "Siphelele Zulu",
      email: "sphllzulu@gmail.com",
      phone: "0746992821",
      position: "Snr Eng",
      status: "Active",
    },
    {
      id: 2,
      image: "https://picsum.photos/200/300?grayscale",
      name: "Sabelo Zulu",
      email: "sphllzulu@gmail.com",
      phone: "0746992821",
      position: "Snr Eng",
      status: "Inactive",
    },
    {
      id: 3,
      image: "https://picsum.photos/200/300?grayscale",
      name: "Thobile Zulu",
      email: "sphllzulu@gmail.com",
      phone: "0746992821",
      position: "Snr Eng",
      status: "Active",
    },
    {
      id: 4,
      image: "https://picsum.photos/200/300?grayscale",
      name: "Nomsa Zulu",
      email: "sphllzulu@gmail.com",
      phone: "0746992821",
      position: "Snr Eng",
      status: "Inactive",
    },
  ];

  const [lists, setList] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [editState, setEditState] = useState(-1);
  const [loading, setLoading] = useState(true);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(null); // To track the employee being deleted

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
  }

  function handleDelete(id) {
    const updatedList = lists.filter(item => item.id !== id);
    setList(updatedList);
    localStorage.setItem('employees', JSON.stringify(updatedList));
    setShowDeletePopup(null);
  }

  const filteredLists = lists.filter(item => item.id.toString().includes(searchId));
  
  if (loading) {
    return <Loader />; 
  }

  return (
    <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <EmployeeCount count={lists.length} />
      <div style={{ margin: '10px' }}>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  
    <button className="addEmployeeBtn" onClick={() => setShowAddPopup(true)}>
      Add Employee
    </button>
  
    {showAddPopup && (
      <Popup title="Add Employee" onClose={() => setShowAddPopup(false)}>
        <AddEmployee setList={setList} lists={lists} closePopup={() => setShowAddPopup(false)} />
      </Popup>
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
        {filteredLists.map((current) =>
          editState === current.id ? (
            <Edit key={current.id} current={current} handleUpdate={handleUpdate} />
          ) : (
            <tr key={current.id}>
              <td data-label="Image">
                <img src={current.image} alt={current.name} className="employee-img" />
              </td>
              <td data-label="ID">{current.id}</td>
              <td data-label="Name">{current.name}</td>
              <td data-label="Email">{current.email}</td>
              <td data-label="Phone">{current.phone}</td>
              <td data-label="Position">{current.position}</td>
              <td data-label="Status">{current.status}</td>
              <td data-label="Actions">
                <button className="edit" onClick={() => handleEdit(current.id)}>
                  <CiEdit style={{ fontSize: '26px',color:'blue' }} />
                </button>
                <button className="delete" onClick={() => setShowDeletePopup(current.id)}>
                  <MdDelete style={{ fontSize: '26px',color:'red' }} />
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  
    {showDeletePopup && (
      <Popup title="Delete Employee" onClose={() => setShowDeletePopup(null)}>
        <div>
          <p>Are you sure you want to delete this employee?</p>
          <button className="confirm-delete" onClick={() => handleDelete(showDeletePopup)}>
            Yes, delete
          </button>
          <button className="cancel-delete" onClick={() => setShowDeletePopup(null)}>
            Cancel
          </button>
        </div>
      </Popup>
    )}
  </div>
  
  );
}

function Edit({ current, handleUpdate }) {
  const [image, setImage] = useState(current.image);
  const [name, setName] = useState(current.name);
  const [email, setEmail] = useState(current.email);
  const [phone, setPhone] = useState(current.phone);
  const [position, setPosition] = useState(current.position);
  const [status, setStatus] = useState(current.status);

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
    const updatedItem = {
      id: current.id,
      image,
      name,
      email,
      phone,
      position,
      status
    };
    handleUpdate(current.id, updatedItem);
  }

  return (
    <tr>
      <td data-label="Image"><input type="file" name='image' onChange={handleImageChange} /></td>
      <td data-label="ID">{current.id}</td>
      <td data-label="Name"><input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} /></td>
      <td data-label="Email"><input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} /></td>
      <td data-label="Phone"><input type="tel" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} /></td>
      <td data-label="Position"><input type="text" name='position' value={position} onChange={(e) => setPosition(e.target.value)} /></td>
      <td data-label="Status"><input type="text" name='status' value={status} onChange={(e) => setStatus(e.target.value)} /></td>
      <td data-label="Actions"><button type='button' onClick={handleSubmit}>Update</button></td>
    </tr>
  );
}

function AddEmployee({ setList, lists, closePopup }) {
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

    event.target.reset();
    setImage(null);
    closePopup();
  }

  return (
    <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center',  height: '100%'
    }}>
    <form className='addForm' onSubmit={handleSubmit}>
      <input type="file" name='image' onChange={handleImageChange} />
      <input type="text" name='name' placeholder='Name' required />
      <input type="email" name='email' placeholder='Email' required />
      <input type="tel" name='phone' placeholder='Phone' required />
      <input type="text" name='position' placeholder='Position' required />
      <input type="text" name='status' placeholder='Status' required />
      <button type="submit">Add Employee</button>
    </form>
    </div>
  );
}

function Popup({ title, children, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h3>{title}</h3>
        <button className="popup-close" onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
}

export default Tbl;

