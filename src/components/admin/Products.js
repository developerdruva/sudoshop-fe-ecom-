import { useEffect, useState } from "react"
import {Fragment} from "react/cjs/react.production.min"
import axios from "axios";
import { Button, Modal, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const Products = () => {
    const server_url = global.config.server_url;

    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState({});
    const [editShow, setEditShow] = useState(false);
    const [addProductModal, setAddProductModal] = useState(false);
    const [errorShow, setErrorShow] = useState(false);
    const [errorData, setErrorData] = useState({}) ;
    const [form, setForm] = useState({
        pid : '',
        name : '',
        brand : '',
        price : '',
        imageUrl : ''
    });
    const [editForm, setEditForm] = useState({
        pid : '',
        name : '',
        brand : '',
        price : '',
        imageUrl : ''
    });


    useEffect(()=>{
        getProducts();
    },[]);

    var addProduct = async (event) => {
        event.preventDefault();
        let response = await axios.post(`${server_url}/product`, form);
        console.log(response, "add product response ");
        console.log(response.data.addingError, "add product response ");
        if(response.data.isProductAdded){
            getProducts();
            alert("Product added");
        }
        else{
              setErrorData(response.data.addingError);
              setErrorShow(true);
        }
        
    }

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
    var deleteProduct = async (x) => {
        let response = await axios.delete(`${server_url}/product/${x}`);
        console.log(response);
        if (response.data.isProductDeleted) {
            getProducts();
        }
        else{
            alert("product not deleted.");
        }
    }
    let editProductFunc = async (event) => {
        event.preventDefault();
        console.log(editForm,'edit formmmmmmm......................');
        let response = await axios.put(`${server_url}/editproduct`, editForm);
        console.log(response, 'edit product ressponse');
        if(response.data.updated){
            getProducts();
        }else{
            alert("no changes found");
        }
    }

    
    return(
        <Fragment>
            <div className="container">
                <div className="">
                    <h3 className='mytextcolor mb-4 mt-4 lead fs-3' >Available Product  
                    <button className="btn btn-outline-success btn-sm " style={{float : 'right'}} onClick={()=>setAddProductModal(true)}>Add Product</button> </h3>
                </div>
            
            <div className="table-responsive">
                <table className="table table-hover table-sm">
                    <thead style={{backgroundColor: '#91eee4', textAlign:'center'}}>
                        <tr style={{lineHeight: '2'}}>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Brand</th>
                            <th>Product Price</th>
                            <th>Product Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign:'center'}}>
                        {
                            products.map((item, index) => {
                                return <tr key={index}>
                                            <td>{item.pid}</td>
                                            <td>{item.name}</td>
                                            <td>{item.brand}</td>
                                            <td style={{ textAlign:'right'}}>{item.price}/-</td>
                                            <td><img src={item.imageUrl} alt="product url" style={{width: '2rem', height: '2rem'}}/></td>
                                            <td >
                                                <div className="btn-toolbar d-flex justify-content-center">
                                                    <div className="btn-group mr-2">
                                                        <button className="btn btn-outline-info btn-sm me-1" onClick={()=> {setEditShow(true); setEditProduct(item)}} >Edit</button>
                                                    </div>
                                                    <div className="btn-group ">
                                                        <button className="btn btn-outline-danger btn-sm" onClick={()=>deleteProduct(item.pid)}>Delete</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                            })
                        }
                        
                    </tbody>
                   
                </table>

                
            </div>
            </div>
            <Modal show={addProductModal} onHide={()=>setAddProductModal(false)}>
                <Modal.Header className="lead mytextcolor " closeButton>Add Product Details</Modal.Header>
                <Modal.Body>
                <div className=" ">
                                <form onSubmit={addProduct} className="signinform d-flex justify-content-center">
                                    <div className=" w-75 align-middle">
                                        <div className=" mb-1 form-floating ">
                                            <input type="text" className="form-control form-control-sm" name="pid" onChange={(event) => setForm({...form, pid: event.target.value})} id="userid" placeholder="userid"/>
                                            <label htmlFor="userid" >product id</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="text" className="form-control" name="name" onChange={(event) => setForm({...form, name: event.target.value})} id="name" placeholder="username"/>
                                            <label htmlFor="username" >product name</label>
                                        </div>
                                        <div className=" mb-1 form-floating">
                                            <input type="text" className="form-control" name="brand" onChange={(event) => setForm({...form, brand: event.target.value})} id="passwordField" placeholder="email id"/>
                                            <label htmlFor="passwordField" >product brand</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="number" className="form-control" name="price" onChange={(event) => setForm({...form, price: event.target.value})} id="email" placeholder="email"/>
                                            <label htmlFor="email" >product price</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="url" className="form-control" name="imageUrl" onChange={(event) => setForm({...form, imageUrl: event.target.value})} id="umobile" placeholder="umobile"/>
                                            <label htmlFor="umobile" >product image</label>
                                        </div>
                                        <div className="mt-4 ">
                                            <Button type="reset" variant='outline-info me-3'>Reset</Button>
                                            <Button type="submit" variant='outline-success'  onClick={()=>setAddProductModal(false)}>Submit</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                </Modal.Body>
                <Modal.Footer>
                   
                    <Button  variant='outline-secondary' onClick={()=>setAddProductModal(false)}>Back</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={editShow} onHide={()=>setEditShow(false)}>
                <Modal.Header className="lead mytextcolor " closeButton>Add Product Details</Modal.Header>
                <Modal.Body>
                    <div className="">
                    <form className="signinform d-flex justify-content-center" onSubmit={editProductFunc}>
                                    <div className=" w-75 align-middle">
                                        <div className=" mb-1 form-floating ">
                                            <input type="text" className="form-control form-control-sm" name="pid" defaultValue={editProduct.pid}
                                             
                                             onChange={(event) => setEditForm({...editForm, pid: event.target.value})} id="pid" placeholder="pid"/>
                                            <label htmlFor="pid" >product id</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="text" className="form-control" name="name" defaultValue={editProduct.name}
                                             onChange={(event) => setEditForm({...editForm, name: event.target.value})} id="name"  placeholder="name"/>
                                            <label htmlFor="name" >product name</label>
                                        </div>
                                        <div className=" mb-1 form-floating">
                                            <input type="text" className="form-control" name="brand" defaultValue={editProduct.brand}
                                             onChange={(event) => setEditForm({...editForm, brand: event.target.value})} id="brand" placeholder=" brand" />
                                            <label htmlFor="brand" >product brand</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="number" className="form-control" name="price" defaultValue={editProduct.price}
                                             onChange={(event) => setEditForm({...editForm, price: event.target.value})} id="price" placeholder="price"/>
                                            <label htmlFor="price" >product price</label>
                                        </div>
                                        <div className=" mb-1 form-floating ">
                                            <input type="url" className="form-control" name="imageUrl" defaultValue={editProduct.imageUrl}
                                             onChange={(event) => setEditForm({...editForm, imageUrl: event.target.value})} id="imageUrl" placeholder="imageUrl"/>
                                            <label htmlFor="imageUrl" >product image</label>
                                        </div>
                                        <div className="mt-4 ">
                                            <Button type="reset" variant='outline-info me-3' >Reset</Button>
                                            <Button type="submit" variant='outline-success' onClick={()=>setEditShow(false)}>Update</Button>
                                        </div>
                                    </div>
                                </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                   
                    <Button  variant='outline-secondary' onClick={()=>setEditShow(false)}>Back</Button>
                </Modal.Footer>
            </Modal>

            <Alert variant="danger" show={errorShow} onClose={() => setErrorShow(false)} dismissible>
                <Alert.Heading>Error Found with {errorData.name}</Alert.Heading>
                <p>
                    this might happen with duplicate entry. the field is already existed
                </p>
            </Alert>
        </Fragment>
    )
}

export default Products;