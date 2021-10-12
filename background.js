let pages = [];

// Run when the user first installs the extension
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ pages }); // Use sync to store persistent data
  console.log("Page list created.");
});