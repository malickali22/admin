import React, { useState, useEffect } from 'react';
import { FaEye } from 'react-icons/fa';
import newRequest from './../utils/newRequest';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const ViewAds = () => {
  const [input, setInput] = useState('');
  const [selectedAds, setSelectedAds] = useState([]);
  const [errordel, setError] = useState(null);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['ads'],
    queryFn: () =>
      newRequest.get(`/report/getreports?search=${input}`).then((res) => {
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

  const handleToggleSelect = (adId) => {
    setSelectedAds((prevSelectedAds) => {
      if (prevSelectedAds.includes(adId)) {
        return prevSelectedAds.filter((id) => id !== adId);
      } else {
        return [...prevSelectedAds, adId];
      }
    });
  };

  const handleToggleSelectAll = () => {
    if (selectedAds.length === data.length) {
      setSelectedAds([]);
    } else {
      setSelectedAds(data.map((ad) => ad._id));
    }
  };

  const handleDeleteSelected = async () => {
     try{
      
      const confirmation =  window.confirm("Are you Sure, you want to delete?")
      if(confirmation){
       const idsString = selectedAds.join(',');
       await newRequest.delete(`/report/admin/selected/${idsString}`);
       setSelectedAds([]);
       refetch()
      }else
      {
          null
      }
  }
  catch(err){
      setError(err.response.data);
      console.log("While deleting Report", errordel)
  }
  };



  return (
    
     <div className="p-3">
      <h1 className="pt-3" style={{ color: '#888', fontSize: '1.5rem' }}>
        Reports
      </h1>
      <hr/>
      <div className="row mb-3">
        <div className="col-md-8 col-lg-6">
        <div className="input-group" style={{ maxWidth: '300px' }}>
  <input
    type="text"
    placeholder=" Seller/Reporter ID"
    className="form-control"
    onChange={(e) => setInput(e.target.value)}
  />
            <button className="btn btn-primary" onClick={handleSubmit}>
              Search
            </button>
          </div>
        </div>
        </div>

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
              checked={selectedAds.length === data?.length}
              onChange={handleToggleSelectAll} // Add this line
            />
          </th>
              <th>Seller ID</th>
              <th>Ad ID</th>
              <th>Reporter ID</th>
              <th>Reporter Email</th>
              <th>Report Type</th>
              <th>Additional Detail</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="8" className="text-center">
                  Something went wrong!
                </td>
              </tr>
            ) : (
              data?.map((ad) => (
                <tr key={ad._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedAds.includes(ad._id)}
                      onChange={() => handleToggleSelect(ad._id)}
                    />
                  </td>
                  <td>{ad.sellerId}</td>
                  <td>{ad.adId}</td>
                  <td>{ad.buyerId}</td>
                  <td>{ad.buyerEmail}</td>
                  <td>{ad.selectedReason}</td>
                  <td>{ad.additionalDetails ? ad.additionalDetails : "Nill"}</td>
                  <td>
                  <Link to={`/ad/${ad.adId}`}>
                    <button className="btn">
                        Ad <FaEye className="text-secondary" />
                    </button>
                    </Link>
                    <Link to={`/userprofile/${ad.sellerId}`}>
                    <button className="btn">
                      Profile <FaEye className="text-secondary" />
                    </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="text-end mt-3">
        <button
          className="btn btn-danger"
          onClick={handleDeleteSelected}
          disabled={selectedAds.length === 0}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
};

export default ViewAds;
