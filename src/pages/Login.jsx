import React , { useState,useEffect } from 'react'
import newRequest from '../utils/newRequest'
import { useFormik } from "formik";
import { signInSchema } from "../schemas/index";
import { NavLink, useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/animation_ll3j6b3u.json';


export default function Signin({ onLogin }) {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);  
  
  const initialValues = {
    username: "",
    password: ""
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await newRequest.post("/auth/admin/login", { username, password });
    localStorage.setItem("currentAdmin", JSON.stringify(res.data));
    localStorage.setItem("isLoggedIn", "true");
    navigate("/viewads");
    onLogin();
    } catch (err) {
      setError(err.response.data);
    }
  };


  const { values, handleBlur, handleChange, errors, touched } =
  useFormik({
    initialValues,
    validationSchema: signInSchema,
    validateOnChange: true,
    validateOnBlur: false,
  });





console.log(errors);
  return (
    <div>
      
   <header >
      <div className="container py-4 ">
  
    <div className="row d-flex align-items-center justify-content-center vh-100">
      <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6">
      
      <Lottie animationData={animationData}></Lottie>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
      <h1 className="text-center mb-5 mt-4" style={{fontWeight: "800", color: "#333", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", letterSpacing: "1px"}}>
        LOGIN
      </h1>

        <form onSubmit={handleSubmit}>  
        <div className="form-outline mb-2">
                    <label htmlFor="Username" className="form-label">
                      Username
                    </label>
                    <input
                    className='form-control'
                      type="text"
                      autoComplete="off"
                      name="username"
                      id="username"
                      placeholder="Username"
                      value={values.username}
                      onChange={(e) => {
                        handleChange && handleChange(e);
                        setUsername(e.target.value);
                      }}
                      
                      onBlur={handleBlur}
                     
                    />
                    {errors.username && touched.username ? (
                      <p className="form-error" style={{color:"red"}}>{errors.username}</p>
                    ) : null}

                  </div>

                  <div className="form-outline mb-2"> 
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                    className='form-control'
                      type="password"
                      autoComplete="off"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={values.password}
                      onChange={(e) => {
                        handleChange && handleChange(e);
                        setPassword(e.target.value);
                      }}
                      onBlur={handleBlur}
                    />
                    {errors.password && touched.password ? (
                      <p className="form-error" style={{color:"red"}}>{errors.password}</p>
                    ) : null}
                 </div>
  

          <div className="d-flex justify-content-between align-items-center mb-4">
            
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
              <label className="form-check-label" > Remember me </label>
            </div>

          </div>

         <div>
          <button type="submit" className="btn btn-primary btn-md btn-block mb-3">Sign in</button></div>
          <label className='erros' style={{color:"red"}}>{error && error}</label> 
         
          
         
          </form>
      </div>
    </div>
  </div>           
</header>

    </div>
    
  )
}