import React from 'react'
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import utils from '../../utils'

const ProductDetailScreen = props => {



    const id = props.navigation.getParam('id') //We use the getParam method to get the param we named 'id' and passed from ProductsOverviewScreen

    const selectedProduct = useSelector(state => state.products.availableProducts.find(i => i.id === id)) //We create a const selectedProduct, import useSelector from react-redux which automatically has access to state so we drill into state to get products (which is the name we set in App.js for the productsReducer) and then into availableProducts, and then run the find method on it to find the product with the id that matches our const id

    const title = props.navigation.getParam('title') //(We could have just extracted title from selectedProduct but because we want it displayed in our navigation bar on this page and would have had to wait for the component to render before being able to use it in the navigation bar we simply pass it as a seperate param from ProductsOverviewScreen so that our navigation already has access to it.

    const dispatch = useDispatch() //Hooks can only be called from inside the body of a function component, not within JSX that is returned so in order to have access to this hook from react-redux we create a const and set it to the hook, then call the const from within our JSX.

        //console.log(dispatch(cartActions.addToCart(selectedProduct)));

    return (
        <View>
            <ScrollView>
                <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
                <View style={styles.buttonContainer}>
                    <Button color={Colors.primary} title='Add to Cart' onPress={() => dispatch(cartActions.addToCart(selectedProduct))}/>
                </View>
                <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
                <Text style={styles.description}>{selectedProduct.description}</Text>
            </ScrollView>
        </View>
    )
}

ProductDetailScreen.navigationOptions = navData => {

    const title = navData.navigation.getParam('title')

    return {
        headerTitle: utils.shortenTitle(title)
    }
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    buttonContainer: {
        marginVertical: 20,
        alignItems: 'center'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center'
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        margin: 10,
        lineHeight: 28
    }
})

export default ProductDetailScreen
