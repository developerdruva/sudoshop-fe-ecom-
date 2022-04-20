import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { useNavigate } from "react-router-dom";

const ChangePass = ()=>{
    let navigate = useNavigate();
	const server_url = global.config.server_url;

    const [form, setForm] = useState({
        emailId: "", 
        currentPass: "",
        newPass : ''
    });
    const token = localStorage.getItem('token');
    
    const submitForm = async (event) => {
        event.preventDefault();
        let response = await axios.post(`${server_url}/passwordchange`, form, {headers: {Authorization:token}});
        if (response.data.isChanged) {
			navigate('/home');
            alert("password updated successful!");
        } else {
            alert("password update failed");
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
                            <div className="col-md-12 mb-3 form-floating ">
								<input type="text" className="form-control" onChange={updateState} name="currentPass" id="passfield" placeholder="email id"/>
								<label htmlFor="passfield" >current password</label>
							</div>
							<div className="col-md-12 mb-3 form-floating">
								<input type="text" className="form-control" onChange={updateState} name="newPass" id="passwordField" placeholder="email id"/>
								<label htmlFor="passwordField" >new password</label>
							</div>
							<div className="btn-toolbar col-md-12  mb-3 mt-5 ">
								<div className="btn-group col-md-5  me-5" >
									<button type="reset" className="btn btn-link bg-light">Reset</button>
								</div>
								<div className="btn-group col-md-5  bg-light" >
									<button type="submit" className="btn btn-link bg-light" >Update</button>
								</div>
							</div>
						</div>
					</form>
				</div>
                <div className="col-md-7 p-5" style={{borderLeft: "0px solid darkgrey"}}>
				  <div className="card-body">
					<h5 className=" fs-3 lead text-info">Change your password any time</h5>
					<p className="card-text lead mt-4 ">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
				  </div>
				</div>
			  </div>
			</div>
		</div>
        </Fragment>
    )
}

export default ChangePass;