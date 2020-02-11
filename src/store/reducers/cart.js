import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart' //DON'T FORGET TO IMPORT THE ACTION IDENTIFIERS IN YOUR REDUCER!!!
import { ADD_ORDER } from '../actions/orders'
import CartItem from '../../models/cart-item'
import { DELETE_PRODUCT } from '../actions/products'

const initialState = {
    items: {}, //We could use an array for items in the cart but let's do it with an object
    totalAmount: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:

            const productPrice = action.product.price
            const productTitle = action.product.title

            let updatedOrNewCartItem

            if (state.items[action.product.id]) { //if items[action.product.id] is truish we already have this item in the cart
                updatedOrNewCartItem = new CartItem(
                    state.items[action.product.id].quantity + 1,
                    productPrice,
                    productTitle,
                    state.items[action.product.id].sum + productPrice
                )
            } else {
                updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice)
            }
            return {
                ...state,
                items: {...state.items, [action.product.id]: updatedOrNewCartItem}, //This [action.product.id] syntax is vanilla JavaScript. This is how you access a property dynamically without hardcoding it as a string.
                totalAmount: state.totalAmount + productPrice
            }

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pid]
            let updatedCartItems

            if (selectedCartItem.quantity > 1) {
                const updatedCartItem = new CartItem(selectedCartItem.quantity - 1, selectedCartItem.productPrice, selectedCartItem.productTitle, selectedCartItem.sum - selectedCartItem.productPrice)
                updatedCartItems = {...state.items, [action.pid]: updatedCartItem}

            } else {
                updatedCartItems = {...state.items}
                delete updatedCartItems[action.pid]
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }

        case ADD_ORDER: //ADD_ORDER is also used in the ordersReducer, of course, but we need it to do two things: 1) We need it to add the order to the OrdersScreen and 2) We need it to clear the cart, so we do that here by simply returning the initialState of the cartReducer
            return initialState

        case DELETE_PRODUCT:
        if (!state.items[action.pid]) { //If the item being deleted does not exit in the cart just return state
            return state
        }
        const updatedItems = {...state.items}
        const itemTotal = state.items[action.pid].sum
        delete updatedItems[action.pid] //The delete operator removes a property from an object https://www.w3schools.com/howto/howto_js_remove_property_object.asp

            return {
                ...state,
                
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
    }
    return state
}

export default cartReducer
