import React, { useState, useEffect } from 'react'
import { TextInput, ScrollView, View, Button, KeyboardAvoidingView, ActivityIndicator, Alert, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import { useDispatch } from 'react-redux'

import * as authActions from '../../store/actions/auth'

import Card from '../../components/UI/Card'

import Colors from '../../constants/Colors'

const AuthScreen = props => {

    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const dispatch = useDispatch()

    const signUpOrLogin = async (type, email, password) => { //The only reason for making this function async is so we can setIsLoading for the loading spinner to true, dispatch the action, then wait for the promise to resolve in the action, then set the loading spinner to false and navigate to 'Shop'. Otherwise we could just make signUpOrLogin a regular function and dispatch(authActions.signUpOrLogin(type, email, password)) without the await, and even throw props.navigation.navigate('Shop') as the second function in the onPress of the button. We're only doing this to create a better user experience. We also don't need to wrap await dispatch(authActions.signUpOrLogin(type, email, password)) in a try/catch block but we're doing it so that we can handle any errors, also for a better user experience.
        setIsLoading(true)

        try {
            await dispatch(authActions.signUpOrLogin(type, email, password))
            props.navigation.navigate('Shop')
        } catch (error){
            Alert.alert('An error occurred!', error.message, {text: 'OK'})
            setIsLoading(false)
        }
    }

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={60} behavior='padding' style={styles.keyboardAvoidingView}>
            <LinearGradient style={styles.linearGradient} colors={['rgb(0,30,100)', 'white', 'rgb(0,30,100)']}>
                <Card style={styles.card}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <TextInput
                            placeholder='email'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            minLength={4}
                            errorMessage='Please enter a valid email address'
                            autoCapitalize='none'
                            onChangeText={text => setEmail(text)}
                            value={email}
                            style={styles.textInput}/>
                        <TextInput label='password'
                            placeholder='password'
                            keyboardType='default'
                            secureTextEntry={true}
                            textContentType='password'
                            minLength={8}
                            errorMessage='Please enter a valid password'
                            autoCapitalize='none'
                            onChangeText={text => setPassword(text)}
                            value={password}
                            style={styles.textInput}/>
                        <View style={styles.buttonContainer}>
                            { isLoading ? <ActivityIndicator size='small' color={Colors.primary}/> : <Button title={isSignUp === true ? 'Sign Up' : 'Sign In'} color={Colors.primary} onPress={() => signUpOrLogin(isSignUp, email, password)}/> }
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title={isSignUp ? 'Switch to Sign In' : 'Switch to Sign Up'} color={Colors.accent} onPress={() => setIsSignUp(!isSignUp)}/>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '80%',
        maxWidth: 400,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        justifyContent: 'center',
        height: '100%'
    },
    textInput: {
        width: 200,
        textAlign: 'center',
        padding: 5,
        borderColor: '#ccc',
        borderRadius: 5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        margin: 5
    },
    buttonContainer: {
        marginTop: 10
    }
})

export default AuthScreen
