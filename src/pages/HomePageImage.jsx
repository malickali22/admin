import React, { useState, useEffect, useRef } from 'react';
import newRequest from './../utils/newRequest';

import upload from './../utils/upload';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {


  const coverInputRef = useRef(null);
  const [SingleFile, setSingleFile]=useState(undefined);
  const [uploading, setUploading]=useState(false);
  const [errorMessageCover, setErrorMessageCover] = useState(null);
  const [error, setError] = useState(null);
  const [uploadClicked, setUploadClicked] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleCheckboxChange = (imageId) => {
    setSelectedImage(prevSelectedImage => prevSelectedImage === imageId ? null : imageId);
  };

  const [formData, setFormData] = useState({
    cover: "",
  })


  const { isLoading, error: geterror , data, refetch } = useQuery({
    queryKey: ['covers'],
    queryFn: () =>
      newRequest.get(`/cover/getcover`).then((res) => {
        return res.data;
      }),
  });
 


 const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(SingleFile);
      setUploading(false);
      setUploadClicked(true);
      setFormData((formData) => ({
        ...formData,
        cover,
      }));

    } catch (er) {
      console.log(er);
      setError('An error occurred during image upload');
    }
  };

  const addCover = (file) => {
    setFormData({ ...formData, cover: URL.createObjectURL(file) });
  };

  const handleCoverChanges = (e) => {
    const onesingleFile = e.target.files[0]; // Access the selected file using the files property
    if (!onesingleFile || onesingleFile.length <= 0) {
      setErrorMessageCover('Please select any cover image*');
    } else {
      setSingleFile(onesingleFile);
      setErrorMessageCover('');
    }
  };

  const handleSubmitValue = async (event) => {

    event.preventDefault();
    if (!uploadClicked) {
      console.log('Please upload images before submitting.');
      return;
    }
    // Get the form data from the event target (the form element)
    const form = event.target;
    const data = new FormData(form);

    // Extract the data from the FormData object and update the state
    setFormData({
      cover: data.get('cover'),
    });

    
    try {

      await newRequest.post('/cover/postcover', formData);
      window.location.reload(); 
       
    } catch (err) {
      setError(err.response.data);
      console.error('Error Posting Cover:', error);
    }
  };

  const removeImage = async (id) => {
    try {
      const confirmation =  window.confirm("Are you Sure, you want to delete?")
       if(confirmation){
           await newRequest.delete(`/cover/deletecover/${id}`);
           window.location.reload();
        }else{

        }
       
    } catch (err) {
      setError(err.response.data);
      console.error('Error Deleting Cover:', error);
    }

   
  };

  const handleUseImage = async () => {
    try{
      await newRequest.post(`/cover/selectedcover/${selectedImage}`);
      window.alert("Cover is Changed");
    }catch(err){
      setError(err.response.data);
      console.error('Error Changing Cover:', error);
    }
  };

  
  




  return (
   <div>
       <h1 className="text-center mb-5 mt-4" style={{fontWeight: "800", color: "#333", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: "1px"}}>
        Home Page Cover
      </h1>
      <hr/>
      <form className="row g-3 needs-validation" onSubmit={handleSubmitValue}>
      <div style={{ display: 'flex', gap: '10px', marginTop: '5%', marginBottom: '3%',marginLeft:"3%", position: 'relative' }}>
      <div className="images d-flex col">
  <div className="images">
    <div className="imagesInputs">
      <label style={{ fontWeight: '600' }} className="form-label" htmlFor="">
        Cover Image
      </label>
      <input
        className="form-control"
        type="file"
        accept="image/png, image/gif, image/jpeg, image/jpg"
        name="cover"
        ref={coverInputRef}
        onChange={(e) => {
          handleCoverChanges(e);
          setSingleFile(e.target.files[0]);
          addCover(e.target.files[0])
        }}
        required
        
      />
      </div>
      <div style={{ marginTop: '5%', marginBottom: '4%', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
  {formData.cover && (
    <div style={{ position: 'relative', width: 'calc(33.33% - 10px)', marginBottom: '10px' }}>
      <img
        src={formData.cover}
        alt="Cover"
        style={{ width: '100px', height: '100px', objectFit: 'cover', display: 'block', margin: '5px' }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: '25px',
          height: '25px',
          borderRadius: '50%',
          backgroundColor: 'red',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => removeImage('cover')}
      >
        X
      </div>
    </div>
  )}
</div>

      {errorMessageCover && <p style={{ color: 'red', paddingBottom: '3px', paddingTop: '3px' }}>{errorMessageCover}</p>}
      <button
          type="button" // Add this attribute to prevent form submission
          className="btn btn-primary my-2"
          onClick={handleUpload}
          disabled={!SingleFile}
          
        >
          {uploading ? "Uploading" : "Upload On Cloudinary"}
        </button>

       
      </div>
      </div>
      </div>
      <div className="col-12 pb-5 pt-3" style={{marginLeft: '3%'}}>
    <button className="btn btn-primary" type="submit" disabled={!uploadClicked}>
            Store in Database
          </button>
  </div>
  <label className='erros' style={{color:"red"}}>{error && error}</label> 
      </form>

      {/* /////////////////////////////////////Get Covers/////////////////////////////////// */}
      <h1 className="text-center mb-5 mt-4" style={{fontWeight: "800", color: "#333", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: "1px"}}>
        Uploaded Covers
      </h1>
      <div className="row row-cols-4">
      {isLoading ? (
        <div className='Loading' style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "50px", fontWeight: "500", marginLeft: "10%" }}>Loading..</div>
      ) : (
        <>
          {data?.length > 0 ? (
            data.map((cover, index) => (
              <div key={cover._id} className="col mb-4" style={{ marginLeft: "5%" }}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={cover.imageUrl} // Use the imageUrl property
                    alt={`Cover ${index}`}
                    className="img-fluid"
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      width: '25px',
                      height: '25px',
                      borderRadius: '50%',
                      backgroundColor: selectedImage === cover._id ? 'green' : 'red', // Change color based on selection
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => removeImage(cover._id)} // Pass the _id to removeImage
                  >
                    X
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '-10px',
                      width: '25px',
                      height: '25px',
                      backgroundColor: 'transparent',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedImage === cover._id}
                      onChange={() => handleCheckboxChange(cover._id)}
                      style={{ cursor: 'pointer', transform: 'scale(1.5)' }} // Adjust the scale value as needed
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='Loading' style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "30px", color: "red", fontWeight: "500", marginLeft: "10%" }}>Cover isn't Uploaded</div>
          )}

        </>
      )}
    </div>
    <button className="btn btn-primary m-2 " onClick={handleUseImage}>Use Selected Image</button>
      <label className='error' style={{ color: 'red' }}>
        {geterror && geterror}
      </label>

    </div>
  );
};

export default HomePage;
