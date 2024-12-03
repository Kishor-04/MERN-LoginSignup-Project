import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from '../utils';


function Signup() {

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate(); //This function helps to not refresh while switching the links

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    const copySignupInfo = { ...signupInfo };
    console.log(copySignupInfo);
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);

  }

  const handleSignup = async (e) => {
    e.preventDefault();

    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handelError('Name, email and password are required')
    }

    try {
      const url = "http://localhost:5000/auth/signup";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handelSuccess(message);
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      } else if (error) {
        const details = error?.details[0].message;
        handelError(details);
      } else if (!success) {
        handelError(message);
      }
  console.log(result);
} catch (error) {

}
  }
return (
  <div className='flex flex-col bg-[#fff] py-[32px] px-[48px] rounded-[10px] w-[400px] shadow-custom'>
    <h1 className='mb-[20px] text-3xl font-semibold'>Signup</h1>
    <form className='flex flex-col gap-[10px] ' onSubmit={handleSignup}>
      <div className='flex flex-col'>
        <label className='text-[20px]' htmlFor="name">Name</label>
        <input className='w-full text-[18px] p-[10px] outline-none border-b-2 border-black placeholder:text-[15px] placeholder:italic'
          onChange={handleChange}
          type="text"
          name="name"
          autoFocus
          placeholder='Enter Your name...'
          value={signupInfo.name} />
      </div>
      <div className='flex flex-col'>
        <label className='text-[20px]' htmlFor="email">Email</label>
        <input className='w-full text-[18px] p-[10px] outline-none border-b-2 border-black placeholder:text-[15px] placeholder:italic'
          onChange={handleChange}
          type="email"
          name="email"
          placeholder='Enter Your email...'
          value={signupInfo.email} />
      </div>
      <div className='flex flex-col'>
        <label className='text-[20px]' htmlFor="password">Password</label>
        <input className='w-full text-[18px] p-[10px] outline-none border-b-2 border-black placeholder:text-[15px] placeholder:italic'
          onChange={handleChange}
          type="password"
          name="password"
          placeholder='Enter Your password...'
          value={signupInfo.password} />
      </div>
      <button className='bg-purple-900 border-none text-[20px] text-white rounded-[6px] p-[8px] cursor-pointer my-auto mx-0'>Signup</button>
      <span>Already have an account ?
        <Link to="/login">Login</Link>
      </span>
    </form>
    <ToastContainer></ToastContainer>


  </div>
)
}

export default Signup
