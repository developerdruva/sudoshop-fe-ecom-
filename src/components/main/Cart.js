/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import { BsCartX } from "react-icons/bs";

const Cart = (props) => {
    const [userCart, setUserCart] = useState([]);
    const [cartPrice, setCartPrice] = useState(0);
    const [isChanged, setIsChanged] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const server_url = global.config.server_url;

    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        customer : '',
        mobile : '',
        emailId : '',
        drnstrt : '',
        city : '',
        district : '',
        state : '',
        pincode : ''
    });

    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userState);
    const cartVals = useSelector(state => state.cartVals);
    
    useEffect(()=>{
        getProduct();        
        setIsChanged(false);
    },[isChanged, cartPrice]);

    let price= 0;
    
    var getProduct = async () => {
        let getCartDet = await axios.get(`${server_url}/getusercart/${userInfo.userId}`);        
        if(getCartDet.data.status !== false){
            const cart = getCartDet.data.status.cart;
            let productIds = [];
            let size = 0;
            cart.map((item,index)=>{
                productIds.push(item.pid);
                size = size + item.val;
                return size
            });
            
            const data = [];
            const productList = await axios.post(`${server_url}/userproducts`, {pids : productIds});
            if(productList instanceof Error){
                console.log( '-----------------------------------');
            }else{
                cart.map((item,index)=>{
                    productList.data.products.map((x, i)=>{
                        if(item.pid === x.pid){
                            data.push({product : x, val : item.val});
                            price = price + (item.val * x.price);
                        }
                        return price
                    })
                    return item
                })
                setCartPrice(price);
                setUserCart(data);
                dispatch({type: 'Cart_Vals', payload : {size : size, price : price}});
                dispatch({type: 'Cart_Items', payload : data});
            }
        }else{
            setUserCart([]);
        }
    }
    let incItem = async ( pid)=>{
        let body = {uid : userInfo.userId, pid : pid};
        let res = await axios.post(`${server_url}/increaseitem`, body);
        if(res.data.modifiedCount){
            setIsChanged(true);
        }else{
            setIsChanged(false);
        }
    }
    let decItem = async (pid)=>{
        let body = {uid : userInfo.userId, pid : pid};
        let res = await axios.post(`${server_url}/decreaseitem`, body);
        if(res.data.modifiedCount){
            setIsChanged(true);
        }else{
            setIsChanged(false);
        }
    }
    let clearCart = async () =>{
        let res = await axios.delete(`${server_url}/deleteusercart/${userInfo.userId}`);
        if(res.data.deletedCount > 0){
            setCartPrice(0);
            dispatch({type: 'Cart_Vals', payload : {size : null}});
            setIsChanged(true);
        }else{
            setIsChanged(false);
        }
    }
    let takeAddress = (event) => {
        event.preventDefault();        
        dispatch({type: 'Cust_Addrs', payload : form});
        navigate('/checkout');
    }
    return(
        <Fragment>
           
            <div className="container mt-4">
                
                <table width="100%">
                    <tbody  >
                        <tr>
                            <td align="right">
                            <span className="lead text-success p-2  shadow-sm border-bottom rounded border-info " >{userInfo.userName}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {
                    userCart.length > 0 ?
                    <div className="row">
                    
                    <Card className='col-md-6 mt-0 me-5' style={{backgroundColor: "", border: '0'}}>
                        
                        <Card.Body >
                            <Card.Title className='lead mytextcolor mb-4'>Items in your Cart : {cartVals.cartSize}
                                <span className="fs-6 lead mytextcolor"></span>
    
                            </Card.Title>
                            
                          {
                              userCart.map((item,index)=>{
                                  return <div className="row shadow mt-2" key={index} >
                                            <div className="col-md-4 shadow  ">
                                                <Card.Img src={item.product.imageUrl} className="m-2 me-1" style={{width:'3rem',height: '6rem'}}></Card.Img>
                                                <span className="m-2 mytextcolor">Qnty: </span><span className=" fs-3 lead text-success">{item.val}</span>
                                            </div>
                                            <div className="col-md-2">
                                                <button onClick={()=>incItem(item.product.pid)} className="btn btn-outline-info btn-sm">Qnty+1</button>
                                                <button onClick={()=>decItem(item.product.pid)} className="btn btn-outline-info btn-sm mt-3 mb-3 ">Qnty-1</button>
                                            </div>
                                            <div className="col-md-6 d-flex justify-content-end" >
                                                <table style={{width: '100%'}} className=''>
                                                    <tbody >
                                                        <tr>
                                                            <td width='50%'>Brand</td>
                                                            <td width='50%' align="right">{item.product.brand}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Product</td>
                                                            <td align="right">{item.product.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Price</td>
                                                            <td align="right">{item.product.price}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                              })
                          }
                            
                            
                            
                            
                        </Card.Body>    
                    </Card>
                    <Card className='col-md-5 mt-2' style={{backgroundColor: "", border: '0'}}>
                    <button align='right' onClick={()=>clearCart()} className="col-md-3 btn btn-outline-secondary btn-sm">Clear Cart</button>
    
                        <Card.Body >
                            <Card.Title className='lead mytextcolor align-right'>Amout Details</Card.Title>
                            <Table borderless className='mt-5'>
                                    <thead width='100%'>
                                        <tr align='center'>
                                            <th width='5%'>#</th>
                                            <th width='30%'>Product</th>
                                            <th width='20%'>Price Each</th>
                                            <th width='5%'>Qnty</th>
                                            <th width='30%'>Price of All</th>
                                        </tr>
                                    </thead>
                                    {
                                        userCart.map((item, index)=>{
                                          return  <tbody key={index}>
                                                    <tr >
                                                        <td>{index}</td>
                                                        <td>{item.product.name}</td>
                                                        <td align="right">{item.product.price}</td>
                                                        <td align='center'>{item.val}</td>
                                                        
                                                        <td align='right'>{item.val * item.product.price}</td>
                                                    </tr>
                                                </tbody>
                                                
                                        })
                                    }
                                    {
                                        <tbody>
                                            <tr>
                                                <td colSpan='3' align="right">Total Amout</td>
                                                <td colSpan='2' align="right"><b>{cartPrice}</b></td> 
                                            </tr>
                                            <tr><td><br/></td></tr>
                                            <tr>
                                                <td colSpan='2' align="right" valign="middle"><span className="p-2 rounded-top shadow rounded-bottom bg-light font-weight-italic fs-6 text-info border border-info" >Amount: {cartPrice}</span></td>
                                                <td colSpan='3'><button className="btn btn-outline-success " onClick={()=>setShowAddress(true)}>Place Order</button></td>
                                            </tr>
                                        </tbody>
                                    }
                                </Table>  
                            
                        </Card.Body>    
                    </Card>
                    </div> :
                    <>
                        <center><BsCartX className="mytextcolor"  style={{width : '8rem', height: '15rem'}}/></center>
                        <h1 className="fs-1 text-info lead text-center ">your cart is empty.</h1>
                    </>
                }
                
            </div>
            <Modal show={showAddress} onHide={()=>setShowAddress(false)}>
                <Modal.Header className="lead mytextcolor " closeButton>Add Product Details</Modal.Header>
                <Modal.Body>
                <div className=" ">
                                <form onSubmit={takeAddress} autoComplete='true' className="signinform d-flex justify-content-center">
                                    <div className=" w-75 align-middle">
                                        <div className=" mb-1 form-floating ">
                                            <input type="text" className="form-control form-control-sm" name="customer" onChange={(event) => setForm({...form, customer: event.target.value})} id="customer" placeholder="userid"/>
                                            <label htmlFor="customer" >Customer Name</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="tel" className="form-control" name="mobile" onChange={(event) => setForm({...form, mobile: event.target.value})} id="mobile" placeholder="username"/>
                                            <label htmlFor="mobile" >Mobile Number</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="email" className="form-control" name="email" onChange={(event) => setForm({...form, emailId: event.target.value})} id="email" placeholder="emailid"/>
                                            <label htmlFor="email" >Email ID</label>
                                        </div>
                                        <div className=" mb-1 form-floating">
                                            <input type="text" className="form-control" name="drnostrt" onChange={(event) => setForm({...form, drnstrt: event.target.value})} id="drnostrt" placeholder="email id"/>
                                            <label htmlFor="drnostrt" >D.No &amp; Street</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="text" className="form-control" name="city" onChange={(event) => setForm({...form, city: event.target.value})} id="city" placeholder="email"/>
                                            <label htmlFor="city" >City</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="text" className="form-control" name="district" onChange={(event) => setForm({...form, district: event.target.value})} id="dist" placeholder="umobile"/>
                                            <label htmlFor="dist" >District</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="text" className="form-control" name="state" onChange={(event) => setForm({...form, state: event.target.value})} id="state" placeholder="umobile"/>
                                            <label htmlFor="state" >State</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="number" className="form-control" name="pincode" onChange={(event) => setForm({...form, pincode: event.target.value})} id="pincode" placeholder="umobile"/>
                                            <label htmlFor="pincode" >Pincode</label>
                                        </div>
                                        <div className="mt-4 ">
                                            <Button type="reset" variant='outline-info me-3'>Reset</Button>
                                            <Button type="submit" variant='outline-success'  onClick={()=>setShowAddress(false)}>Submit</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                </Modal.Body>
                <Modal.Footer>
                   
                    <Button  variant='outline-secondary' onClick={()=>setShowAddress(false)}>Back</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default Cart;