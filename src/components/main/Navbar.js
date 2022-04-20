import jwt_decode from 'jwt-decode';
import { Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import '../css/navbar.css';


const Navbar = (props) => {    
    const navigate = useNavigate();
    const userInfo = useSelector(state => state.userState);
    const cartVals = useSelector(state => state.cartVals);

    const token = localStorage.getItem('token');
    let deToken = null;
    if(token !== null){
        deToken = jwt_decode(token);
    }
    
    const logOut = () => {
        localStorage.clear();
        navigate('/');
    }

   
    return (
        <Fragment>
          
            <nav className="navbar sticky-top flex-md-nowrap p-0 shadow " style={{backgroundColor: '#E8F8F5'}} >
                <div className="container">
                    <span className="navbar-brand col-md-2" >
                        sudoshop
                    </span>
                    
                    {
                        token && deToken.role === "ADMIN" ?
                            <><input className="form-control shadow-sm" type="text" placeholder="Search your Item"/>
                            <ul className="navbar-nav px-3 ">
                                <li className="nav-item text-nowrap ">
                                    <button onClick={()=>logOut()} className="btn btn-link text-decoration-none mybtnhover" style={{fontWeight: '500'}}>Log Out</button>
                                </li>
                            </ul></>:
                        token && deToken.role === 'CUSTOMER'?
                            <>
                            <ul className="nav ">
                                <li className="nav-item">
                                    <NavLink to='/home' className="nav-link btn btn-link mybtnhover" >Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to='/about' className="nav-link btn btn-link mybtnhover" >About</NavLink>
                                </li>
                                <li className="nav-item ">
                                    <NavLink to='/cart' className="nav-link btn btn-link mybtnhover" >Cart{cartVals.cartSize}</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <Dropdown>
                                        <Dropdown.Toggle variant="link">
                                            <FaUserCircle style={{width : '1.5rem', height: '1.5rem', color: 'darkcyan'}}/>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item ><span className="mytextcolor">{userInfo.userName}</span></Dropdown.Item>
                                            <Dropdown.Item ><button onClick={()=>navigate('/changepassword')} className='nav-link btn btn-link mybtnhover'>Change Password</button></Dropdown.Item>
                                            <Dropdown.Item ><button onClick={()=>navigate('/yourorders')} className='nav-link btn btn-link mybtnhover'>Your Orders</button></Dropdown.Item>
                                            <Dropdown.Item ><button onClick={()=>logOut()} className="nav-link btn btn-link mybtnhover" >Log Out</button></Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </li>
                            </ul>
                            </>:
                        <ul className="nav px-0 ">
                            <li className="nav-item text-nowrap ">
                                <NavLink to='/' className="btn btn-link text-decoration-none mybtnhover" >Home</NavLink>
                            </li>
                            <li className="nav-item text-nowrap ">
                                <NavLink to='/about' className="btn btn-link text-decoration-none mybtnhover" >About</NavLink>
                            </li>
                            <li className="nav-item text-nowrap ">
                                <NavLink to='/register' className="btn btn-link text-decoration-none mybtnhover" >Register</NavLink>
                            </li>
                            <li className="nav-item text-nowrap ">
                                <NavLink to='/login' className="btn btn-link text-decoration-none mybtnhover" >Login</NavLink>
                            </li>
                        </ul>
                    }
                    
                </div>
            </nav>
           
        </Fragment>
    )
}

export default Navbar;