/* eslint-disable */
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useEffect } from "react";
import { FaUsers } from 'react-icons/fa';
import { MdShoppingCart, MdSpaceDashboard } from 'react-icons/md';
import { SiSmartthings } from 'react-icons/si';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react/cjs/react.development";
import { Fragment } from "react/cjs/react.production.min";
// import '.../';
import Customers from './Customers';
import Dashboard from './Dashboad';
import Orders from './Orders';
import Products from './Products';
import {RiAdminFill} from 'react-icons/ri';
// const dotenv = require('dotenv');
// dotenv.config();

export function Admin(props) {
    const [compName, setCompName] = useState();
    const userInfo = useSelector(state => state.userState);
    const server_url = global.config.server_url;
    console.log('----------getuserdet----------', server_url);

    const dispatch = useDispatch();
    // const [userData, setUserData] = useState();
    const deToken = jwt_decode(localStorage.getItem('token'));

    useEffect(()=>{
        getUserDet();
    },[])

    const getUserDet = async () => {
        console.log('----------getuserdet----------');
        let response = await axios.get(`${server_url}/getuserdet/${deToken.subject}`);
        console.log(response, ' this is the response for get user data.......');
        if(response.data.status){
            // setUserData(response.data.body);
            dispatch({type: 'USER_INFO', payload : response.data.body});
        }else{

        }
    }    

    // console.log(props.username);
    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <nav className="col-md-2  d-md-block bg-light shadow" >
                        <div className="sidebar-sticky sidebar">
                            <p className="d-flex justify-content-center mytextcolor "><RiAdminFill style={{width : '4rem', height: '6rem'}}/></p>
                            <p className="d-flex justify-content-center">
                                
                                <span className="fs-8 " style={{color: "darkcyan"}}>{userInfo.userName} </span>
                            </p>
                            <hr/>
                            <ul className="nav nav-pills flex-column ">
                                <li>
                                    <button className="nav-link " onClick={()=> setCompName('dashboard')} >
                                    <MdSpaceDashboard className="bi me-3" style={{height:'1.5em', width:'1.5em', color:'darkcyan'}} />
                                        Dashboard
                                    </button>
                                </li>
                                <li>
                                    <button className="nav-link " onClick={()=> setCompName('orders')}>
                                    <MdShoppingCart className="bi me-3" style={{height:'1.5em', width:'1.5em', color:'darkcyan'}} />
                                    Orders
                                    </button>
                                </li>
                                <li>
                                    <button  className="nav-link" onClick={()=> setCompName('products')}>
                                    <SiSmartthings className="bi me-3" style={{height:'1.5em', width:'1.5em', color:'darkcyan'}} />
                                    Products
                                    </button>
                                </li>
                                <li>
                                    <button  className="nav-link link-dark" onClick={()=> setCompName('customers')} >
                                    <FaUsers className="bi me-3" style={{height:'1.5em', width:'1.5em', color:'darkcyan'}} />
                                    Users
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-4 px-4 ">
                    
                         {
                             compName === 'dashboard' ? <Dashboard/> :
                             compName === 'orders' ? <Orders/> : 
                             compName === 'products' ? <Products/> :
                             compName === 'customers' ? <Customers/> :
                             <Dashboard/>
                         }

                    </main>
                </div>
            </div>

        </Fragment>
    )
}

export default Admin;