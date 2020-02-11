import React from 'react'
import { FlatList, View, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux' //useSelector will allow us to tap into the redux store and get our products there, and useDispatch will allow us to dispatch an action to the reducer
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import HeaderButton from '../../components/UI/HeaderButton'
import * as cartActions from '../../store/actions/cart' //This * import syntax merges all exports into one object

import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts) //useSelector takes a function which automatically receives the redux state as an input and returns whatever you want to get from there using the combineReducers keys you set up in App.js. In this case we set products as the key for all the state in the productsReducer, and we want to pull the availableProducts from the state object we set up in products.js from that.

    const dispatch = useDispatch() //Hooks can only be called from inside the body of a function component, not within JSX that is returned so in order to have access to this hook from react-redux we create a const and set it to the hook, then call the const from within our JSX.

    return (
        <FlatList

            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>

                    <ProductItem
                        image={itemData.item.imageUrl}
                        title={itemData.item.title}
                        price={itemData.item.price}
                        onSelect={() => {
                            props.navigation.navigate('ProductDetail', {
                                id: itemData.item.id,
                                title: itemData.item.title
                            })
                        }}>

                        <View style={styles.buttonsContainer}>
                            <Button title='View Details' color={Colors.primary} onPress={() => {
                                props.navigation.navigate('ProductDetail', {
                                    id: itemData.item.id,
                                    title: itemData.item.title
                                })
                            }}/>
                            <Button title='Add To Cart' color={Colors.primary} onPress={() => dispatch(cartActions.addToCart(itemData.item))}/>
                        </View>

                    </ProductItem>

                }
            />
    )
}

//Below are the screen navigation options which will automatically merge with the defaultNavigationOptions we set up directly in our navigation/ShopNavigator.js.
ProductsOverviewScreen.navigationOptions = navData => {
    return (
        {
            headerTitle: 'All Products',
            headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Cart' iconName='md-menu' onPress={() => navData.navigation.toggleDrawer()}/>
            </HeaderButtons>,
            headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Cart' iconName='md-cart' onPress={() => navData.navigation.navigate('Cart')}/>
            </HeaderButtons>
        }
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
})

export default ProductsOverviewScreen
