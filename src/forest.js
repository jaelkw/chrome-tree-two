let forest = []

function createTreeNode(tab) {
  return {
    tab,
    children: []
  }
}

function addRoot(tab) {
  forest.push(createTreeNode(tab))
}

function addChild(tab, parentId) {
  const parentNode = forest.find(tabNode => tabNode.tab.id === parentId)
  parentNode.children.push(createTreeNode(tab))
}

export default {
  forest,
  addRoot,
  addChild
}
