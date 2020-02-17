import React from 'react'
import { FlatList, StyleSheet, Button, View, Text, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'

import * as productsActions from '../../store/actions/products' //This * import syntax merges all exports into one object

import Colors from '../../constants/Colors'

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.userProducts)

    const dispatch = useDispatch()

    const deleteHandler = (id) => {
        Alert.alert(
          'Wait...',
          'Are you sure you want to delete this item?',
          [
            {
              text: 'Cancel',
              style: 'destructive',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', style: 'destructive', onPress: () => dispatch(productsActions.deleteProduct(id)) }
          ],
          {cancelable: false},
        )
    }

    if (userProducts.length === 0) { //This has to be here otherwise FlatList will give you the error: Each child in a list should have a unique "key" prop.
        return (
            <View style={styles.centeredInScreen}>
                <Text>No products found, maybe start creating some.</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => props.navigation.navigate('EditProduct', {id: itemData.item.id})}
                >
                    <View style={styles.buttonsContainer}>
                        <Button title='Edit' color={Colors.primary} onPress={() => props.navigation.navigate('EditProduct', {id: itemData.item.id})}/>
                        <Button title='Delete' color={Colors.primary} onPress={() => deleteHandler(itemData.item.id)}/>
                    </View>
                </ProductItem>
            }
        />
    )
}

UserProductsScreen.navigationOptions = navData => {
    return (
        {
            headerTitle: 'Your Products',
            headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Cart' iconName='md-menu' onPress={() => navData.navigation.toggleDrawer()}/>
            </HeaderButtons>,
            headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Cart' iconName='md-create' onPress={() => navData.navigation.navigate('EditProduct')}/>
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
    },
    centeredInScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default UserProductsScreen
