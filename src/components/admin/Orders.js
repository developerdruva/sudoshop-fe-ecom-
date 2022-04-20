// /* eslint-disable */ 
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Fragment } from "react/cjs/react.production.min";

const Orders = () => {
    const [orderInfo, setOrderInfo] = useState([]);
	const server_url = global.config.server_url;

    useEffect( ()=>{
        axios.get(`${server_url}/ordersin`).then(res => {
            console.log('------------res in useEffect', res);
            if(res instanceof Error){
                console.log('error'); 
            }else{
                setOrderInfo(res.data);
            }
        });
    },[]);

    return(
        <Fragment>
            <div className="container vh-100">
                <div className="">
                    <Card className='col-md-12 ' style={{backgroundColor: "", border: '0'}}>
                        <Card.Body >
                            <Card.Title className='lead mytextcolor mb-4 '><span className='border-bottom border-info rounded'>Orders:</span></Card.Title>
                            <table className="ordertab" width='100%'>
                                {
                                    orderInfo.map((item,index)=>{
                                        return <tbody key={index} className='shadow-lg text-secondary'>
                                                    <tr className="">
                                                        <td width='40%' valign="top" className=" p-3 mb-3">  
                                                            Order ID: <span className="fs-6 lead text-success border-bottom border-info"> {item.orderId}</span>  <br/>
                                                            Payment ID: <span className="fs-6 lead text-success "> {item.paymentId}</span>  <br/>
                                                            Mobile: <span className="fs-6 lead ">{item.details.mobile} </span><br/>
                                                            Email: <span className="fs-6 lead "> {item.emailId}</span><br/><br/>
                                                            Total Amount: <span className="fs-6 lead "><span className="fs-6 text-primary">&nbsp;{item.details.amount}/-</span> </span><br/>
                                                            Payment Status: <span className="fs-6 lead ">{item.orderId ? <span className="text-success lead"> <b>&nbsp;Success</b></span>: <span className="text-warning lead">Failed</span>}</span>  <br/><br/><br/>
                                                            This order made on User ID: <span className="fs-6 lead">{item.userId}</span> 
                                                        </td>
                                                        <td width='30%'>
                                                        <span className="fs-6 lead ">Customer Address:</span>
                                                            <p style={{paddingLeft: '1rem'}}>
                                                                {item.details.address.split(',').map((i,j)=>{
                                                                    return <span key={j}>
                                                                        {i}{item.details.address.split(',').length-1 === j ?<span>.</span> : <span>,</span>} <br/>
                                                                        </span>
                                                                })}
                                                            </p>
                                                        </td>
                                                        <td width='30%' valign="middle">
                                                        <span className="fs-6 lead ">Products:</span> <br/>
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
                    </Card>
                </div>
            </div>
        </Fragment>
    )
}

export default Orders;