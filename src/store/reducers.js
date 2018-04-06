import { combineReducers } from 'redux'
import * as IndexReducers from '@/pages/index/redux/reducer'
import * as categoryReducers from '@/pages/category/redux/reducer'

export default combineReducers({
  ...IndexReducers,
  ...categoryReducers
})
