const WebRequestBlocker = function() {};

/**
 * disables the blocker by removing the listener
 * @return {boolean} - is the blocker enabled
 */
WebRequestBlocker.disable = function() {
  chrome.webRequest.onBeforeRequest.removeListener(this.listener);
  // temporary to show that our blocker works
  chrome.browserAction.setBadgeText({text: ''});
  return false;
};

/**
 * enables the blocker by attaching the listener
 * @return {boolean} - is the blocker enabled
 */
WebRequestBlocker.enable = function() {
  chrome.webRequest.onBeforeRequest.addListener(
    this.listener,
    {urls: ['http://*/*', 'https://*/*']},
    ['blocking']);
  // temporary to show that our blocker works
  chrome.browserAction.setBadgeText({text: 'ON'});
  return true;
};

/** @return {boolean} - is the blocker enabled */
WebRequestBlocker.isEnabled = function() {
  return chrome.webRequest.onBeforeRequest.hasListener(this.listener);
};

/**
* web requests go through here to determine whether they should be blocked.
* todo: implement whitelist here.
*
* @param {object} request - contains details about the intercepted request
* @return {BlockingResponse} used to modify network requests
*/
WebRequestBlocker.listener = function(request) {
  let blockingResponse = {cancel: true};
  return blockingResponse;
};

/**
 * Handles messages to and from WebRequestBlocker
 * @param  {string} message - the message sent from elsewhere
 * @return {boolean} - is the blocker enabled
 */
WebRequestBlocker.messageHandler = function(message) {
  switch (message) {
    case 'enable': {
      WebRequestBlocker.enable();
      break;
    }
    case 'disable': {
      WebRequestBlocker.disable();
      break;
    }
    case 'isEnabled': {
      WebRequestBlocker.isEnabled();
      break;
    }
    case 'toggle': {
      WebRequestBlocker.toggle();
      break;
    }
    default: {
      break;
    }
  }
  return WebRequestBlocker.isEnabled();
};

/**
 * toggles the blocker on-off
 * @return {boolean} enabled - is the blocker enabled
 */
WebRequestBlocker.toggle = function() {
  if (!this.isEnabled()) {
    this.enable();
  } else {
    this.disable();
  }
  return this.isEnabled();
};


/**
 * listener function that processes messages sent from other pages
 * @param  {Object} request - JSON object
 * @param  {Object} sender - the id and url the message originated from
 * @param  {function} sendResponse - function that sends the JSON response
 */
function onMessageListener(request, sender, sendResponse) {
  if (request.hasOwnProperty('WebRequestBlocker')) {
    let response = WebRequestBlocker.messageHandler(request.WebRequestBlocker);
    sendResponse({isEnabled: response});
  }
}

chrome.runtime.onMessage.addListener(onMessageListener);
