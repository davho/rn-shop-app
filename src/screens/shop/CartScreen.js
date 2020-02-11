import React from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'

import CartItem from '../../components/shop/CartItem'

import Colors from '../../constants/Colors'

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state => { //We're just converting obejct to array in this below functio, because that makes it easier to use in the FlatList and also allows us to check if length === 0 which we need to know in order to display our 'Order Now' button or not. And the 'Order Now' button we can set the disabled prop.
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }

        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1) //This works for keeping everything in order based on the productId but the way I would've done this would've been to add a ms timestamp, using new Date().getTime(), to each of the objects upon being added to the cart and then sorted the based on that timestamp when it came time to view this CartScreen.js. That way everything would've been more like how an actual online store cart works.
    })

    const dispatch = useDispatch()

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.abs(cartTotalAmount).toFixed(2)}</Text>
                </Text>
                <Button
                    color={Colors.accent}
                    title='Order Now'
                    disabled={cartItems.length === 0}
                    onPress={() => dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))}/>
            </View>
            <View>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.productId}
                    renderItem={itemData =>
                        <CartItem
                            quantity={itemData.item.quantity}
                            title={itemData.item.productTitle}
                            amount={itemData.item.sum}
                            deletable
                            onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}/> }
                        />
            </View>
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: .26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
})

export default CartScreen
