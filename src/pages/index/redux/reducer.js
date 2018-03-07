import { handleActions } from 'redux-actions'
import * as types from './action-types'

export const courseList = handleActions({
  [types.GET_COURSE] (state, action) {
    console.log(action.payload, '222')
    const data = action.payload.data
    return {
      ...state,
      ...data
    }
  }
}, {
  total: 0,
  items: []
})
