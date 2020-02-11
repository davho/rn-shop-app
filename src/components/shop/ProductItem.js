import React from 'react'
import { View, Text, Image, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet } from 'react-native'

import Card from '../UI/Card'

const ProductItem = props => {

    const TouchableThing = Platform.OS === 'android' && Platform.Version >= 21 ? TouchableNativeFeedback : TouchableOpacity //Version 21 is the same as release 5.0 which is Lollipop for Android

    return (
        <Card style={styles.product}>
            <TouchableThing style={styles.touchable} onPress={props.onSelect} useForeground>
                <View>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: props.image}}/>
                    </View>
                    <View style={styles.titleAndPriceContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
                    </View>
                    {props.children}
                </View>
            </TouchableThing>
        </Card>
    )
}

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    imageContainer: {
        overflow: 'hidden',
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    image: {
        width: '100%',
        height: '95%',
    },
    titleAndPriceContainer: {
        alignItems: 'center',
        height: '15%'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
})

export default ProductItem
