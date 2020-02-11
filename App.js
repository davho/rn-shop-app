//DO: expo install react-navigation react-navigation-drawer react-navigation-tabs react-navigation-stack react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

//DO: npm install --save react-navigation-header-buttons react-navigation-material-bottom-tabs react-native-paper redux react-redux

//DO: npm install --save-dev redux-devtools-extension FOR REDUX DEVTOOLS, FOR WHICH THE IMPORT composeWithDevTools WILL BE REMOVED BEFORE DEPLOYMENT

//DO: npm install --save moment (this is to parse dates for Android because Android deals with the JavaScript date object differently than iOS)

//Note: enableScreens from 'react-native-screens' (it used to be called useScreens) is a package you download when you import react-navigation and the rest and it makes use of the native screen animations for better navigation performance. To use it simply import it into App.js and then call it before your App.js component. THIS MAKE NAVIGATION NOTICEABLY MORE PERFORMANT


import React, {useState} from 'react'

import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { composeWithDevTools } from 'redux-devtools-extension' //THIS IMPORT IS FOR REDUX DEVTOOLS ONLY!!! REMOVE BEFORE DEPLOYMENT!!!

import EntireNavigator from './src/navigation/EntireNavigator'







/* EXPLANATION OF WHAT'S GOING ON WITH REDUX:

1) import { createStore, combineReducers } from 'redux' and { Provider } from 'react-redux'
2) import your reducers so that you can combine them
3) create a const named rootReducer which calls combineReducers (from redux) and pass an object of your reducers to it with respective keynames of your choice
4) create a const named store which calls createStore (from redux)
5) wrap your App's JSX in a Provider (from react-redux) and pass the const named store to it as the store property. Now any component in your app which imports { useSelector } from 'react-redux' has access to your redux store!
*/
import productsReducer from './src/store/reducers/products'
import cartReducer from './src/store/reducers/cart'
import ordersReducer from './src/store/reducers/orders'

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer
})

const store = createStore(rootReducer, composeWithDevTools()) //THE composeWithDevTools() ARGUMENT IS FOR REDUX DEVTOOLS ONLY!!! REMOVE BEFORE DEPLOYMENT!!!







enableScreens()







const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf')
    })
}







const App = () => {

    const [fontLoaded, setFontLoaded] = useState(false)

    if (!fontLoaded) {
        return <AppLoading startAsync={() => fetchFonts()} onFinish={() => setFontLoaded(true)
        }/>
    }

  return (
    <Provider store={store}>
        <EntireNavigator />
    </Provider>
  )
}

export default App