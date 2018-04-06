import * as $C from './consts'

export const recombinateCategory = (arr) => {
  if (!arr) return
  const parents = arr.filter(item => +item.pid === 0)
  parents.forEach((pItem, i) => {
    pItem.active = false
    if (i === $C.ACTIVE) {
      pItem.active = true
    }
    let childs = arr.filter(item => +item.pid === +pItem.id)
    if (childs) {
      pItem.children = childs
    }
  })

  return parents
}
