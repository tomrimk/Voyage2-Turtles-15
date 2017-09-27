/** @function */
function openOptionsPage() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}

/* global isWebRequestBlockerActive: true */
/** updates page element with the current blocker status */
function updateWebRequestBlockerStatus() {
  const status = document.querySelector('h2');
  status.innerHTML = (isWebRequestBlockerActive() ? 'active' : 'not active');
}

/* global countdownTimer: true */
document.addEventListener('DOMContentLoaded', function() {
  updateWebRequestBlockerStatus();

  document.querySelector('#timer').addEventListener(
    'click', countdownTimer);

  document.querySelector('#options').addEventListener(
    'click', openOptionsPage);
});
