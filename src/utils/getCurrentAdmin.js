const getCurrentAdmin = () => {
    return JSON.parse(localStorage.getItem("currentAdmin"));
  };
  
  export default getCurrentAdmin