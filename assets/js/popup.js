/** Countdown timer logic */
function countdownTimer() {
  toggleWebRequestBlocker();
}

/** Sends a message to WebRequestBlocker to toggle it on-off */
function toggleWebRequestBlocker() {
  let message = {WebRequestBlocker: 'toggle'};
  chrome.runtime.sendMessage(message, function(response) {
    let status = response.isEnabled;
    updateWebRequestBlockerStatus();
  });
}

/** Updates page elements to show current blocker status */
function updateWebRequestBlockerStatus() {
  let message = {WebRequestBlocker: 'isEnabled'};
  chrome.runtime.sendMessage(message, function(response) {
      let status = (response.isEnabled ? 'enabled' : 'disabled');
      document.querySelector('#blocker').textContent = status;
  });
}

/** Recommended method to provide a link to the options page */
function openOptionsPage() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}


document.addEventListener('DOMContentLoaded', function() {
  updateWebRequestBlockerStatus();

  document.querySelector('#timer').addEventListener(
    'click', countdownTimer);

  document.querySelector('#options').addEventListener(
    'click', openOptionsPage);
});
