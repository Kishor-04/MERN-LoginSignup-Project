import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handelError, handelSuccess } from '../utils';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');

    handelSuccess('USER LOGGEDOUT');

    setTimeout(() => {
      navigate('/login');
    }, 1000)
    console.log('Loggedout Successfully')
  }

  const fetchProducts = async () =>{
    try {
      const url = 'http://localhost:5000/products';
      const headers ={
        headers:{
          'Authorization' : localStorage.getItem('token')
        }
      }
      const response = await fetch(url,headers);
      const result = await response.json();
      console.log(result);

      setProducts(result);

    } catch (error) {
      handelError(error)
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[])


  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button className='bg-purple-900 border-none text-[20px] text-white rounded-[6px] p-[8px] cursor-pointer my-auto mx-0' onClick={handleLogout}>Logout</button>
      <div >
        {
          products && products?.map((item ,index)=>(
            <ul key = {index}>
              <span>{item.name} : {item.price}</span>
            </ul>
          ))
        }
      </div>
      <ToastContainer></ToastContainer>
    </div>
    
  )
}



export default Home
