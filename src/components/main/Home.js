/* eslint-disable */
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react/cjs/react.production.min';

function Home(props){
    const [products, setProducts] = useState([]);
    const [viewModal, setViewModal] = useState(false);
    const [viewData, setViewData] = useState({});
    const [userData, setUserData] = useState({});
    const [cartSize, setCartSize] = useState();
    const [cartClick, setCartClick] = useState(false);

    // const userInfo = useSelector(state => state.userState);
    // const cartQnty = useSelector(state => state.cartSize);

    const deToken = jwt_decode(localStorage.getItem('token'));
    
    const dispatch = useDispatch();
    const server_url = global.config.server_url;
    
    useEffect(()=>{
        getProducts();
        getUserDet();
        setCartClick(false);
    },[cartClick,]);
    
    const getUserDet = async () => {
        let response = await axios.get(`${server_url}/getuserdet/${deToken.subject}`);
        if(response.data.status){
            setUserData(response.data.body);
            dispatch({type: 'USER_INFO', payload : response.data.body});
            axios.get(`${server_url}/getusercart/${response.data.body.userId}`).then(res => {
            if(res.data.status !== false){
                const cart = res.data.status.cart;
                let val = 0;
                cart.map((item)=>{
                    val = val + item.val;
                    return val
                })
                setCartSize(val);
                dispatch({type: 'Cart_Vals', payload : {size : val}});
            }
        });
        }else{

        }
    }    
    const getProducts = async () => {
        let response = await axios.get(`${server_url}/products`);
        if(response instanceof Error){
            setProducts([])
        }
        else{
            setProducts(response.data)
        }
    }
    
    const addToCart = async (x) => {
        setCartClick(true);
        const payload = {
            userId : userData.userId,
            cart : {
                pid : x,
                val : 1
            }
        }
        let response = await axios.post(`${server_url}/addcart`, payload);
        // if(response instanceof Error){
        //     console.log(response,'addtocart response ............');
        // }
        // else{
        //     console.log(response.data,'addtocart response ............');
        // }
    }
    return(
        <Fragment>
                

            
            <main role="main">

            <section className="jumbotron ">
                            <div className='container mt-4'>
                                <span className='fs-6 mytextcolor pl-4 text-success p-2 shadow mybtnhover border-bottom rounded border-info' >Welcome, Hi { userData.userName} </span>
                            </div>
                            <div className="container text-center">
                            <h3 className="mytextcolor mb-5 mt-2 display-4">Available Products</h3>
                            <div className="row mt-0 ">
                            {
                                products.map((item, index) => {
                                    return <Card className='col-md-3 m-2 p-3' key={index} style={{backgroundColor: "", border: '0',width: '13rem', height:'inherit'}}>
                                        <Card.Img variant='top '  src={item.imageUrl} style={{ width : '10rem', height: '15rem'}} />
                                        <Card.Body>
                                            <Card.Title className='lead mytextcolor'>{item.name}</Card.Title>
                                            <Card.Text>
                                                <span className='text-center text-primary'>{item.price}/-</span>
                                                
                                            </Card.Text>    
                                            <Button variant='outline-info me-3' onClick={()=>{setViewModal(true); setViewData(item)}}>view</Button>
                                            <Button variant='outline-success' onClick={()=>addToCart(item.pid)} >Buy</Button>
                                        </Card.Body>    
                                    </Card>
                                })
                            }
                            </div>
                        </div>
                    </section>
             <Modal show={viewModal} onHide={()=>setViewModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{viewData.name}</Modal.Title>
                </Modal.Header>
                <table width='100%' style={{padding: '2rem'}}>
                    <tbody>
                        <tr>
                            <td width='50%' align='center'><img  src={viewData.imageUrl} style={{width:'10rem', height:'20rem'}} alt='product url' /></td>
                            <td width='50%' valign='middle'>the product brand is :<br/> &nbsp;&nbsp; {viewData.brand}<br/>
                                price is :<br/>&nbsp;&nbsp; {viewData.price}</td>
                        </tr>
                    </tbody>
                </table>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={()=>setViewModal(false)}>Close</Button>
                    <Button variant="outline-success" >Buy</Button>
                </Modal.Footer>
            </Modal>
            </main>
            <footer className='' style={{backgroundColor: 'lightsteelblue'}}>
                <div className='container'>
                    <span className=''>This site is an onlince e-commerce</span>
                </div>
            </footer>
        </Fragment>
    )
}

export default Home;