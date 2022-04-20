// import { Navbar } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppRoutes } from "./App.Routes";
import Navbar from "./components/main/Navbar";
import "./components/style.css";
// import "./components/css/orders.css";

// export const UserContext = createContext();

function App(props) {
  // useDispatch({type:"APP_URL", payload: "http://localhost:8989"});
  const dispatch = useDispatch();
  useEffect(()=>{
    console.log('token', localStorage.getItem('token'))
    if(localStorage.getItem('token')){
      dispatch({type:'AUTH', payload: true})
    }else{
      dispatch({type:'AUTH', payload: false});
    }
  },[])
  return (
    <div className="">
      <Navbar/>
      <AppRoutes/>
    </div>
  );
}

export default App;
