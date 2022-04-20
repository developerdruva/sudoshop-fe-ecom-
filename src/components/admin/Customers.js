import axios from "axios";
import { useEffect, useState } from "react";
import { ImUserMinus, ImUserPlus } from 'react-icons/im';
import { Fragment } from "react/cjs/react.production.min";

const Customers = () => {
    const server_url = global.config.server_url;
    
    const [users, setUsers] = useState([]);    
    const [isChange, setIsChange] = useState(false);

    
    useEffect(()=>{
        setIsChange(false);
        getUsers();
    },[isChange]);

    var getUsers = async () => {
        let response = await axios.get(`${server_url}/usersIn`);
        if(response instanceof Error){
            console.log(response);
        }
        else{
            console.log(response.data);
            setUsers(response.data)
        }
    }
    
    var deleteUser = async (uid) => {
        let response = await axios.delete(`${server_url}/deleteuser/${uid}`);
        console.log(response, 'delete user response');
        if(response.data.isUserDeleted){
            setIsChange(true);
        }
        else{
            alert('user not delete');
        }
    }

    var updateUserRole = async (data) => {
        let response = await axios.put(`${server_url}/updateuserrole`, data);
        console.log(response);
        if(response.data.isUserUpdated){
            setIsChange(true);
        }
        else{
            alert('user not delete');
        }
    }

    return (
        <Fragment>
            <div className="container">
            <h3 className='mytextcolor mb-4 mt-4 lead fs-3 '>Registered Users</h3>
            <div className="table-responsive">
                <table className="table table-hover table-sm ">
                    <thead style={{backgroundColor: 'turquoise'}}>
                        <tr>
                            <th colSpan={6} style={{backgroundColor: 'white', border: 'hidden'}}>Admin</th>
                        </tr>
                        <tr style={{lineHeight: '2'}}>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Password</th>
                            <th>Email ID</th>
                            <th>Mobile Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item, index) => {
                                if(item.role === 'ADMIN'){
                                    return <tr key={index}>
                                                <td>{item.userId}</td>
                                                <td>{item.userName}</td>
                                                <td>password</td>
                                                <td>{item.emailId}</td>
                                                <td>{item.mobileNumber}</td>
                                                <td >
                                                    <div className="btn-toolbar d-flex justify-content-center">
                                                        <div className="btn-group me-2">
                                                            <button className="btn btn-outline-info btn-sm"  onClick={()=>updateUserRole({role : item.role, uid : item.userId})}><ImUserMinus/></button>
                                                        </div>
                                                        <div className="btn-group me-2">
                                                            <button className="btn btn-outline-info btn-sm"  >View</button>
                                                        </div>
                                                        <div className="btn-group ">
                                                            <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteUser(item.userId)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                }
                                else{
                                    return null
                                }
                               
                            })
                        }
                        
                    </tbody>
                    
                </table>
                <table className="table table-hover table-sm">
                    <thead style={{backgroundColor: 'turquoise'}}>
                        <tr>
                            <th colSpan={6} style={{backgroundColor: 'white', border:'hidden'}}>Users</th>
                        </tr>
                        <tr style={{lineHeight: '2'}}> 
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Password</th>
                            <th>Email ID</th>
                            <th>Mobile Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {
                            users.map((item, index) => {
                                if(item.role === 'CUSTOMER'){
                                    return <tr key={index}>
                                                <td>{item.userId}</td>
                                                <td>{item.userName}</td>
                                                <td>password</td>
                                                <td>{item.emailId}</td>
                                                <td>{item.mobileNumber}</td>
                                                <td >
                                                    <div className="btn-toolbar d-flex justify-content-center">
                                                        <div className="btn-group me-2">
                                                            <button className="btn btn-outline-info btn-sm"  onClick={()=>updateUserRole({role : item.role, uid : item.userId})}><ImUserPlus/></button>
                                                        </div>
                                                        <div className="btn-group me-2">
                                                            <button className="btn btn-outline-info btn-sm"  >View</button>
                                                        </div>
                                                        <div className="btn-group ">
                                                            <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteUser(item.userId)}>Delete</button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                }
                                else{
                                    return null
                                }
                            
                            })
                        }
                    </tbody>
                </table>
            </div>
            </div>
        </Fragment>
    )
}

export default Customers;