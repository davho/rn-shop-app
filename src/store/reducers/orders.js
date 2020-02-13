import { ADD_ORDER, SET_ORDERS } from '../actions/orders' //DON'T FORGET TO IMPORT THE ACTION IDENTIFIERS IN YOUR REDUCER!!!
import Order from '../../models/order'

const initialState = {
    orders: []
}

export default ordersReducer = (state = initialState, action) => {
    let newOrder
    switch (action.type) {
        case ADD_ORDER:
            newOrder = new Order(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.dates
            )

            //The cart is empty in this case so we dont' need to copy state with { ...state } but I'm doing it anyway to demo good practice
            return { ...state, orders: state.orders.concat(newOrder) } //concat is an array method that adds a new item to an array and returns a new array

        case SET_ORDERS:
            return {
                orders: action.orders
            }
    }
    return state

}
