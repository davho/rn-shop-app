import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import utils from '../../utils'

import Colors from '../../constants/Colors'

const CartItem = props => {

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} </Text>
                <Text style={styles.titleAndAmount}>{utils.shortenTitle(props.title)}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.titleAndAmount}>${props.amount.toFixed(2)}</Text>
                { props.deletable ? <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons
                        name='md-trash'
                        size={23}
                        color='rgb(255,0,0)'/>
                </TouchableOpacity> : null }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'rgb(255,255,255)',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    titleAndAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        margin: 20
    }
})

export default CartItem
