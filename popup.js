let saveBtn = document.getElementById("savePage");
let popBtn = document.getElementById("popPage");

chrome.storage.sync.get("pages", ({ pages }) => {
  if (pages.length <= 1)
    popBtn.disabled = true;
});

saveBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});  

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      let url = window.location.href;
      chrome.storage.sync.get("pages", ({ pages }) => {
        pages.push(url);
        chrome.storage.sync.set({ pages });
      });
    }
  });

  chrome.tabs.remove(tab.id);
});


popBtn.addEventListener("click", async () => {
  chrome.storage.sync.get("pages", ({ pages }) => {
    const randomPageIdx = Math.floor(Math.random() * pages.length);
    const [randomPage] = pages.splice(randomPageIdx, 1);
    window.open(randomPage, "_blank");
    chrome.storage.sync.set({ pages });
  });
});