import * as Yup from "yup";

export const signUpSchema = Yup.object({
  username: Yup.string().min(2).max(15).required("Please enter your name*"),
  firstname: Yup.string().min(2).max(10).required("Please enter your First name*"),
  lastname: Yup.string().min(2).max(10).required("Please enter your Last name*"),
  email: Yup.string().email().required("Please enter your email*"),
  password: Yup.string().min(6).required("Please enter your password*"),
  confirm_password: Yup.string()
    .required("Please enter your password")
    .oneOf([Yup.ref("password"), null], "Password must match*"),
  
});

export const adminsignUpSchema = Yup.object({
  username: Yup.string().min(2).max(15).required("Please enter your name*"),
  email: Yup.string().email().required("Please enter your email*"),
  password: Yup.string().min(6).required("Please enter your password*"),
  confirm_password: Yup.string()
    .required("Please enter your password")
    .oneOf([Yup.ref("password"), null], "Password must match*"),
  
});
     
export const signInSchema = Yup.object({
  username: Yup.string().required("Please enter Username*"),
  password: Yup.string().min(6).required("Please enter your password*"),
});

export const serviceFormSchema = Yup.object({
  firstname: Yup.string().min(2).max(25).required("Please enter your first name*"),
  lastname: Yup.string().min(2).max(25).required("Please enter your first name*"),
  phone: Yup.string().matches(/^(0)3\d{9}$/, "Phone number is not valid*").required("Please enter contact number*"),
  city: Yup.string().required("Please select your city*"),
  email: Yup.string().email().required("Please enter your email*"),
  vehiclemodel: Yup.number().required("Please select your vehicle model/year*"),
  vehiclemake: Yup.string().required("Please select your vehicle make*"),
  vehiclevarient: Yup.string().required("Please select your vehicle varient*"),
  serviceType: Yup.string().required("Please select a service type*"),
  servicefield: Yup.string().max(300),
});




export const adFormSchema = Yup.object({
  title: Yup.string().min(8).max(50).required("Enter your Ad title*"),
  category: Yup.string().required("Please Choose Car Category*"),
  price: Yup.number().integer().min(0,"Please Enter Valid Price").required("Please enter price*"),
  location: Yup.string().required("Please select your city*"),
  cover: Yup.string().required("Please upload a cover photo*"), // Updated to accept a string value
  desc: Yup.string().max(500, "Words should not exceed 500 words").required("Please enter description of your Ad*"),
  images: Yup.array(Yup.string()).min(1,"Please upload atleat one image").required("Please Upload image"), // Updated to accept an array of string values
  shortDesc: Yup.string().max(100, "Words should not exceed 100 words").required("Please enter short description of Ad*"),
  transmission: Yup.string().required("Please Choose Car Transmission*"),
  fueltype: Yup.string().required("Please Choose Fuel Type*"),
  mileage: Yup.number().min(0).required("Please enter vehicle driven milege*"),
  vehiclemodel: Yup.number().required("Please select your vehicle model/year*"),
  vehiclemake: Yup.string().required("Please select your vehicle make*"),
  vehiclevarient: Yup.string().required("Please select your vehicle varient*"),
  registercity: Yup.string().required("Please select vehicle registeration city*"),
  registeryear: Yup.number().required("Please select vehicle registeration model/year*"),
  contact: Yup.string().matches(/^(0)3\d{9}$/, "Phone number is not valid*").required("Please enter contact number*"),
  ownername: Yup.string().min(3).max(20).required("Enter your name*")

});

export const EditAdFormSchema = Yup.object({
  title: Yup.string().min(8).max(50).required("Enter your Ad title*"),
  category: Yup.string().required("Please Choose Car Category*"),
  price: Yup.number().integer().min(0,"Please Enter Valid Price").required("Please enter price*"),
  location: Yup.string().required("Please select your city*"),
  desc: Yup.string().max(500, "Words should not exceed 500 words").required("Please enter description of your Ad*"),
  shortDesc: Yup.string().max(100, "Words should not exceed 100 words").required("Please enter short description of Ad*"),
  transmission: Yup.string().required("Please Choose Car Transmission*"),
  fueltype: Yup.string().required("Please Choose Fuel Type*"),
  mileage: Yup.number().min(0).required("Please enter vehicle driven milege*"),
  vehiclemodel: Yup.number().required("Please select your vehicle model/year*"),
  vehiclemake: Yup.string().required("Please select your vehicle make*"),
  vehiclevarient: Yup.string().required("Please select your vehicle varient*"),
  registercity: Yup.string().required("Please select vehicle registeration city*"),
  registeryear: Yup.number().required("Please select vehicle registeration model/year*"),
  contact: Yup.string().matches(/^(0)3\d{9}$/, "Phone number is not valid*").required("Please enter contact number*"),
  ownername: Yup.string().min(3).max(20).required("Enter your name*")

});

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const newPasswordSchema = Yup.object({
newPassword: Yup.string()
.required("New password is required")
.min(6, "Password must be at least 6 characters"),
confirmPassword: Yup.string()
.oneOf([Yup.ref("newPassword"), null], "Passwords must match")
.required("Confirm password is required"),
});
