import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaFileDownload } from 'react-icons/fa';
import { CSVLink } from 'react-csv';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import { useQuery } from 'react-query';
import newRequest from '../utils/newRequest';

const PDFDocument = ({ service }) => (
  <Document>
    <Page size="A4">
      <Text>Service Details</Text>
      <Text>ID: {service.id}</Text>
      <Text>User: {service.user}</Text>
      <Text>Car: {service.car}</Text>
      <Text>Service Type: {service.serviceType}</Text>
      <Text>Status: {service.status}</Text>
    </Page>
  </Document>
);

const ViewServices = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [input, setInput] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [errordel, setError] = useState(null);
  //const [searchQuery, setSearchQuery] = useState('');





  const { data, refetch } = useQuery({
    queryKey: ['allservices'],
    queryFn: () =>
      newRequest.get(`/service/adminGetServices?search=${input}`).then((res) => {
        return res.data;
      }),
  });

  const handleSubmit = () => {
    refetch();
  };

  const handleDelete = async () => {
    try{
      
      const confirmation =  window.confirm("Are you Sure, you want to delete?")
      if(confirmation){
       const idsString = selectedItems.join(',');
       await newRequest.delete(`/service/admin/selected/${idsString}`);
       setSelectedItems([]);
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

  const handleView = serviceId => {
    // Implement your view logic here
    const selected = services.find(service => service.id === serviceId);
    setSelectedService(selected);
    document.getElementById('pdfModal').classList.add('show');
  };


  const handleToggleSelect = (serviceId) => {
    setSelectedItems((prevSelectedAds) => {
      if (prevSelectedAds.includes(serviceId)) {
        return prevSelectedAds.filter((id) => id !== serviceId);
      } else {
        return [...prevSelectedAds, serviceId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((service) => service._id));
    }
  };

  const csvData = data
  ? data.map((service) => ({
      ID: service._id,
      Name: `${service.firstname} ${service.lastname}`,
      Email: service.email,
      Phone: service.phone,
      Make: service.vehiclemake  ,
      Varient: service.vehiclevarient ,
      Mode: service.vehiclemodel,
      ServiceType: service.serviceType,
      SubmittedAt: service.updatedAt, 
      
    }))
  : [];



  return (
    <div className="p-3">
      <h1 className="pt-3" style={{ color: '#888', fontSize: '1.5rem' }}>
        SERVICES
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
            <button className="btn btn-primary"onClick={handleSubmit} >
              Search
            </button>
          </div>
        </div>
       
        <div className="col-md-4 col-lg-6 text-md-end">
          <CSVLink
            data={csvData}
            filename="services.csv"
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

      <div className="table-responsive" style={{ maxHeight: '600px', width: '80vw' }}>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedItems.length === data?.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>User</th>
              <th>Phone</th>
              <th>Make</th>
              <th>Car</th>
              <th>Model</th>
              <th>Service Type</th>
              <th>Latest by Time</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((service) => (
              <tr key={service._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(service._id)}
                    onChange={() => handleToggleSelect(service._id)}
                  />
                </td>
                <td>{service._id}</td>
                <td>{service.firstname} {service.lastname}</td>
                <td>{service.phone}</td>
                <td>{service.vehiclemake}</td>
                <td>{service.vehiclevarient}</td>
                <td>{service.vehiclemodel}</td>
                <td>{service.serviceType}</td>
                <td>{service.updatedAt}</td>

                <td>  
                  {/* <PDFDownloadLink
                    document={<PDFDocument service={data} />}
                    fileName={`service-${service._id}.pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        'Loading...'
                      ) : (
                        <a href={url} className="btn" download>
                          Download <FaFileDownload className="text-danger" />
                        </a>
                      )
                    }
                  </PDFDownloadLink> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-end mt-3">
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={selectedItems.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <div className="modal fade" id="pdfModal" tabIndex="-1" aria-labelledby="pdfModalLabel" aria-hidden="true">
        {/* ... (modal content for PDF viewer and download) */}
      </div>
    </div>
  );
};

export default ViewServices;
