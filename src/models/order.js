import moment from 'moment' //This is to parse dates for Android because Android deals with the JavaScript date object differently than iOS. Note, Maximilian uses " import * as moment from 'moment' " but as of November 2019 that is depricated and " import moment from 'moment' " is the prefered way

class Order {
    constructor(id, items, totalAmount, date) {
        this.id = id
        this.items = items
        this.totalAmount = totalAmount
        this.date = date
    }
    get readableDate() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm')
    }
}

export default Order
