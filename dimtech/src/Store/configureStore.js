// Store/configureStore.js

import { createStore } from 'redux';
import setUserData from './Reducers/userReducer'

export default createStore(setUserData)
