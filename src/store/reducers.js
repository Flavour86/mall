import { combineReducers } from 'redux'
import * as counter from '@/pages/example/redux/reducer'

export default combineReducers({
  ...counter
})
