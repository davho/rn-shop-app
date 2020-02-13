import Order from '../../models/order'

//The value you store in these consts is typically the same name as the const itself
export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

//For each of your consts above you need a new const which is a function that returns an action, and when that function is passed to useDispatch with the respective arguements it expects, e.g. cartItems and totalAmount in this first case, it triggers any case in any reducer you have that matches the type. In the case of thunk, the return statement is first wrapped in an async function receiving the dispatch function (the thunk dispatch, not the react-redux dispatch) that makes an HTTP request with the date first thereby updating the server first, and then uses the dispatch function to return locally via redux.

export const fetchOrders = () => {

    return async dispatch => {

    const response = await fetch('https://rn-shop-app-e69b1.firebaseio.com/orders/u1.json') //the .json you have to add at the end is just a Firebase specific thing, and unlike our addProduct POST request, we don't even need the seconds argument in the fetch (the object with the method, header, and body)

    if (!response.ok) { //In addition to being in a try catch, we can use 'ok' which is a property of the response object which is specific to fetch, and throw an error if 'ok' is not in the 200 status code range. Not necesary, but helps to handle network request errors where the request can't even leave the device.
        throw new Error('Something went wrong') //You could also dive into the response body and throw whatever is there too
    }

    const resData = await response.json()

    const loadedOrders = []

        for (const key in resData) { //The for...in statement iterates over all enumerable properties of an object that are keyed by strings
            loadedOrders.push(new Order(key, resData[key].cartItems, resData[key].totalAmount, new Date(resData[key].date))) //we have to do this to resData[key].date in order to get a date object and not a date string
        }

        dispatch({type: SET_ORDERS, orders: loadedOrders})
    }
}


export const addOrder = (cartItems, totalAmount) => {

    const date = new Date()

    //Return statement before integrating thunk's dispatch method:

    // return {
    //     type: ADD_ORDER,
    //     orderData: {items: cartItems, amount: totalAmount}
    // }

    return async dispatch => {
        //Now put any async code you want in here

        const response = await fetch('https://rn-shop-app-e69b1.firebaseio.com/orders/u1.json', { // (the .json you have to add at the end is just a Firebase specific thing) and we're hard coding the u1 user for now
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString() //You could also have this timestamp added on the server but we'll just do it here for demonstration
            })
        })

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        const resData = await response.json()

        dispatch({
            type: ADD_ORDER,
            orderData: {id: resData.name, items: cartItems, amount: totalAmount, date: date}
        })
    }
}
