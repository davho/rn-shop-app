import { ADD_ORDER } from '../actions/orders' //DON'T FORGET TO IMPORT THE ACTION IDENTIFIERS IN YOUR REDUCER!!!
import Order from '../../models/order'

const initialState = {
    orders: []
}

export default ordersReducer = (state = initialState, action) => {
    let newOrder
    switch (action.type) {
        case ADD_ORDER:
            newOrder = new Order(new Date().getTime().toString(), action.orderData.items, action.orderData.amount, new Date())

            //The cart is empty in this case so we dont' need to copy state with { ...state } but I'm doing it anyway to demo good practice
            return { ...state, orders: state.orders.concat(newOrder) } //concat is an array method that adds a new item to an array and returns a new array
    }
    return state

}
