
const initialState = {
    userData: {
        isLogged: false,
        token: null,
        email: null,
    }
}

function setUserData(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_USER':
        nextState = {
            ...state,
            userData: action.value
        }
    return nextState || state
  default:
    return state
  }
}

export default setUserData
