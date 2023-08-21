import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import newRequest from "../utils/newRequest";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {  FaMapMarkerAlt } from "react-icons/fa";



const Ad = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  const navgiate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const hoverStyle = hovered ? {backgroundColor: 'red', color: 'white'} : {};
  const [errordel, setError] = useState(null);
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["ad"],
    queryFn: () =>
      newRequest.get(`/posts/single/${id}`).then((res) => {
        return res.data;
      }),
  });


  const handleDeleteAd = async () => {
    try{
     
     const confirmation =  window.confirm("Are you Sure, you want to delete?")
     if(confirmation){
      await newRequest.delete(`/posts/admin/${id}`);
      navgiate("/viewads")
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

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-7 col-lg-8" style={{ position: 'relative', overflow: 'hidden', background: '#000' }}>
              <Carousel
                showArrows={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                dynamicHeight={false}
              >
                {data.cover && <div key="cover" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={data.cover} alt="Cover" style={{ objectFit: 'contain', objectPosition: 'center', width: '100%', height: '100%' }} />
                </div>}
                {data.images.map((img, index) => (
                  <div key={index} style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={img} alt={``} style={{ objectFit: 'contain', objectPosition: 'center', width: '100%', height: '100%' }} />
                  </div>
                ))}
              </Carousel>
            </div>
              
            <div className="col-md-5 col-lg-4 mt-3 mt-lg-0">
              <div className="card">
                <div className="card-body">
                  {/* User's name */}
                  <h5 className="card-title">{data?.ownername || "Seller"}</h5>
                  <h8 className="card-title" style={{ color: "grey" }}>
                    {data.userId}
                  </h8>

                  {/* Phone number button */}
                  
                      
                        <div className="row">
                          <div className="col">
                            <div
                              className="contact-number"
                              style={{
                                backgroundColor: "#a891b7",
                                width: "100%",
                                maxWidth: "350px",
                                color: "white",
                                border: "none",
                                padding: "0.3rem 0.7rem",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "all 0.3s",
                                textAlign: "center",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#a891b7";
                                e.target.style.color = "black";
                                e.target.style.boxShadow =
                                  "0 0 10px rgba(0, 0, 0, 0.5)";
                                e.target.style.transform = "scale(1.05)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#a891b7";
                                e.target.style.color = "white";
                                e.target.style.boxShadow = "none";
                                e.target.style.transform = "scale(1)";
                              }}
                            >
                              {data.contact}
                            </div>
                          </div>
                        </div>

                        <button 
                      className="btn btn-outline-danger fw-bold mt-3" 
                      style={hoverStyle}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                      onClick={() => handleDeleteAd(data._id)}
                      title="Delete User Ad"
                  >
                      Delete Ad
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            {/* Additional Card for price */}
            {/* Card for Price, Short Description, and Location */}
            <div className="col-md-7 col-lg-8">
              <div className="card">
                <div className="card-body">
                  {/* Price */}
                  <h2 className="text-uppercase" style={{ fontWeight: "bold" }}>{data.title}</h2>
                  <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <h4 style={{ margin: 0, marginRight: "1.5%" }}>PKR</h4>
                    <h3 style={{ fontWeight: 'bold', margin: 0 }}>{data.price.toLocaleString()}</h3>
                  </div>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaMapMarkerAlt style={{ marginRight: '2px' }} />
                    <p className="pt-3">{data.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Card for Vehicle Details */}
          <div className="row mt-4">
            <div className="col-md-7 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title pb-3">Details</h3>
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <p><strong>Vehicle Make: </strong>{data.vehiclemake}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Vehicle Model: </strong>{data.vehiclemodel}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Vehicle Variant: </strong>{data.vehiclevarient}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Transmission: </strong>{data.transmission}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Mileage: </strong>{data.mileage.toLocaleString()} <span className="km" style={{ color: "grey" }}>km</span></p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Fuel Type: </strong>{data.fueltype}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Registry Year: </strong>{data.registeryear}</p>
                    </div>
                    <div className="col-sm-6 mb-3">
                      <p><strong>Registry City: </strong>{data.registercity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4 pb-3">
            <div className="col-md-7 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Description</h5>
                  <p>{data.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ad;
