import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from '../../store/actions/orders'

import Colors from '../../constants/Colors'

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)

    const loadingOrders = async () => { //You have to wrap your setIsLoading in a function in order to use the async await syntax
        await dispatch(ordersActions.fetchOrders())
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        loadingOrders()
    }, [dispatch])

    if (isLoading) {
            return (
                <View style={styles.centeredInScreen}>
                    <ActivityIndicator size='large' color={Colors.primary}/>
                </View>
            )
        }

    if (!isLoading && orders.length === 0) {
        return (
            <View style={styles.centeredInScreen}>
                <Text>No orders found. Maybe start adding some.</Text>
            </View>
        )
    }

    return (
        <FlatList
            onRefresh={loadingOrders}
            refreshing={isLoading}
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <OrderItem
                amount={itemData.item.totalAmount}
                date={itemData.item.readableDate}
                items={itemData.item.items}/> }
        />
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart' iconName='md-menu' onPress={() => navData.navigation.toggleDrawer()}/>
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart' iconName='md-cart' onPress={() => navData.navigation.navigate('Cart')}/>
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    centeredInScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen
