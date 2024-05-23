document.getElementById('modifierLiens').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: modifierLiens
      });
    });
  });
  
  function modifierLiens() {
    let links = document.querySelectorAll('a');
    links.forEach((link, index) => {
      if (index % 2 === 0) {
        link.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      }
    });
  }