import axios from "axios";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";

const Register = () => {
    const navigate = useNavigate();
    const server_url = global.config.server_url;

    const [showOtp, setShowOtp] = useState(false);
    const [authModal, setAuthModal] = useState(false);
    const [userOtp, setUserOtp] = useState();
    const [Otp, setOtp] = useState();
    const [authUserRes, setAuthUserRes] = useState({
        detail : '',
        val : ''
    });
    const [userRegAuth, setUserRegAuth] = useState({
        isShow : false,
        result : false,
        body : ''
    });
    const [form, setForm] = useState({
        userId: '',
        userName: '',
        password: '',
        emailId: '',
        mobileNumber: ''
    });  


    const registerUser = async () => {
        const response = await axios.post(`${server_url}/register`, form);    
        if (response.data.isRegistered === true) {
            setUserRegAuth({
                isShow : true,
                result : true,
                body : response.data
            });
        } else {
           setUserRegAuth({
               isShow : true,
               result : false,
               body : response.data
           })
        }
    }

    const submitForm = async (event) => {
        event.preventDefault();
        const response = await axios.post(`${server_url}/checkuser`, form);
        if(response.data.isIn){
            setAuthUserRes({detail : response.data.result.entity, val : response.data.result.val});
            setAuthModal(true);
        }else{
            const sendOtp = await axios.post(`${server_url}/sendotp/${form.mobileNumber}`);
            setOtp(sendOtp.data.otp);
            setShowOtp(true);
        }        
    }
    const otpHandler = (event) => {
        event.preventDefault();
        userOtp === Otp ? registerUser() : setUserRegAuth({
            isShow: true,
            result : false,
            body: "Invalid otp"
        });
    }
    const updateState = (event) => {
        var name = event.target.name;
        setForm({
            ...form,
            [name]: event.target.value
        })
    }

    return(
        <Fragment>
             <div className='container pt-3'>
                <div className="card mt-5 w-100 " style={{border:"0"}} >
                <div className="row mt-3">
                    <div className="col-md-5 border-light shadow-lg ">
                        <form onSubmit={submitForm} className="signinform" id="regForm">
                            <div className="m-4">
                                <div className="col-md-12 mb-1 form-floating ">
                                    <input type="text" className="form-control form-control-sm" name="userId" onChange={updateState} id="userid" placeholder="userid"/>
                                    <label htmlFor="userid" >user id</label>
                                </div>
                                <div className="col-md-12 mb-1 form-floating ">
                                    <input type="text" className="form-control" name="userName" id="username" onChange={updateState} placeholder="username"/>
                                    <label htmlFor="username" >username</label>
                                </div>
                                <div className="col-md-12 mb-1 form-floating">
                                    <input type="password" className="form-control" name="password" id="passwordField" onChange={updateState} placeholder="email id"/>
                                    <label htmlFor="passwordField" >password</label>
                                </div>
                                <div className="col-md-12 mb-1 form-floating ">
                                    <input type="email" className="form-control" name="emailId" id="email" onChange={updateState} placeholder="email"/>
                                    <label htmlFor="email" >email id</label>
                                </div>
                                <div className="col-md-12 mb-1 form-floating ">
                                    <input type="number" className="form-control" name="mobileNumber" id="umobile" onChange={updateState} placeholder="umobile"/>
                                    <label htmlFor="umobile" >mobile number</label>
                                </div>
                                <div className="btn-toolbar  mb-2 mt-4 ">
                                    <div className="btn-group col-md-5  me-5" >
                                        <button type="reset" className="btn btn-link bg-light">Reset</button>
                                    </div>
                                    <div className="btn-group col-md-5  bg-light" >
                                        <button type="submit" className="btn btn-link bg-light" >Submit</button>
                                    </div>
                                </div>
                               
                            </div>
                        </form>
                    </div>
                    
                    <div className="col-md-7 p-5" style={{borderLeft: "0px solid darkgrey"}}>
                    <div className="card-body">
                        <h5 className=" display-4 text-info">Welcome to sudoshop</h5>
                        <p className="card-text lead mt-4 ">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text mt-5"><small className="text-muted">If you new user ? please <NavLink className="btn btn-link" to='/login'>login</NavLink></small></p>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            <Modal show={authModal}>
                <Modal.Header className="lead text-warning">Authentication Warning</Modal.Header>
                <Modal.Body className="text-danger" align='center'>
                    {authUserRes.detail} : {authUserRes.val} is already exited <br/>
                    try login here.....
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info btn-md" onClick={()=> navigate('/login')}>Login</button>
                    <button className="btn btn-secondary btn-md" onClick={()=> setAuthModal(false)} >Back</button>
                </Modal.Footer>
            </Modal>

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
            <Modal show={userRegAuth.isShow}>
                <Modal.Header className="lead text-info">Message</Modal.Header>
                <Modal.Body className="" align='center'>
                   {userRegAuth.result ? <span className="text-success lead">You are successfully Registered</span>: <span className="text-danger lead">{userRegAuth.body}</span>}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info btn-md" onClick={()=>navigate('/login')}>Login</button>
                    <button className="btn btn-secondary btn-md"  onClick={()=> setUserRegAuth({isShow : false})}>Back</button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Register;