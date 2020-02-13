import PRODUCTS from '../../data/dummy-data' //1) Here in the reducers for the products we need to import all the data we have so that we can have it in our initial state before we decide what to do with it in redux
import { DELETE_PRODUCT, ADD_PRODUCT, EDIT_PRODUCT, SET_PRODUCTS } from '../actions/products' //2)We also need to import our action files we use in the switch statements.

import Product from '../../models/product'

const initialState = { //3)Initialize the state object with availableProducts (which should be set to all the PRODUCTS) and userProducts (which should be set to all the PRODUCTS with a userId of u1, so we use the filter method to do that).
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => { //4) Now we create our reducer which is just a function that takes two arguments, state and action, and the state should be set to the initial state.

    switch (action.type) { //7) Write switch statements based on our actions. The first one we imort is DELETE_PRODUCT and make a case with it.
        case DELETE_PRODUCT: //8) If the case is DELETE_PRODUCT we need to remove it from the availableProducts array and the userProducts array because it's deleted in general. So we return a new object with the exisiting state with the spread operator, then overwright the availableProducts key with our logic, in which we remove the product to be deleted be setting userProducts to a version of availableProducts filtered by action.pid, which we have access to from our action variable (which is just an object with a case and the forwarded arguments). So the filter method below will keep all products where the id's do not match hence deleting the product where the id's do match (each product has a unique product id so with this you delete one at a time). Then we run the exact same logic on our userProducts.
            return {
                ...state,

                availableProducts: state.availableProducts.filter(product => product.id !== action.pid),

                userProducts: state.userProducts.filter(product => product.id !== action.pid)
            }

        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }

        case ADD_PRODUCT:

            const newProduct = new Product(
                action.id,
                'u1',
                action.title,
                action.imageUrl,
                action.description,
                action.price)

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.availableProducts.concat(newProduct)
            }

        case EDIT_PRODUCT:
            const productIndex = state.userProducts.findIndex(i => i.id === action.id)

            const updatedProduct = new Product(action.id, state.userProducts[productIndex].ownerId, action.title, action.imageUrl, action.description, action.price)

            const updatedUserProducts = [...state.userProducts] //Copy existing userProducts to create a copy,
            updatedUserProducts[productIndex] = updatedProduct //then set the item in that array of productIndex equal to updatedProduct in the copy

            const updatedAvailableProducts = [...state.availableProducts]
            updatedAvailableProducts[productIndex] = updatedProduct

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }

    }

    return state //5) Return state regardless of what happens in the switch statements.
}

export default productsReducer //6) Export our reducer function. That's it! That's all we need to do to create a reducer. The challenging part is writing the switch statements within our reducer.
