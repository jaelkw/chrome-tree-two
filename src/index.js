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
chrome.tabs.onUpdated.addListener((updatedTabId, changeInfo, updatedTab, title) => {
  console.log('tab updated', changeInfo)
  console.log('tab Title', changeInfo["title"]) //this doesnt seem to work - alot of the tab titles are undefined
  console.log('tab URL', updatedTab["url"])

  // maybe can use the fact that tab titles are undefined - only when they are fully loaded/ it's a legit website does the title come up.
  if ( changeInfo["title"] != undefined ) {
  	var div = document.createElement('div');
 // 	div.id="one_c";
  	var innerHTMLstr = "<a href = " + updatedTab["url"] + ">" + changeInfo["title"] +"</a>";
  	//console.log('innerHTMLstr', innerHTMLstr); //works rn, but if ever the link fails, good to debug by checking this line
  	div.innerHTML = innerHTMLstr;

	document.body.appendChild(div);
  }

})



