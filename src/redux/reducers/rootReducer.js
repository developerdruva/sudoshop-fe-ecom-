import { combineReducers } from "redux";
import addrsReducer from "./addrsReducer";
import authReducer from "./authReducer";
import cartItemsReducer from "./cartItemsReducer";
import cartValsReducer from "./cartValsReducer";
import counterReducer from "./counterReducer";
import loginReducer from "./loginReducer";
import ordersReducer from "./ordersReducer";
import urlReducer from "./urlReducer";

const rootReducer = combineReducers({
    ctr : counterReducer,
    userState : loginReducer,
    custAddrs : addrsReducer,
    cartVals : cartValsReducer,
    cartItems : cartItemsReducer,
    orderState : ordersReducer,
    server_url : urlReducer,
    isLogged : authReducer
});

export default rootReducer;