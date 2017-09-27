/**
 * returns a view filtered by name
 * @param  {string} name: the filename including extension
 * @return {object} (window)
 */
function getView(name) {
  const views = chrome.extension.getViews();

  const result = views.filter(function(view) {
    let pathname = view.window.location.pathname;
    let filename = pathname.slice(1, pathname.length);
    return filename == name;
  });
  return result.pop();
}

/* exported countdownTimer */
/** triggers when the timer button is clicked */
function countdownTimer() {
  const view = getView('popup.html');

  if (!isBlockerActive()) {
    enableBlocker();
    view.window.updateBlockerStatus();
    // todo: get rid of this
    // document.querySelector('h2').textContent = 'active';
  } else {
    disableBlocker();
    view.window.updateBlockerStatus();
    // todo: get rid of this
    // document.querySelector('h2').textContent = 'not active';
  }
}

/** @return {Boolean} */
function isBlockerActive() {
  return chrome.webRequest.onBeforeRequest.hasListener(
    webRequestBlocker);
}

/** activates web request blocker */
function enableBlocker() {
  chrome.webRequest.onBeforeRequest.addListener(
  webRequestBlocker,
  {urls: ['<all_urls>']},
  ['blocking']
  );
}

/** removes web request blocker */
function disableBlocker() {
  chrome.webRequest.onBeforeRequest.removeListener(
    webRequestBlocker
  );
}

/**
 * @param {object} request contains details about the intercepted request
 * @return {BlockingResponse} used to modify network requests
 */
function webRequestBlocker(request) {
  // todo: get rid of this
  document.querySelector('h2').textContent = `blocked ${request.url}`;
  // am I really returningi a BlockingResponse?
  const blocking = {
    cancel: false,
    redirectUrl: 'https://google.com',
  };
  return blocking;
}
