import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({emailId: "", password: ""});
	const server_url = global.config.server_url;
	const dispatch = useDispatch();
	
    const submitForm = async (event) => {
        event.preventDefault();
        let response = await axios.post(`${server_url}/login`, form);
        if (response instanceof Error) {
            alert("Login unsuccessful!");
        } else {
            if (response.data.token) {
				localStorage.setItem("token", response.data.token);
				let deToken = jwt_decode(response.data.token);
				if(await localStorage.getItem('token')){
					dispatch({type:'AUTH', payload: true});
				}
				if(deToken.role === 'CUSTOMER' && localStorage.getItem('token')){					
					navigate('/home');
				}else if(deToken.role === 'ADMIN' && localStorage.getItem('token')){
					navigate('/admin');
				}
            } else if(response.data.error) {
                alert(response.data.error);
            }
        }
    }
    const updateState = (event) => {
        var name = event.target.name;
        setForm({
            ...form,
            [name]: event.target.value
        })
    }
    return (
        <Fragment>

            <div className='container pt-3'>
			<div className="card mt-5 w-100 " style={{border:"0"}} >
			  <div className="row mt-3">
				<div className="col-md-5 border-light shadow-lg ">
					<form className="signinform" onSubmit={submitForm}>
						<div className="m-5 ">
							<div className="col-md-12 mb-3 form-floating ">
								<input type="email" className="form-control" onChange={updateState} name="emailId" id="emailField" placeholder="email id"/>
								<label htmlFor="emailField" >emailId</label>
							</div>
							<div className="col-md-12 mb-3 form-floating">
								<input type="password" className="form-control" onChange={updateState} name="password" id="passwordField" placeholder="email id"/>
								<label htmlFor="passwordField" >password</label>
							</div>
							<div className="btn-toolbar col-md-12  mb-3 mt-5 ">
								<div className="btn-group col-md-5  me-5" >
									<button type="reset" className="btn btn-link bg-light">Reset</button>
								</div>
								<div className="btn-group col-md-5  bg-light" >
									<button type="submit" className="btn btn-link bg-light" >Sign In</button>
								</div>
							</div>
							<div className="btn-toolbar col-md-12 mb-3 ">
								<div className="btn-group col-md-12 ">
									<NavLink className="btn btn-link" to='/forgotpass'>Forgot Password ?</NavLink>
								</div>
							</div>
						</div>
					</form>
				</div>
				
				<div className="col-md-7 p-5" style={{borderLeft: "0px solid darkgrey"}}>
				  <div className="card-body">
					<h5 className=" display-4 text-info">Welcome to sudoshop</h5>
					<p className="card-text lead mt-4 ">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
					<p className="card-text mt-5"><small className="text-muted">If you new user ? please <NavLink className="btn btn-link" to='/register'>register</NavLink></small></p>
				  </div>
				</div>
			  </div>
			</div>
		</div>
        </Fragment>
    )
}

export default Login;