let userState = {
    userId : '',
    userName : '',
    role : '',
    emailId : '',

}

const loginReducer = (state = userState, action) => {
    // console.log(action, " in userlogin reducer");
    
    switch (action.type) {
        case "USER_INFO":
            // console.log("action lo payload", action.payload);
            if(localStorage.getItem('token')){
                return {
                    userId : action.payload.userId,
                    userName : action.payload.userName,
                    role : action.payload.role,
                }
            }
            break
        default:
            return state
    }
}

export default loginReducer;