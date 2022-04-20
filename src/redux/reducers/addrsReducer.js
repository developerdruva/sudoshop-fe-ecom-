let custAddress = {
    customer : '',
    mobile : '',
    emailId : '',
    drnstrt : '',
    city : '',
    district : '',
    state : '',
    pincode : ''
}

const addrsReducer = (state = custAddress, action) => {
    switch (action.type){
        case "Cust_Addrs":
            if(localStorage.getItem('token')){
                return {
                    customer : action.payload.customer,
                    mobile : action.payload.mobile,
                    emailId : action.payload.emailId,
                    drnstrt : action.payload.drnstrt,
                    city : action.payload.city,
                    district : action.payload.district,
                    state : action.payload.state,
                    pincode : action.payload.pincode
                }
            }
            break;
        default :
            return state
    }
}

export default addrsReducer;