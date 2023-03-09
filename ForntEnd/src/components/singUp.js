
import './singup.css';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Singup = (props) => {
    const [creadential, setcreadential] = useState({ name: "", email: "", password: "", password2: "" })
    const [emailvertify, setemailvertify] = useState(false)

    let navigate = useNavigate();
    const handlesubmit = async (e) => {
        const { name, email, password } = creadential;
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json();
        console.log(json)
        if (json.sucess) {
            localStorage.setItem("token", json.authToken);
            navigate("/");
            props.showalert("Account created Successfully", "success")
        }
        else {
            props.showalert("Invalid Details", "danger")
            setemailvertify(true)
        }
        setTimeout(() => {
            setemailvertify(false)
        }, 3000);

    }
    const change = (e) => {
        setcreadential({ ...creadential, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form className="container singupfrom" onSubmit={handlesubmit}>
                <div id="login-box">
                    <div className="left-box">
                        <h1> Sign Up </h1>
                        <input type="text" name="name" placeholder="Username" onChange={change} required />
                        <input type="text" name="email" placeholder="Email" required onChange={change} />
                        {emailvertify && <div style={{ color: "red" }}><i className="fa-solid mx-3 fa-triangle-exclamation"></i>Eamil Is alredy Registerd</div>}
                        <input type="password" name="password" placeholder="Password" required onChange={change} minLength={5} />
                        <input type="password" name="password2" placeholder="Retype Password" onChange={change} minLength={5} />
                        <br />
                        <input type="submit" name="singup-button" placeholder="Sing Up" />
                    </div>
                    {/* <div className="right-box">
                    <span className="signinwith">Sign in with<br />Social Network </span>
                    <button className="social facebook">Log in with Facebook</button>
                    <button className="social twitter">Log in with Twitter</button>
                    <button className="social google">Log in with Google+</button>
                </div>
                <div className="or">OR</div> */}
                </div>
            </form>
        </>
    )
}
export default Singup