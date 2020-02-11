//The value you store in these consts is typically the same name as the const itself
export const ADD_ORDER = 'ADD_ORDER'

//For each of your consts above you need a new const which is a function that returns an action, and when that function is passed to useDispatch with the respective arguements it expects, e.g. cartItems and totalAmount in this first case, it triggers any case in any reducer you have that matches the type.
export const addOrder = (cartItems, totalAmount) => {
    return {
        type: ADD_ORDER,
        orderData: {items: cartItems, amount: totalAmount}
    }
}
