import * as types from './action-types'
import { createAction } from 'redux-actions'
import $dateProvider from '@/dateProvider'

export const getCourse = createAction(types.GET_COURSE,
  () => {
    return $dateProvider.course.GET().then(res => res)
  }
)

export const getCategory = createAction(types.GET_CATEGORY,
  options => {
    return $dateProvider.category.GET(options).then(res => res)
  }
)

export const getRecommend = createAction(types.GET_RECOMMEND,
  options => {
    return $dateProvider.recommend.GET(options).then(res => res)
  }
)

export const getProduct = createAction(types.GET_PRODUCT,
  options => {
    return $dateProvider.products.GET(options).then(res => res)
  }
)
