//The files in your actions/reducers folders are nouns. Your actions are verbs. Each action exports a string which controls the action, and a function of the which returns an object with that string and forwards the arguments passed to it.
import Product from '../../models/product'

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {

    try {
        return async (dispatch, getState) => {
            const userId = getState().auth.userId
            //here you can execute any async code you want!
            const response = await fetch('https://rn-shop-app-e69b1.firebaseio.com/products.json') //the .json you have to add at the end is just a Firebase specific thing, and unlike our addProduct POST request, we don't even need the seconds argument in the fetch (the object with the method, header, and body)

            if (!response.ok) { //In addition to being in a try catch, we can use 'ok' which is a property of the response object which is specific to fetch, and throw an error if 'ok' is not in the 200 status code range. Not necesary, but helps to handle network request errors where the request can't even leave the device.
                throw new Error('Something went wrong') //You could also dive into the response body and throw whatever is there too
            }

            const resData = await response.json()

            const loadedProducts = []

                for (const key in resData) { //The for...in statement iterates over all enumerable properties of an object that are keyed by strings
                    loadedProducts.push(new Product(key, resData[key].ownerId, resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price))
                }

                //console.log(loadedProducts.filter(prod => prod.ownerId === userId))


            dispatch ({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            })
        }
    } catch (err) {
        //could send to custom analytics server, or do anything here
        throw err
    }
}


export const deleteProduct = productId => {

    return async (dispatch, getState) => { //Not only do we get access to the dispatch function with thunk but we also get access to the state with the getState function

        const token = getState().auth.token

        //here you can execute any async code you want!

        const response = await fetch(`https://rn-shop-app-e69b1.firebaseio.com/products/${productId}.json?auth=${token}`, { //the .json you have to add at the end is just a Firebase specific thing
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        })
    }
}

export const addProduct = (title, imageUrl, description, price) => {

    return async (dispatch, getState) => { //Not only do we get access to the dispatch function with thunk but we also get access to the state with the getState function

        const token = getState().auth.token
        const userId = getState().auth.userId

        //here you can execute any async code you want!

        const response = await fetch(`https://rn-shop-app-e69b1.firebaseio.com/products.json?auth=${token}`, { //the .json you have to add at the end is just a Firebase specific thing
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            })
        })

        const resData = await response.json()

        dispatch ({
            type: ADD_PRODUCT,
            title: title,
            imageUrl: imageUrl,
            description: description,
            price: price,
            id: resData.name,
            ownerId: userId
        })
    }
}

export const editProduct = (id, title, imageUrl, description, price) => {

    return async (dispatch, getState) => { //Not only do we get access to the dispatch function with thunk but we also get access to the state with the getState function

        const token = getState().auth.token

        //here you can execute any async code you want!

        const response = await fetch(`https://rn-shop-app-e69b1.firebaseio.com/products/${id}.json?auth=${token}`, { //the .json you have to add at the end is just a Firebase specific thing
            method: 'PATCH', //PUT will fully overwright the resource with the new data, but PATCH will update it in the places where you tell it to update it.
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        })

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        dispatch ({
            type: EDIT_PRODUCT,
            id: id,
            title: title,
            imageUrl: imageUrl,
            description: description,
            price: price
        })
    }
}
