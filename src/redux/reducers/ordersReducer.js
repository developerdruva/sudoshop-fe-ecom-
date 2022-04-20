let orderState = [];

const ordersReducer = (state = orderState, action) =>{
    switch (action.type){
        case 'User_Orders' :
            if(localStorage.getItem('token')){
                return action.payload;
            }
            break
        default:
            return state
    }
} 

export default ordersReducer;