import REST from '@/utils/restful'

class Model extends REST {
  constructor () {
    super()
    this.baseUri = ['http://localhost:8081', 'v1.0', 'server/courses']
  }
}

export default new Model()
