import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, TextInput, StyleSheet, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../../components/UI/HeaderButton'

import * as productsActions from '../../store/actions/products'

const EditProductScreen = props => {

    const product = useSelector(state => state.products.userProducts.find(i => i.id == props.navigation.getParam('id'))) //Get all the products from redux and find the one that matches the id passed from the nav so we have access to the rest of its properties and can pre-populate the TextInput fields. If no id was passed from the nav (i.e. we came from createing a new product as opposed to editing an existing one) our ternaries pre-populate our text fields with an empty string.

    const [title, setTitle] = useState(props.navigation.getParam('id') ? product.title : '')
    const [imageUrl, setImageUrl] = useState(props.navigation.getParam('id') ? product.imageUrl : '')
    const [price, setPrice] = useState(props.navigation.getParam('id') ? product.price.toString() : '')
    const [description, setDescription] = useState(props.navigation.getParam('id') ? product.description : '')

    dispatch = useDispatch()

    const editOrAdd = () => {
        if (product) {
            Alert.alert(
              'Wait...',
              'Are you sure you want to edit this item?',
              [
                {
                  text: 'Cancel',
                  style: 'destructive',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK',
                style: 'destructive',
                onPress: () => {dispatch(productsActions.editProduct(product.id, title, imageUrl, description, +price)); props.navigation.goBack()}}
              ],
              {cancelable: false},
            )
        } else {
            Alert.alert(
              'Wait...',
              'Are you sure you want to add this item?',
              [
                {
                  text: 'Cancel',
                  style: 'destructive',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', style: 'destructive', onPress: () => {dispatch(productsActions.addProduct(title, imageUrl, description, +price)); props.navigation.goBack()}},
              ],
              {cancelable: false},
            )
        }
    }

    //props.navigation.setParams({updateOrCreateProduct: updateOrCreateProduct})

    useEffect(() => { //If we don't wrap the passing of our editOrAdd function in a useEffect that only renders once we'll have an infinite loop
        props.navigation.setParams({editOrAdd: editOrAdd, dispatch: dispatch})
    },[dispatch, product, title, imageUrl, description, price])

    return (

        <ScrollView>

            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)}/>
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)}/>
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput style={styles.input} value={price} onChangeText={text => setPrice(text)}/>
                </View>

                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={text => setDescription(text)}/>
                </View>
            </View>

        </ScrollView>

    )
}

EditProductScreen.navigationOptions = navData => {

    const editOrAdd = navData.navigation.getParam('editOrAdd')

    return (
        {
            headerTitle: navData.navigation.getParam('id') ? 'Edit Product' : 'Add Product',
            headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Save' iconName='md-checkmark' onPress={() => editOrAdd()}/>
            </HeaderButtons>
        }
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})

export default EditProductScreen
