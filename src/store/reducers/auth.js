import { /*SIGNUP, LOGIN,*/ AUTHENTICATE, LOGOUT } from '../actions/auth'

const initialState = {
    token: null,
    userId: null,
    expirationTime: null
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        // case SIGNUP:
        //
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     }
        //
        // case LOGIN:
        //
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     }

        case AUTHENTICATE:

            return {
                token: action.token,
                userId: action.userId
            }

        case LOGOUT:

            return initialState
    }

    return state
}

export default authReducer
