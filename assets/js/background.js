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
  webRequestBlocker,
  {urls: ['http://*/*', 'https://*/*']},
  ['blocking']
  );
}

/** removes web request blocker */
function disableBlocker() {
  chrome.webRequest.onBeforeRequest.removeListener(webRequestBlocker);
}

/** @return {Boolean} */
function isBlockerActive() {
  return chrome.webRequest.onBeforeRequest.hasListener(webRequestBlocker);
}

/* eslint no-console: false*/
/**
* @param {object} request contains details about the intercepted request
* @return {BlockingResponse} used to modify network requests
*/
function webRequestBlocker(request) {
  console.log(request);
  // window.popup(`blocked ${request.url}`);
  // am I really returningi a BlockingResponse?
  const blocking = {
    cancel: false,
    redirectUrl: 'https://google.com',
  };
  return blocking;
}
