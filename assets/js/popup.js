const bg = chrome.extension.getBackgroundPage();

/** @function */
function openOptionsPage() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}

/** updates page element with the current blocker status */
function updateBlockerStatus() {
  const status = document.querySelector('h2');
  status.textContent = (bg.isBlockerActive() ? 'active' : 'not active');
}

document.addEventListener('DOMContentLoaded', function() {
  updateBlockerStatus();

  document.querySelector('#timer').addEventListener(
    'click', bg.countdownTimer);

  document.querySelector('#options').addEventListener(
    'click', openOptionsPage);
});
