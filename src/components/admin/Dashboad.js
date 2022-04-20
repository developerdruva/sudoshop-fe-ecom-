import { useEffect, useState } from "react"
import {Fragment} from "react/cjs/react.production.min"
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = (props) => {
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [orderInfo, setOrderInfo] = useState([]);
    // const server_url = useSelector(state=>state.server_url);
    // console.log('server url in useeffect , ', server_url);const server_url = 'http://localhost:8989'
    // const [server_url, setServerUrl] = useState('http://localhost:8989');
    const server_url = global.config.server_url;

    useEffect(()=>{
        // const server_url = 'http://localhost:8989'
        console.log('server url in useeffect , ', server_url);
        getUsers();
        getProducts();
        axios.get(`${server_url}/ordersin`).then(res => {
            console.log('------------res in useEffect', res);
            if(res instanceof Error){
                console.log('error'); 
            }else{
                setOrderInfo(res.data);
            }
        });
    },[]);



    var getProducts = async () => {
        let response = await axios.get(`${server_url}/products`);
        if(response instanceof Error){
            console.log(response);
        }
        else{
            console.log(response.data);
            setProducts(response.data)
        }
    }
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
    let count = 0;
    users.map((item, index) => {
        if(item.role === 'ADMIN'){
            count = count+1;
            
        }
        return count
    })

    return (
        <Fragment>
            <div className="d-flex  p-4">
                
                <div className="container">
                <h1 className="mb-4 fs-3 lead mytextcolor">Admin Dashboard</h1>
                    <div className="row">
                        <div className="col-sm-4 " >
                            <div className="card text-white mb-3" style={{height:'20rem', width: '18rem', backgroundColor: '#80ffe5'}}>
                                <div className="card-header">No. Of Users</div>
                                <div className="card-body mt-4"style={{color: 'darkcyan', textAlign: 'center', verticalAlign: 'center'}}>
                                    <h1 className="card-text display-1"><span></span>{users.length}</h1>
                                </div>
                                <div className="card-footer ">
                                    <p className="card-text">These are admin: &nbsp;<span>{count}</span></p>
                                    <p className="card-text">These are users: &nbsp;<span>{users.length - count}</span> </p>    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 " >
                            <div className="card  shadow " style={{height:'20rem', width: '18rem',backgroundColor: '#99e6e6'}}>
                                <div className="card-header">No. Of Products</div>
                                <div className="card-body  mt-4" style={{color: 'darkcyan', textAlign: 'center', verticalAlign: 'center'}}>
                                    <span className="display-1" >{products.length}</span>
                                </div>
                                <div className="card-footer " style={{}}>
                                    <p className="card-text">These are products:
                                        {
                                            
                                        }
                                    </p>
                                    <p className="card-text">These are :
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3" >
                            <div className="card text-white mb-3 " style={{height:'20rem', width: '18rem', backgroundColor: '#00cccc'}}>
                            <div className="card-header ">No. Of Orders</div>
                                <div className="card-body mt-4" style={{color: 'darkcyan', textAlign: 'center', verticalAlign: 'center'}}>
                                    <h1 className="card-title display-1"><span>{orderInfo.length}</span></h1>
                                </div>
                                <div className="card-footer">
                                    <p className="card-text">These are orders :
                                        {
                                            
                                        }
                                    </p>
                                    <p className="card-text">These are :
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default Dashboard;