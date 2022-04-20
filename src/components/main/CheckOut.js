import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import { Fragment } from "react/cjs/react.production.min";

const CheckOut = () => {
    const userInfo = useSelector(state=>state.userState);
    const cartItems = useSelector(state=>state.cartItems.cartItems);
    const custAddrs = useSelector(state=>state.custAddrs);
    const cartVals = useSelector(state=>state.cartVals);
    const server_url = global.config.server_url;

    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    const loadScript = (src) => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
         document.body.appendChild(script);
       });
    };
    
    const razorpay = async ()=>{
        let res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            alert('check if you are online or not');
            return
        }
        const options = {
            key: "rzp_test_Jy9ue42qdLUmpl",
            currency: 'INR',
            amount: 100 * cartVals.cartPrice,
            name: "sudoshop learning application",
            description: "learning Test Wallet Transaction",
            image: "icons/shopping-cart.png",
            
            handler: async function (response) {
                if(response.razorpay_payment_id){
                    let cartDelete = await axios.delete(`${server_url}/deleteusercart/${userInfo.userId}`);
                    if(cartDelete.data.deletedCount > 0){
                        console.log(cartDelete);
                        dispatch({type:"Cart_Vals", payload : {size : null}})
                    }else{
                        console.log(cartDelete);
                    }
                    let date = new Date();
                    // let date = new DateObject();

                    let res = await axios.post(`${server_url}/neworder`, {
                        orderId : uuid(),
                        date : date.toLocaleDateString('en-in', {day:"2-digit", month:"2-digit",year:"numeric"}),
                        userId : userInfo.userId,
                        emailId : custAddrs.emailId,
                        paymentId : response.razorpay_payment_id,
                        details : {
                            customer : custAddrs.customer,
                            mobile : custAddrs.mobile,
                            address  : `${custAddrs.drnstrt},${custAddrs.city},${custAddrs.district},${custAddrs.state},${custAddrs.pincode}`,
                            amount : parseInt(cartVals.cartPrice),
                            products : cartItems
                        }
                    });
                    console.log(res,'res from new order');
                    if(res.data.status){
                        if(res.data.sms && res.data.mail){
                            navigate('/orderconfirmpage');
                        }else{
                            alert('order taken you will get details shortly.');
                        }
                    }                   
                }else{
                    alert('your order was not placed.')
                }
            },
            prefill: {
              name: userInfo.userName,
              email: custAddrs.emailId,
              contact: custAddrs.mobile,
            },
          };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    return (
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
                    cartItems && cartVals && custAddrs ? 
                    <>
                    <h3 className="fs-4 mytextcolor text-warning lead" style={{fontWeight: ''}}>please don't refresh the page</h3>
                    <div className="row">
                        
                        <Card className='col-md-6 mt-0 me-5' style={{backgroundColor: "", border: '0'}}>
                            
                            <Card.Body >
                                <Card.Title className='lead mytextcolor mb-4'>Your Total Items in Cart : {cartVals.cartSize}
                                    <span className="fs-6 lead mytextcolor"></span>
                                </Card.Title>  
                                <ul>
                                    {
                                        cartItems.map((item, index)=>{
                                            return <li key={index}>{item.product.name} &nbsp;&nbsp;&nbsp;&nbsp; {item.val}</li>
                                        })
                                    }
                                </ul>                          
                                
                                
                            </Card.Body>    
                        </Card>
                        <Card className='col-md-5 mt-2' style={{backgroundColor: "", border: '0'}}>    
                            <Card.Body >
                                <Card.Title className='lead mytextcolor align-right'>Amout Details</Card.Title>
                                <Card.Text>
                                 <span className="lead mytextcolor" style={{fontSize: '14px'}}> Your cart Total price :</span> <span className="text-primary border-bottom" style={{fontSize: '18px'}}> {cartVals.cartPrice}/-</span>
                                </Card.Text>    <br/>
                                <Button onClick={()=>razorpay()} variant='outline-success'>Click to CheckOut</Button>
                            </Card.Body>    
                        </Card>
                        </div>
    
                        <Card className='col-md-6 mt-0 me-5' style={{backgroundColor: "", border: '0'}}>
                            
                            <Card.Body >
                                <Card.Title className='lead mytextcolor mb-4 b-1 font-weight-bold'>Shipping Address : <br/>
                                    <span className=" lead mytextcolor" style={{fontSize: '12px'}}>please check and verify address before checkout</span>
        
                                </Card.Title>  
                                <table>
                                    {
                                        <tbody className="mytextcolor">
                                            <tr>
                                                <td>{custAddrs.customer},</td>
                                            </tr>
                                            <tr>
                                                <td>{custAddrs.drnstrt},</td>
                                            </tr>
                                            <tr>
                                                <td>{custAddrs.city}, {custAddrs.district},</td>
                                            </tr>
                                            <tr>
                                                <td>{custAddrs.state}, {custAddrs.pincode},</td>
                                            </tr>
                                            <tr>
                                                <td>{custAddrs.mobile}</td>
                                            </tr>
                                        </tbody>
                                    }
                                    
                                </table>
                                                        
                                
                                
                            </Card.Body>    
                        </Card>
                    </>:
                    <p className="fs-4 mytextcolor text-warning lead">please go back to Cart and proceed again.</p>
                }

            </div>

                
        </Fragment>
    )
}
export default CheckOut;