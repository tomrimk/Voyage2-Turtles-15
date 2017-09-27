/* exported countdownTimer */
/** triggers when the timer button is clicked */
function countdownTimer() {
  if (!isWebRequestBlockerActive()) {
    activateWebRequestBlocker();
  } else {
    deactivateWebRequestBlocker();
  }
}

/** @return {Boolean} */
function isWebRequestBlockerActive() {
  return chrome.webRequest.onBeforeRequest.hasListener(
    webRequestBlocker);
}

/** activates web request blocker */
function activateWebRequestBlocker() {
  chrome.webRequest.onBeforeRequest.addListener(
  webRequestBlocker,
  {urls: ['<all_urls>']},
  ['blocking']
  );
  // todo: get rid of this
  document.querySelector('h2').innerHTML = 'active';
}

/** removes web request blocker */
function deactivateWebRequestBlocker() {
  chrome.webRequest.onBeforeRequest.removeListener(
    webRequestBlocker
  );
  // todo: get rid of this
  document.querySelector('h2').innerHTML = 'not active';
}

/**
 * @param {object} request contains details about the intercepted request
 * @return {BlockingResponse} used to modify network requests
 */
function webRequestBlocker(request) {
  // todo: get rid of this
  document.querySelector('h2').innerHTML = `blocked ${request.url}`;
  const blocking = {
    cancel: false,
    redirectUrl: 'https://google.com',
  };
  return blocking;
}
