import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./modal.css"

const NavBar = () => {
    let location = useLocation();
    React.useEffect(() => {

    }, [location]);
    let navigate = useNavigate();
    const [modal, setmodal] = useState(false)
    const [value, setvalue] = useState({name : "" , email : " " , id: "" , date : ""})
    const handlelogout = () => {
        localStorage.removeItem('token')
        navigate("/login");
    }
    const handlesubmit = async () => {
        const response = await fetch(`http://localhost:5000/api/auth/userdetail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = await response.json();
        setmodal(true)
        let name = json.name;
        let email = json.email
        let id = json._id;
        let date = json.date;
        let newdate = date.slice(0,10)
        setvalue({name : name , email: email , id: id , date : newdate})
    }
    const handleclose = () => {
        setmodal(false)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark   ">
                <div className="container-fluid position-sticky">
                    <Link className="navbar-brand" to="/">Notebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item " >
                                <Link   className={`nav-link disabled ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-secondary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-secondary mx-2" to="/singup" role="button">Sing Up</Link>
                        </form> : <button className='btn btn-secondary' onClick={handlelogout}>logout</button>}
                        <button className='btn mx-3 btn-secondary' onClick={handlesubmit}><i className="fa-solid fa-user"></i></button>

                        {modal && <div className="popup">
                            <h2>User Information</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleclose} />
                            <br />
                            <div className="input-group mb-3 dispaly">
                                <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
                                <input type="text" className="form-control" disabled value={value.name} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <div className="input-group mb-3 dispaly">
                                <span className="input-group-text" id="inputGroup-sizing-default">Email Id</span>
                                <input type="text" className="form-control"  disabled value={value.email} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <div className="input-group mb-3 dispaly">
                                <span className="input-group-text" id="inputGroup-sizing-default">User-Id</span>
                                <input type="text" className="form-control"  disabled value={value.id}aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                            <div className="input-group mb-3 dispaly">
                                <span className="input-group-text" id="inputGroup-sizing-default">Date Joined</span>
                                <input type="text" className="form-control"  disabled value={value.date}aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                            </div>
                        </div>}
                    </div>
                </div>
            </nav>
        </div>
    )

}

export default NavBar
