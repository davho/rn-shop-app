import React from 'react'
import Platform from 'react-native'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../constants/Colors'

const CustomHeaderButton = props => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={Platform.OS === 'android' ? 'rgb(255,255,255)' : Colors.primary}/>
}

export default CustomHeaderButton
