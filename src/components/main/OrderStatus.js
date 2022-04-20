import { NavLink } from 'react-router-dom';
import { Fragment } from "react/cjs/react.production.min";

export default function OrderStatus(){
    return (
        <Fragment>
            <div className="container text-center">
                <div className="mt-5">
                    <h1 className="text-success display-1 bg-light">your order placed successfully</h1>
                    
                    <div className='mt-5'>
                        <h2 className="text-info lead fs-2">click here to navigate to your <NavLink to='/yourorders' className="mybtnhover">orders page</NavLink></h2>    
                        <p className='text-secondary lead'>you will also get order details on given email id &amp; mobile number.</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}