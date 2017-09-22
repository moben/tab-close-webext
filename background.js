
function closeTab(tab) {
  browser.tabs.remove(tab.id);
}

browser.pageAction.onClicked.addListener(closeTab);

//  When first loaded, initialize the page action for all tabs.
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
    for (let tab of tabs) {
        browser.pageAction.show(tab.id);
    }
});

//  Add pageAction to each new tab
browser.tabs.onCreated.addListener((tab) => {
    browser.pageAction.show(tab.id);
});
//  Not sure if there can be a race, e.g. on startup with opening a new tab before the onCreated
//  listener is set up. Add this one just in case
browser.tabs.onActivated.addListener((activeInfo) => {
    browser.pageAction.show(activeInfo.tabId);
});
//  Needed to show the button when a discarded tab is re-loaded
browser.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo) => {
    browser.pageAction.show(tabId);
});
//  probably never fires? (according to the docs)
//  add it just in case
browser.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
    browser.pageAction.show(addedTabId);
});

