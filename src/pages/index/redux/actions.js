import * as types from './action-types'
import { createAction } from 'redux-actions'
import $dateProvider from '@/dateProvider'

export const getCourse = createAction(types.GET_COURSE,
  () => {
    return $dateProvider.course.GET().then(res => res)
  }
)
