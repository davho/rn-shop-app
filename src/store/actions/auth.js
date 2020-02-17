import { AsyncStorage } from 'react-native'

// export const SIGNUP = 'SIGNUP'
// export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

let timer

export const authenticate = (userId, token, expirationTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expirationTime))
        dispatch({
            type: AUTHENTICATE,
            userId: userId,
            token: token
        })
    }
}

export const signUpOrLogin = (type, email, password) => {

    return async dispatch => {

        const apiKey = 'AIzaSyDx3LWOo6Z2ftFGj72dhfcPRa4YO4Y4Sg4'

        const typeUrlString = type ? 'signUp?key=' : 'signInWithPassword?key='

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${typeUrlString}${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!response.ok) {
            const resData = await response.json() //which is exactly what we do below, setting a const called resData to the resolution of the response promise with .json() method run on it, but in the case of the response not being ok we get an error key set to an array called erros which has only one element in it and has a key called message with a unique message from the server which details our error. So we let our customErrorMessage equal something generic like 'Something went wrong :(' and then drill into resData.error.errors[0].message to get the error message from the server and see if we can set customErrorMessage to something more specific. I wrote these if statements by intentionally trying to mess up the login or signup.
            let customErrorMessage = 'Something went wrong :('

            let serverErrorMessage = (resData.error.errors[0].message)

            if (serverErrorMessage === 'EMAIL_NOT_FOUND') {
                customErrorMessage = 'We can\'t find that email'
            }
            if (serverErrorMessage === 'INVALID_EMAIL') {
                customErrorMessage = 'The email you entered is invalid'
            }
            if (serverErrorMessage === 'INVALID_PASSWORD') {
                customErrorMessage = 'The password you entered is invalid'
            }
            if (serverErrorMessage === 'MISSING_PASSWORD') {
                customErrorMessage = 'Don\'t forget to enter your password'
            }
            if (serverErrorMessage === 'USER_DISABLED') {
                customErrorMessage = 'Your account has been disabled'
            }
            if (serverErrorMessage === 'WEAK_PASSWORD : Password should be at least 6 characters') {
                customErrorMessage = 'Password should be at least 6 characters'
            }

            console.log(serverErrorMessage) //console.logging this to see what the server says to make sure I provided for all the different errors we could get

            throw new Error(customErrorMessage)

        }

        const resData = await response.json()
        //console.log(resData);

        //let typeString =  'AUTHENTICATE' //type ? 'SIGNUP' : 'LOGIN'

        dispatch(
            authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000)
        )
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn * 1000))

        saveDataToStorage(resData.idToken, resData.localId, expirationDate)

    }
}

export const logout = () => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    return {
        type: LOGOUT
    }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }
}

const setLogoutTimer = expirationTime => {
    return dispatch => {

        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }
}

    const saveDataToStorage = (token, userId, expirationDate) => {
        AsyncStorage.setItem('userData', JSON.stringify({
            token: token,
            userId: userId,
            expirationDate: expirationDate.toISOString()
        })
    )
}
