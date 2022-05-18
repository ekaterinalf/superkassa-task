import {applyMiddleware,  createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const defaultState = []

export default function numberReducer(state = defaultState, action) {
  switch(action.type) {
    case 'UPD_CONTACTS':
      return [...action.payload]
    default:
      return state
  }
}

export const store = createStore(numberReducer, composeWithDevTools(applyMiddleware(thunk)))
