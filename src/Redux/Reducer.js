const initialState = { isLogged: false };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_IS_LOGGED":
            return {...state, isLogged: action.payload};
        default:
            return state;
    }
}