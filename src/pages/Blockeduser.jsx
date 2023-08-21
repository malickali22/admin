import React, { useState, useEffect } from 'react';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import newRequest from './../utils/newRequest';
import { useQuery } from 'react-query';
import {  useNavigate } from 'react-router-dom';

const ViewUsers = () => {
  const [showVerified, setShowVerified] = useState(false);
  const [input, setInput] = useState('');
  const [errordel, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
 const navigate = useNavigate();
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['allusers'],
    queryFn: () =>
    newRequest.get(`/user/admin/blockeduser?isBlocked=true&search=${input}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (input === '') {
      refetch(); // Fetch data when input becomes empty
    }
  }, [input, refetch]);

  const handleSubmit = () => {
    refetch();
  };

  const toggleVerified = () => {
    setShowVerified(!showVerified);
  };

  const handleToggleSelect = (Id) => {
    if (selectedUsers.includes(Id)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== Id));
    } else {
      setSelectedUsers([...selectedUsers, Id]);
    }
    
  };

  const handleDeleteSelected = async () => {
  
    try{
      
     const confirmation =  window.confirm("Are you Sure, you want to delete?")
     if(confirmation){
      const idsString = selectedUsers.join(',');
      await newRequest.delete(`/user/admin/selected/${idsString}`);
        setSelectedUsers([]);
     }else
     {
         null
     }
 }
 catch(err){
     setError(err.response.data);
     console.log("While deleting Ad", errordel)
 }
  };


  const handleUnblock = async (id) => {
  
    try{
      console.log(id)
     const confirmation =  window.confirm("Are you Sure, you want to Unblock?")
     if(confirmation){
      await newRequest.delete(`/user/admin/unblockuser/${id}`);
      refetch();
     }else
     {
         null
     }
 }
 catch(err){
     setError(err.response.data);
     console.log("While Unblocking User", errordel)
 }
  };

 

  const csvData = data
    ? data.map((user) => ({
        ID: user._id,
        Name: `${user.firstname} ${user.lastname}`,
        Email: user.email,
        Phone: user.phone? user.phone : "Nill",
        Verified: user.verified ? 'Yes' : 'No',
        isBlocked: user.isBlocked ? 'Yes' : 'No'
      }))
    : [];

  const filteredUsers = data
    ? showVerified
      ? data.filter((user) => user.verified)
      : data.filter((user) => !user.verified)
    : [];

  return (
    <div className="p-3">
      <h1 className="pt-3" style={{ color: '#888', fontSize: '1.5rem' }}>
       Blocked Users
      </h1>
      <hr/>
      <div className="row mb-3">
        <div className="col-md-8 col-lg-6">
        <div className="input-group" style={{ maxWidth: '300px' }}>
  <input
    type="text"
    placeholder="Search user id"
    className="form-control"
    onChange={(e) => setInput(e.target.value)}
  />
            <button className="btn btn-primary" onClick={handleSubmit}>
              Search
            </button>
          </div>
        </div>
       
        <div className="col-md-4 col-lg-6 text-md-end">
          <CSVLink
            data={csvData}
            filename="users.csv"
            className="btn btn-success"
            style={{
              fontSize: '0.8rem',
              padding: '0.25rem 0.75rem',
            }}
          >
            Download CSV
          </CSVLink>
        </div>
      </div>
      <div
        style={{
          maxHeight: 'calc(70vh - 180px)',
          width: '80vw',
          overflow: 'auto',
          fontSize: '0.9rem',
        }}>
        <table className="table table-bordered table-striped">
          <thead> <tr><th>
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length}
                  onChange={() =>
                    setSelectedUsers(
                      selectedUsers.length === filteredUsers.length
                        ? []
                        : filteredUsers.map((user) => user._id))}/></th><th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th style={{ cursor: 'pointer', border: 'solid 1.8px black' }} onClick={toggleVerified}>
                {showVerified ? ' Show Verified ' : ' Show Non-Verified '}</th>
              <th>Blocked Status</th>
              <th>Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (<tr>
                <td colSpan="7" className="text-center">
                  Loading...
                </td></tr>) : error ? (<tr>
                <td colSpan="7" className="text-center">
                  Something went wrong!
                </td></tr>) : (
              filteredUsers.map((user) => (<tr key={user._id}><td>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleToggleSelect(user._id)}/></td>
                  <td>{user._id}</td>
                  <td>{user.firstname} {user.lastname}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.verified ? (
                      <FaCheck className="text-success" />
                    ) : (
                      <FaTimes className="text-danger" />
                    )}</td>
                  <td>
                    {user.isBlocked ? (
                      <FaCheck className="text-danger" />
                    ) : (
                      <FaTimes className="text-success" />
                    )}</td>
                  <td>
                    <button className="btn" onClick={()=> {handleUnblock(user._id)}}>
                      Unblock <FaEye className="text-success" />
                    </button>
                  </td>
                </tr>
))
            )}
          </tbody>
        </table>
      </div>
      <div className="text-end mt-3 ">
        <button
          className="btn btn-danger"
          onClick={handleDeleteSelected}
          disabled={selectedUsers.length === 0}
        >
          Delete Selected User
        </button>
      </div>
    </div>
  );
};

export default ViewUsers;
