//The files in your actions/reducers folders are nouns. Your actions are verbs. Each action exports a string which controls the action, and a function of the which returns an object with that string and forwards the arguments passed to it.
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'


export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, pid: productId }
}

export const addProduct = (title, imageUrl, description, price) => {
    return { type: ADD_PRODUCT, title: title, imageUrl: imageUrl, description: description, price: price }
}

export const editProduct = (id, title, imageUrl, description, price) => {
    return { type: EDIT_PRODUCT, id: id, title: title, imageUrl: imageUrl, description: description, price: price }
}
