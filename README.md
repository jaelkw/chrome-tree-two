# chrome-tree

## Development

You need node.js installed to run the code.
To install dependencies, run:

```
npm install
```

To run the code and start the watcher (which will recompile every time a change is made), run:

```
npm run start
```

### Configuring on Chrome

Refer to the [docs](https://developer.chrome.com/extensions/getstarted#unpacked) on how to enable the extension.

### Debugging

You can right click on the extension's icon and choose `inspect popup` to load the dev tools.
However, it might disappear if you change tabs or create tabs, etc.

A better way is to [open the extension in a new tab](http://stackoverflow.com/questions/31818610/is-there-any-way-to-keep-developer-tools-open-when-debugging-a-chrome-extension). Go to `chrome-extension://extensionid/popup.html`,
and fill in the appropriate `extensionid`. You can get it (and other information about the extension) by running:

```javascript
chrome.management.getSelf(extensionInfo => console.log('extensionInfo', extensionInfo))
```
