chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  chrome.runtime.onStartup.addListener(() => {
    console.log('Extension started');
  });
  
  chrome.runtime.onSuspend.addListener(() => {
    console.log('Extension suspended');
  });
  