let cartItems = [];

const cartItemsReducer = (state=cartItems, action) => {
    switch (action.type) {
        case 'Cart_Items':
            if(localStorage.getItem('token')){
                return {
                    cartItems : action.payload
                }
            }
            break
        default:
            return state
    }
}

export default cartItemsReducer;