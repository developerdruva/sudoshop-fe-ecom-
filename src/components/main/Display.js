import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';

const Display = () => {
    const [products, setProducts] = useState([]);
    const [viewModal, setViewModal] = useState(false);
    const [viewData, setViewData] = useState({});
    const [cartClick, setCartClick] = useState(false);
    const [buyClick, setBuyClick] = useState(false);
    const server_url = global.config.server_url;

    const navigate = useNavigate();

    useEffect(()=>{
        getProducts();
        setCartClick(false);
    },[cartClick,]);
    
    
    const getProducts = async () => {
        let response = await axios.get(`${server_url}/products`);
        if(response instanceof Error){
        }
        else{
            setProducts(response.data)
        }
    }
    const checkToken = () => {
        if(localStorage.getItem('token')){
            
        }else{
            setBuyClick(true);
        }
    }

    return (
        <Fragment>

            <section className="container ">  

            <Carousel variant='dark' className='mt-3'>
                <Carousel.Item>
                    <img className="" src="images/slide1_laps.jpg" style={{width:"100%", height: '25rem'}} alt="First slide"/>
                    <Carousel.Caption style={{top: '0'}}>
                        <h1 className='mytextcolor display-4 mb-0'>Welcome to sudoshop</h1>
                        <p>Make your online shopping more eairer and convenient way.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="" src="images/slide2_payment.jpg" style={{width:"100%", height: '25rem'}} alt="Second slide"/>
                    <Carousel.Caption >
                        <h3 className='mytextcolor display-4 mb-0'>Payments makes Easy</h3>
                        <p>Login and make your payment as secured with any mode of payment</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className="" src="images/slide3_access.jpg" style={{width:"100%", height: '25rem'}} alt="Third slide"/>
                    <Carousel.Caption style={{top: '0'}}>
                        <h3 className='mytextcolor display-4 mb-0'>Access from anywhere!</h3>
                        <p>You can access your this web site in any other devices like shown.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                </Carousel>   

                <div className='jubotron text-center rounded'>
                                        
                    <h3 className="mytextcolor mb-3 mt-2 fs-2 lead ">Available Products</h3>
                </div>

                <div className=" mt-3 text-center">
                    
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
                                    <Button variant='outline-success' onClick={()=>checkToken()}>Buy</Button>
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
                            <td width='50%' align='center'><img  src={viewData.imageUrl} alt='product url' style={{width:'10rem', height:'20rem'}} /></td>
                            <td width='50%' valign='middle'>the product brand is :<br/> &nbsp;&nbsp; {viewData.brand}<br/>
                                price is :<br/>&nbsp;&nbsp; {viewData.price}</td>
                        </tr>
                    </tbody>
                </table>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={()=>setViewModal(false)}>Close</Button>
                    <Button variant="outline-success" onClick={()=>checkToken()} >Buy</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={buyClick} onHide={()=>setBuyClick(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-warning lead border-bottom border-warning'>Authentication Required</Modal.Title>
                </Modal.Header>

                <Card className='col-md-12' style={{backgroundColor: "", border: '0', height:'10rem'}}>
                    <Card.Body>
                        <Card.Title className='lead mytextcolor'></Card.Title>
                        <Card.Text className='mb-5'>
                        <span className='lead mytextcolor'>please login or register to continue shopping</span>
                            
                        </Card.Text>    
                        <Button variant="outline-info me-3" onClick={()=>navigate('/login')}>Login</Button>
                        <Button variant="outline-info" onClick={()=>navigate('/register')}>Register</Button>
                    </Card.Body>    
                </Card>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={()=>setBuyClick(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
            <footer className='' style={{backgroundColor: 'lightsteelblue'}}>
                <div className='container'>
                    <table width='100%'>
                        <tbody>
                            <tr>
                                <td>This site is a sample onlince e-commerce web site.</td>
                                <td align='right'>Contact: developer.rajeshnuz@gmail.com</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </footer>
        </Fragment>
    )
}

export default Display;