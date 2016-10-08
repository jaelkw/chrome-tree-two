chrome.management.getSelf(extensionInfo => console.log('extensionInfo', extensionInfo))

chrome.windows.getAll({ populate: true }, windows => {
  console.log('windows', windows)

  const allTabs = windows.reduce((tabs, currWindow) => {
    const currWindowTabs = currWindow.tabs
    tabs.push(...currWindowTabs)
    return tabs
  }, [])
  console.log('allTabs', allTabs)

  chrome.tabs.get(allTabs[0].id, tabInfo => console.log('tabInfo', tabInfo))
})

// chrome.tabs.create({ url: 'http://www.google.com' }, tab => console.log('tab', tab))
