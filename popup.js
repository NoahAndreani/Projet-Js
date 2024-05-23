document.getElementById('modifierLiens').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: modifierLiens
      });
    });
  });
  
  function modifierLiens() {
    averageLinkModif = Math.floor(Math.random(3));
    let links = document.querySelectorAll('a');
    links.forEach((link, index) => {
      if (index % averageLinkModif === 0) {
        link.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      }
    });
  }