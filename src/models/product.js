//The class is simply a blueprint for any product object we want to create and we create each object by passing the expcted arguments into the class' constructor in the expected order.

class Product {
    constructor(id, ownerId, title, imageUrl, description, price) {
        this.id = id
        this.ownerId = ownerId
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }
}

export default Product
