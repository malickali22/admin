import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import { Link, useNavigate } from 'react-router-dom';
import newRequest from '../utils/newRequest';
import Lottie from 'lottie-react';
import { useParams } from "react-router-dom";
import animationData from '../assets/animation_ll3p52e2.json';
export const UserProfile = () => {

    const { id } = useParams();
    const [hovered, setHovered] = useState(false);
    const hoverStyle = hovered ? {backgroundColor: 'red', color: 'white'} : {};
    const [hoveredblock, setHoveredblock] = useState(false);
    const hoverStyleblock = hoveredblock ? {backgroundColor: 'red', color: 'white' } : {};
    const [errordel, setError] = useState(null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdData = async () => {
          try {
            
            const response = await newRequest.get(`/user/${id}`);
            const user = response.data;
    
            // Set the formData state with the fetched ad data
            setUserData(user);
        
            // Set the selectedMake state based on the fetched vehiclemake from the ad data
            
          } catch (error) {
            console.error('Error fetching ad data:', error);
          }
        };
        fetchAdData();
      }, [id]);  
      

    const { isLoading, error, data } = useQuery({
        queryKey: ["ads"],
        queryFn: () =>
          newRequest.get(`/posts/userposts/${id}`).then((res) => {
            return res.data;
          }),
      });


      const handleDeleteAd = async (id) =>{
        
         try{
            const confirmation =  window.confirm("Are you Sure, you want to delete?")
            if(confirmation){
                await newRequest.delete(`/posts/admin/${id}`);
               
            }else
            {
                null
            }
        }
        catch(err){
            setError(err.response.data);
            console.log("While deleting Ad", errordel)
        }
      }

      const handleDeleteUser = async (id) =>{
        
        try{
            console.log(id)
           const confirmation =  window.confirm("Are you Sure, you want to delete?")
           if(confirmation){
               await newRequest.delete(`/user/admin/${id}`);
               navigate("/viewusers")
           }else
           {
               null
           }
       }
       catch(err){
           setError(err.response.data);
           console.log("While deleting Ad", errordel)
       }
     }


     const handleBlockUser = async (id) =>{   
      try{
          console.log(id)
         const confirmation =  window.confirm("Are you Sure, you want to Block?")
         if(confirmation){
             await newRequest.post(`/user/admin/block/${id}`);
             navigate("/viewusers")
         }else
         {
             null
         }
     }
     catch(err){
         setError(err.response.data);
         console.log("While Blocking User", errordel)
     }
   }



     



  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="text-center">
          <div className="profilelogo" style={{ height: "200px", width: "200px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Lottie animationData={animationData}></Lottie>
            </div>
            <h4>Username:</h4><h4 className='User-Data' style={{color:"gray"}}>{userData?.username} </h4>
            <hr />
            <h4>Complete Name:</h4><h4 className='User-Data' style={{color:"gray"}}>{userData?.firstname} {userData?.lastname}</h4>
            <hr />
            <h4>Email : </h4>  <h4 className='User-Data' style={{color:"gray"}}>{userData?.email} </h4>
            <hr />
            <h4>Phone no: </h4> <h4 className='User-Data' style={{color:"gray"}}>{userData?.phone} </h4>
            <hr />
            <h4>Created At: </h4> <h4 className='User-Data' style={{color:"gray"}}>{userData?.createdAt}</h4>
            <div className="mt-3">
              <div className="mb-2">
                <button     className="btn btn-outline-danger fw-bold" style={hoverStyle}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => handleDeleteUser(userData._id)}
                    title="Permanently Delete Account"
                    >Delete User Account</button>
              </div>
              <button 
                      className="btn btn-outline-danger fw-bold" 
                      style={hoverStyleblock}
                      onMouseEnter={() => setHoveredblock(true)}
                      onMouseLeave={() => setHoveredblock(false)}
                      onClick={() => handleBlockUser(userData._id)}
                      title="Just Block User Access"
                  >
                      Block User Account
                  </button>
            </div>
          </div>
        </div>
        <div className="col-md-8  mb-5">
         
          <hr />
          <p>Published Ads:</p>
     
          <div className="row">
          { 
    data && data.length > 0 
    ? data.map((ad) => (
        <div className="col-12 col-md-6 col-lg-4" key={ad._id}>
            <div className="card mb-4">
                <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                        src={ad.cover}
                        className="card-img-top"
                        alt="Ad"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{ad.price ? ad.price.toLocaleString() : 'Price not available'}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{ad.title}</h6>
                    <p className="card-subtitle mb-2 text-muted">{ad.location}</p> <br/>
                    <div className='card-buttons' style={{display:"flex", justifyContent:"space-between"}}>
                    <Link to={`/ad/${ad._id}`}>
                        <button className="btn btn-primary mt-2">Show Full Ad</button>
                    </Link>

                    <button className="btn btn-danger mt-2" onClick={() => handleDeleteAd(ad._id)}>Delete Ad</button>
                    
                    </div>
                </div>
                </div>
            </div>
            ))
        : (
            <div className="col-12 col-md-6 col-lg-4" ></div>
        )
    }
    </div>
         

        </div>
      </div>
    </div>
  );
};

export default UserProfile;