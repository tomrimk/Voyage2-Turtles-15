/** keeping all webRequest helper functions together */
class WebRequestBlocker { // eslint-disable-line no-unused-vars
  /**
  * all web requests made pass through here to determine whether
  *   they should be blocked.
  * todo: implement whitelist here.
  *
  * @param {object} request - contains details about the intercepted request
  * @return {BlockingResponse} used to modify network requests
  */
  block(request) {
    let blockingResponse = {cancel: true};
    return blockingResponse;
  }

  /**
   * enables the blocker by attaching the listener
   * @return {boolean} - is the blocker enabled
   */
  enable() {
    chrome.webRequest.onBeforeRequest.addListener(
    this.block,
    {urls: ['http://*/*', 'https://*/*']},
    ['blocking']);
    // temporary to show that our blocker works
    chrome.browserAction.setBadgeText({text: 'ON'});
    return true;
  }

  /**
   * disables the blocker by removing the listener
   * @return {boolean} - is the blocker enabled
   */
  disable() {
    chrome.webRequest.onBeforeRequest.removeListener(this.block);
    // temporary to show that our blocker works
    chrome.browserAction.setBadgeText({text: ''});
    return false;
  }

  /** @return {boolean} - is the blocker enabled */
  isEnabled() {
    return chrome.webRequest.onBeforeRequest.hasListener(this.block);
  }

  /**
   * toggles the blocker on-off
   * @return {boolean} enabled - is the blocker enabled
   */
  toggle() {
    if (!this.isEnabled()) {
      this.enable();
    } else {
      this.disable();
    }
    return this.isEnabled();
  }
}


/**
 * listener function that processes messages sent from other pages
 * @param  {Object} request - JSON object
 * @param  {Object} sender - the id and url the message originated from
 * @param  {function} sendResponse - function that sends the JSON response
 */
function messageListener(request, sender, sendResponse) {
  // todo: check if request contains webRequestBlocker name
  switch (request.WebRequestBlocker) {
    case 'enable': {
      sendResponse({isEnabled: blocker.enable()});
      break;
    }
    case 'disable': {
      sendResponse({isEnabled: blocker.disable()});
      break;
    }
    case 'isEnabled': {
      sendResponse({isEnabled: blocker.isEnabled()});
      break;
    }
    case 'toggle': {
      sendResponse({isEnabled: blocker.toggle()});
      break;
    }
    default: {
      break;
    }
  }
}

const blocker = new WebRequestBlocker();
chrome.runtime.onMessage.addListener(messageListener);
