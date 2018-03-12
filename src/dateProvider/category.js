import REST from '@/utils/restful'
import * as $C from '@/constants'

class Model extends REST {
  constructor () {
    super()
    this.baseUri = ['https://api.it120.cc', $C.API_CODE, 'shop/goods/category/all']
  }
}

export default new Model()
