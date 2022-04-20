let appState = {
    counter : 10
}

const counterReducer = (state = appState, action) => {
    if(action.type === "INCREMENT"){
        return { 
            counter : state.counter + action.val 
        }
    }
   
    return state
}

export default counterReducer;