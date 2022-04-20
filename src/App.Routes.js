import { Route, Routes } from "react-router-dom";
// import { Switch } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import Admin from "./components/admin/Admin";
import Customers from "./components/admin/Customers";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import About from "./components/extras/About";
import Example from "./components/extras/Example";
import Cart from "./components/main/Cart";
import Home from "./components/main/Home";
import NoMatch from "./components/extras/NoMatch";
import ChangePass from "./components/auth/ChangePass";
import ForgotPass from "./components/auth/ForgotPass";
import StateUpdate from "./components/extras/StateUpdate";
import Display from "./components/main/Display";
import CheckOut from "./components/main/CheckOut";
import Razor from "./components/extras/Razor";
import OrderStatus from "./components/main/OrderStatus";
import YourOrders from "./components/main/YourOrders";
import DateObjReact from "./components/extras/DateObjReact";
import { useSelector } from "react-redux";
import { useEffect } from "react";


export const AppRoutes = () => {
   const auth = useSelector(state=>state.isLogged);
   useEffect(()=>{

   },[auth])
   console.log(auth,' auth res')
    // const token =localStorage.getItem('token')
    return (
        <Fragment>
            <Routes>
                {/* common routes */}
                <Route path='/' element={<Display/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/about" element={<About/>}></Route>
                <Route path='/forgotpass' element={<ForgotPass/>}></Route>  

                {/* authorized routes */}
                {   auth &&  <Route path="/changepassword" element={<ChangePass/>}></Route> }
                {   auth &&  <Route path="/cart" element={<Cart/>}></Route> }
                {   auth &&  <Route path="/customers" element={<Customers/>}></Route> }
                {   auth &&  <Route path='/dateobjreact' element={<DateObjReact/>}></Route> }
                {   auth &&  <Route path="/yourorders" element={<YourOrders/>}></Route> }
                {   auth &&  <Route path="/orderconfirmpage" element={<OrderStatus/>}></Route> }
                {   auth &&  <Route path='/razor' element={<Razor/>}></Route> }
                {   auth &&  <Route path='/checkout' element={<CheckOut/>}></Route> }
                {   auth &&  <Route path="/admin" element={<Admin/>}></Route> }
                {   auth &&  <Route path='/home' element={ <Home/> } ></Route> }

            
                {/* {   token &&  <Route path="/changepassword" element={<ChangePass/>}></Route> }
                {   token &&  <Route path="/cart" element={<Cart/>}></Route> }
                {   token &&  <Route path="/customers" element={<Customers/>}></Route> }
                {   token &&  <Route path='/dateobjreact' element={<DateObjReact/>}></Route> }
                {   token &&  <Route path="/yourorders" element={<YourOrders/>}></Route> }
                {   token &&  <Route path="/orderconfirmpage" element={<OrderStatus/>}></Route> }
                {   token &&  <Route path='/razor' element={<Razor/>}></Route> }
                {   token &&  <Route path='/checkout' element={<CheckOut/>}></Route> }
                {   token &&  <Route path="/admin" element={<Admin/>}></Route> }
                {   token ?  <Route path='/home' element={ <Home/> } ></Route> : null } */}

                {/* <Route path="/admin" element={<Admin/>}></Route>
                <Route path='/home' element={ <Home/> } ></Route> */}

                {/* extra routes */}
                <Route path='/example' element={<Example/>}></Route>
                <Route path='/stateupdate' element={<StateUpdate/>}></Route>

                {/* if no route found */}
                <Route path="*" element={<NoMatch/>}></Route>
            </Routes>
            {/* {
                auth ?
                <Routes>
                    <Route path="/changepassword" element={<ChangePass/>}></Route>
                    <Route path="/cart" element={<Cart/>}></Route>
                    <Route path="/customers" element={<Customers/>}></Route>
                    <Route path='/dateobjreact' element={<DateObjReact/>}></Route>
                    <Route path="/yourorders" element={<YourOrders/>}></Route>
                    <Route path="/orderconfirmpage" element={<OrderStatus/>}></Route>
                    <Route path='/razor' element={<Razor/>}></Route>
                    <Route path='/checkout' element={<CheckOut/>}></Route>
                    <Route path="/admin" element={<Admin/>}></Route>
                    <Route path='/home' element={ <Home/> } ></Route>
                </Routes>:
                <Routes>
                    <Route path='/login' element={<Login/>}></Route>
                </Routes>
            } */}
                
        </Fragment>
    )
}

