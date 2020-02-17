//Chances are you won't even see this screen but this is what we'll show the user while the app is booting up.

import React, { useEffect } from 'react'
import { View, ActivityIndicator, AsyncStorage, StyleSheet} from 'react-native'

import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import * as authActions from '../store/actions/auth'

const StartupScreen = props => {

    const dispatch = useDispatch()

        useEffect(() => {

            const tryLogin = async () => {

                const userData = await AsyncStorage.getItem('userData')

                if (!userData) {
                    console.log('no userData');
                    props.navigation.navigate('Auth')
                    return
                }

                const transformedData = JSON.parse(userData)
                const { token, userId, expirationDate } = transformedData
                const expDate = new Date(expirationDate)

                if (expDate <= new Date() || !token || !userId) {
                    props.navigation.navigate('Auth')
                    return
                }

                const expirationTime = expirationDate.getTime() - new Date().getTime()

                props.navigation.navigate('Shop')

                dispatch(authActions.authenticate(userId, token, expirationTime))
            }

            tryLogin()

        }, [dispatch])

    return (
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen
