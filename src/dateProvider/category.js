import REST from '@/utils/restful'
import * as $C from '@/constants'

class CategoryModel extends REST {
  constructor () {
    super()
    this.baseUri = ['https://api.it120.cc', $C.API_CODE, 'shop/goods/category/all']
  }
}

class RecommendModel extends REST {
  constructor () {
    super()
    this.baseUri = ['https://api.it120.cc', $C.API_CODE, 'banner/list']
  }
}

class ProductListsModel extends REST {
  constructor () {
    super()
    this.baseUri = ['https://api.it120.cc', $C.API_CODE, 'shop/goods/list']
  }
}

class ProductDetailModel extends REST {
  constructor () {
    super()
    this.baseUri = ['https://api.it120.cc', $C.API_CODE, 'shop/goods/detail']
  }
}

export default {
  category: new CategoryModel(),
  recommend: new RecommendModel(),
  products: new ProductListsModel(),
  productDetail: new ProductDetailModel()
}
