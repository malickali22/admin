import React, { useState } from 'react';

const ContactUs = () => {
  const [selectedRequests, setSelectedRequests] = useState([]);
  
  // Sample data for the table
  const contactRequests = [
    {
      _id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      query: 'Question about products',
      createdAt: '2023-08-19',
    },
    // Add more sample data items as needed
  ];

  const handleToggleSelect = (requestId) => {
    setSelectedRequests((prevSelectedRequests) => {
      if (prevSelectedRequests.includes(requestId)) {
        return prevSelectedRequests.filter((id) => id !== requestId);
      } else {
        return [...prevSelectedRequests, requestId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    // Implement your delete logic here
    // You can use the selectedRequests array to get the IDs of the selected requests
  };

  return (
    <div className="p-3">
      <h1 className="pt-3" style={{ color: '#888', fontSize: '1.5rem' }}>
        Contact Requests
      </h1>
      <hr />

      <div
        style={{
          maxHeight: 'calc(70vh - 180px)',
          width: '80vw',
          overflow: 'auto',
          fontSize: '0.9rem',
        }}
      >
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedRequests.length === contactRequests.length}
                  onChange={() => {
                    if (selectedRequests.length === contactRequests.length) {
                      setSelectedRequests([]);
                    } else {
                      setSelectedRequests(contactRequests.map((request) => request._id));
                    }
                  }}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Query</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {contactRequests.map((request) => (
              <tr key={request._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRequests.includes(request._id)}
                    onChange={() => handleToggleSelect(request._id)}
                  />
                </td>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.query}</td>
                <td>{request.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-end mt-3">
        <button
          className="btn btn-danger"
          onClick={handleDeleteSelected}
          disabled={selectedRequests.length === 0}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
