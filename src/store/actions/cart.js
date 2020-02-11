//The value you store in these consts is typically the same name as the const itself
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'


//For each of your consts above you need a new const which is a function that returns an action, and when that function is passed to useDispatch with the respective arguements it expects, e.g. product in this first case, it triggers any case in any reducer you have that matches the type.
export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        product: product
    }
}

export const removeFromCart = productId => {
    return {
        type: REMOVE_FROM_CART,
        pid: productId
    }
}
