let isLogged = false

const authReducer = (state = isLogged, action)=>{
    switch (action.type){
        case 'AUTH':
            return action.payload
        default:
            return state
    }
}

export default authReducer;