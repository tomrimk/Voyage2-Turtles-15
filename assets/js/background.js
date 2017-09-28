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
  const view = getView('popup.html').window;

  if (!isBlockerActive()) {
    enableBlocker();
    view.updateBlockerStatus();
  } else {
    disableBlocker();
    view.updateBlockerStatus();
  }
}

/** activates web request blocker */
function enableBlocker() {
  chrome.webRequest.onBeforeRequest.addListener(
  webRequestBlocker, // callback
  {urls: ['http://*/*', 'https://*/*']}, // filter
  ['blocking'] // opt_extraInfoSpec ('blocking' means handles synchronously)
  );
  chrome.browserAction.setBadgeText({text: 'ON'});
}

/** removes web request blocker */
function disableBlocker() {
  chrome.webRequest.onBeforeRequest.removeListener(webRequestBlocker);
  chrome.browserAction.setBadgeText({text: 'OFF'});
}

/** @return {Boolean} */
function isBlockerActive() {
  return chrome.webRequest.onBeforeRequest.hasListener(webRequestBlocker);
}

/**
* @param {object} request contains details about the intercepted request
* @return {BlockingResponse} used to modify network requests
*/
function webRequestBlocker(request) {
  // if (isUrlInWhitelist)
  if (request.url.indexOf('://www.google.com') != -1) {
    return {cancel: true};
  }
}
