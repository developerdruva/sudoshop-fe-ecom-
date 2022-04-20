/* eslint-disable */ 
import axios from "axios";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import DateObject from "react-date-object";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react/cjs/react.production.min";
// import '../css/orders.css';

export default function YourOrders(){
    const dispatch = useDispatch();
    // const dateObj = useState( new DateObject());
    const orderInfo = useSelector(state=>state.orderState);
    const userInfo = useSelector(state=>state.userState);
    const server_url = global.config.server_url;

    useEffect( ()=>{
        axios.get(`${server_url}/orderbyuser/${userInfo.userId}`).then(res => {
            if(res instanceof Error){
                dispatch({type : 'User_Orders', payload : null})
            }else{
                dispatch({type : 'User_Orders', payload : res.data})
            }
        });
    },[]); 
    
    return (
        <Fragment>
            <div className="container">
                <p className="fs-5 lead mytextcolor mt-5">Hi <span className="text-info">{userInfo.userName}</span>, your total orders: <span className="text-info">{orderInfo.length}</span></p>
                <div className="mt-1">
                    {
                        orderInfo.length > 0 ?
                            <Card className='col-md-12 ' style={{backgroundColor: "", border: '0'}}>
                            <Card.Body >
                                <Card.Title className='lead  mb-4 text-secondary '>Order Details:</Card.Title>
                                <table className="ordertab" width='100%'>
                                    {
                                        orderInfo.map((item,index)=>{
                                            return <tbody key={index} className='shadow-lg text-secondary'>
                                                        <tr className="">
                                                            <td width='40%' valign="top" className=" p-3 mb-3">  
                                                                <span className="fs-6 lead text-success border-bottom border-info">Order ID: {item.orderId}</span>  <br/>
                                                                <span className="fs-6 lead text-success border-bottom border-info">Order Date: {item.date}</span>  <br/>
                                                                <span className="fs-6 lead ">Customer Number: </span>{item.details.mobile}<br/>
                                                                <span className="fs-6 lead ">Customer Email: </span>{item.emailId}<br/><br/>
                                                                <span className="fs-6 lead ">Total Amount: </span><span className="fs-6 text-primary">&nbsp;{item.details.amount}/-</span><br/>
                                                                <span className="fs-6 lead ">Payment Status: </span>{item.orderId ? <span className="text-success lead"> <b>&nbsp;Success</b></span>: <span className="text-warning lead">Failed</span>}  <br/><br/><br/>
                                                                
                                                            </td>
                                                            <td width='30%'>
                                                            <span className="fs-5 lead mytextcolor">Address:</span>
                                                                <p style={{paddingLeft: '1rem'}}>
                                                                    {item.details.address.split(',').map((i,j)=>{
                                                                        return <span key={j}>
                                                                            {i}{item.details.address.split(',').length-1 === j ?<span>.</span> : <span>,</span>} <br/>
                                                                            </span>
                                                                    })}
                                                                </p>
                                                            </td>
                                                            <td width='30%' valign="middle">
                                                            <span className="fs-5 lead mytextcolor">Products:</span> <br/>
                                                                {
                                                                    item.details.products.map((i,j)=>{
                                                                        return <div className="d-flex flex-row" key={j}>
                                                                        <div className="p-1 col-md-9 " >
                                                                            <div className="d-flex flex-column" >
                                                                                <div className="p-1">{i.product.name}</div>
                                                                                <div className="p-1">{i.product.price}</div>
                                                                                <div className="p-1">{i.val}</div>
                                                                            </div>    
                                                                        </div>
                                                                        <div className="d-flex col-md-3 justify-content-center align-items-center" ><img src={i.product.imageUrl} style={{width:'2rem', height:'4rem'}} alt='product url'/></div>
                                                                        
                                                                    </div>
                                                                    })
                                                                }
                                                            </td>
                                                    </tr>
                                            </tbody>
                                            })
                                        }
                                </table>                            
                            </Card.Body>    
                        </Card> :
                        <h1 className="text-info display-1">you didn't made any orders :(</h1>
                    }
                    
                </div>
            </div>
        </Fragment>
    )
}