/*global chrome */

// eslint-disable-next-line no-undef

chrome.browserAction.onClicked.addListener(function (tab) {
    alert(tab);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        alert(tabs);
        chrome.tabs.sendMessage(tabs[0].id, { type: "popup-modal" });
        alert(tabs[0]);
    });
});