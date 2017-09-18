
function closeTab(tab) {
  browser.tabs.remove(tab.id);
}

browser.pageAction.onClicked.addListener(closeTab);

//  Each time a tab is updated, reset the page action for that tab.
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
    browser.pageAction.show(id);
});
//  Avoid the need for the "all tabs" permission by adding the button on demand
browser.tabs.onActivated.addListener((activeInfo) => {
    browser.pageAction.show(activeInfo.tabId);
});
browser.tabs.onCreated.addListener((tab) => {
    browser.pageAction.show(tab.id);
});
//  probably never fires? (according to the docs)
//  add it just in case
browser.tabs.onReplaced.addListener((addedTabId, removedTabId) => {
    browser.pageAction.show(addedTabId);
});

