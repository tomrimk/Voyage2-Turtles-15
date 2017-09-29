/** Countdown timer logic */
function countdownTimer() {
  toggleWebRequestBlocker();
}

/** Sends a message to WebRequestBlocker to toggle it on-off */
function toggleWebRequestBlocker() {
  let message = {WebRequestBlocker: 'toggle'};
  chrome.runtime.sendMessage(message, function(response) {});
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
  document.querySelector('#timer').addEventListener(
    'click', countdownTimer);

  document.querySelector('#options').addEventListener(
    'click', openOptionsPage);
});
