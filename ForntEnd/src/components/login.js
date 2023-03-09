import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const [creadential, setcreadential] = useState({ email: "", Password: "" })
 

  const chnage = (e) => {
    setcreadential({ ...creadential, [e.target.name]: e.target.value })
  }
  let navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: creadential.email, password: creadential.Password })
    });

    const json = await response.json();
    console.log(json)
    if (json.sucess) {
      localStorage.setItem("token", json.authToken);
      props.showalert("Successfully Login", "success")
      navigate("/");
    }
    else {
      props.showalert("Invalid Details", "danger")
   
    }
    

  }
  return (
    <>
      <form onSubmit={handlesubmit}>
        <h1 className='my-4'>Login Here</h1>
        <div className="mb-3 my-5">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={chnage} value={creadential.email} name="email" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
         
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="Password" className="form-control" id="Password" onChange={chnage} value={creadential.password} name="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </>
  )
}

export default Login