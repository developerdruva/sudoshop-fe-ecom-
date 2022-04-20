import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForgotPass = ()=>{
    let navigate = useNavigate();
    const server_url = global.config.server_url;

    const [form, setForm] = useState({
        emailId: "", 
        mobileNumber: "",
    });
    const [showOtp, setShowOtp] = useState(false);
    const [userOtp, setUserOtp] = useState();
    const [mainOtp, setMainOtp] = useState();
    const [passRecShow, setPassRecShow] = useState(false);
    const [passDetails, setPassDetails] = useState({
        emailId: '',
        newPass : ''
    });
    const [passAuth, setPassAuth] = useState({
        isShow : false,
        message : ''
    });

    const submitForm = async (event) => {
        event.preventDefault();
        let response = await axios.post(`${server_url}/datacheck`, form);
        if (response.data.userCheck) {
            if(response.data.isSent){
                setMainOtp(response.data.otp);
                setShowOtp(true);
            }else{
                alert("otp not sent check mobile number");
            }
        } else {
            alert(response.data.status);
        }
    }
    const updateState = (event) => {
        var name = event.target.name;
        setForm({
            ...form,
            [name]: event.target.value
        })
    }
    const otpHandler = (event) => {
        event.preventDefault();
        if(userOtp === mainOtp ){
            setPassRecShow(true)
            setPassDetails({...passDetails, emailId : form.emailId})
         }else{
            
         } 
    }
    const recoverPassword = async (event)=>{ // nothing but changing old password with new password
        event.preventDefault();
        const res = await axios.post(`${server_url}/passwordrecovery`, passDetails);
        if(res.data.isChanged){
            setPassAuth({
                isShow : true,
                message : "your password changed successfully login now"
            })
            // alert('password changed success you can login now');
        }else{
            setPassAuth({
                isShow : true,
                message : "your password not changed"
            })
        }
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
								<input type="text" className="form-control" onChange={updateState} name="mobileNumber" id="passfield" placeholder="email id"/>
								<label htmlFor="passfield" >mobile number</label>
							</div>
							<div className="btn-toolbar col-md-12  mb-3 mt-5 ">
								<div className="btn-group col-md-5  me-5" >
									<button type="reset" className="btn btn-link bg-light">Reset</button>
								</div>
								<div className="btn-group col-md-5  bg-light" >
									<button type="submit" className="btn btn-link bg-light" >Verify</button>
								</div>
							</div>
						</div>
					</form>
				</div>
                <div className="col-md-7 p-5" style={{borderLeft: "0px solid darkgrey"}}>
				  <div className="card-body">
					<h5 className=" fs-3 lead text-info">Verify your Identity to change password</h5>
					<p className="card-text lead mt-4 ">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
				  </div>
				</div>
			  </div>
			</div>
		</div>

        <Modal show={showOtp}>
            <Modal.Header className="lead text-success">Verify Mobile Number</Modal.Header>
            <form onSubmit={otpHandler}>
            <Modal.Body className="text-info" align='center'>
                <div className="form-signin">
                    <div className="form-floating m-2">
                        <input className="form-control" type="number" id="otp"  name="otp" placeholder="Enter OTP" onChange={(event) => setUserOtp(event.target.value)}/>
                        <label htmlFor="otp">Enter OTP here:</label>
                    </div>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <button type="submit" className="btn btn-info btn-md" onClick={()=>setShowOtp(false)}>Submit</button>
                <button className="btn btn-secondary btn-md" onClick={()=>setShowOtp(false)} >Back</button>
            </Modal.Footer>
            </form>
        </Modal>

        <Modal show={passRecShow}>
            <Modal.Header className="lead text-success">Mobile Number Verified enter OTP</Modal.Header>
            <form onSubmit={recoverPassword}>
                <Modal.Body className="text-info" align='center'>
                    <div className="form-signin">
                        <div className="form-floating m-2">
                            <input className="form-control" type="email" id="email"  name="emailId"  value={form.emailId} disabled placeholder="Enter OTP" />
                            <label htmlFor="email">emailId</label>
                        </div>
                        <div className="form-floating m-2">
                            <input className="form-control" type="password" id="password"  name="newPass" onChange={(event) => setPassDetails({...passDetails, newPass : event.target.value})}/>
                            <label htmlFor="password">enter new password</label>
                        </div>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className="btn btn-info btn-md" onClick={()=>setPassRecShow(false)}>Submit</button>
                    <button className="btn btn-secondary btn-md" onClick={()=>setPassRecShow(false)} >Back</button>
                </Modal.Footer>
            </form>
        </Modal>
        <Modal show={passAuth.isShow}>
            <Modal.Header className="lead text-info">Message</Modal.Header>
            <Modal.Body className="" align='center'>
                {passAuth.message}
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-info btn-md" onClick={()=>navigate('/')}>Login</button>
                <button className="btn btn-secondary btn-md"  onClick={()=>setPassAuth({isShow : false})}>Back</button>
            </Modal.Footer>
        </Modal>
        </Fragment>
    )
}

export default ForgotPass;