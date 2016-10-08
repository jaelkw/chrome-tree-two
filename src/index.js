import forest from './forest'

// chrome.management.getSelf(extensionInfo => console.log('extensionInfo', extensionInfo))
// chrome.tabs.create({ url: 'http://www.google.com' }, tab => console.log('tab', tab))

chrome.windows.getAll({ populate: true }, windows => {
  const allTabs = windows.reduce((tabs, currWindow) => {
    tabs.push(...currWindow.tabs)
    return tabs
  }, [])

  const tabInfo = allTabs.map(tab => {
    const { favIconUrl, title, url } = tab
    return { favIconUrl, title, url }
  })

  console.log('tabInfo', tabInfo)
})

chrome.tabs.onCreated.addListener(createdTab => {
  console.log('tab created', createdTab)

  // created tab is a new root
  if (createdTab.active) {
    forest.addRoot(createdTab)
  } else {
    // created tab is a child
    chrome.windows.getLastFocused({ populate: true }, window => {
      console.log('window', window)

      // currentTab refers to the parent in the tree
      const currentTab = window.tabs.find(tab => tab.active)
      forest.addChild(createdTab, currentTab.id)
      console.log('child added', forest.forest)
    })
  }

  console.log('forest', forest.forest)
})

// TODO: need to update tab info in forest when things change
// these things that are changed can be seen in changeInfo, only need to watch for things we display
chrome.tabs.onUpdated.addListener((updatedTabId, changeInfo, updatedTab) => {
  console.log('tab updated', changeInfo)
})



