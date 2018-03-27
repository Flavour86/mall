export const recombinateCategory = (arr) => {
  if (!arr) return
  const parents = arr.filter(item => +item.pid === 0)
  parents.forEach(pItem => {
    let childs = arr.filter(item => +item.pid === +pItem.id)
    if (childs) {
      pItem.children = childs
    }
  })

  return parents
}
