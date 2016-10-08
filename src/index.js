chrome.management.getSelf(extensionInfo => console.log('extensionInfo', extensionInfo))

chrome.tabs.create({ url: 'http://www.google.com' }, tab => console.log('tab', tab))
