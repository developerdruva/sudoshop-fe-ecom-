let url = "";

const urlReducer = (state = url, action) =>{
    switch (action.type){
        case 'APP_URL' :
            return action.payload;
        default:
            return state
    }
} 

export default urlReducer;