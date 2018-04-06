import * as types from './action-types'
import { createAction } from 'redux-actions'
import $dateProvider from '@/dateProvider'

export const getProductDetail = createAction(types.GET_PRODUCT_DETAIL,
  options => {
    return $dateProvider.productDetail.GET(options).then(res => res)
  }
)
