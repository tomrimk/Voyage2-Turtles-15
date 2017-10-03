/** Countdown timer logic */
function timer() {
  toggleWebRequestBlocker();
  TimerFunctions.startTimer(25, 0);
}

function pauseTimer() {
  TimerFunctions.pauseTimer();
}

function stopTimer() {
  TimerFunctions.stopTimer();
}

/** Sends a message to WebRequestBlocker to toggle it on-off */
function toggleWebRequestBlocker() {
  let message = {WebRequestBlocker: 'toggle'};
  chrome.runtime.sendMessage(message, function(response) {});
}

/** Recommended method to provide a link to the options page */
function options() {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}


/** document init function */
function init() {
  document.querySelector('#timer').addEventListener('click', timer);
  document.querySelector('#options').addEventListener('click', options);
  document.querySelector('#pause').addEventListener('click', pauseTimer);
  document.querySelector('#stop').addEventListener('click', stopTimer);
}

document.addEventListener('DOMContentLoaded', init);
