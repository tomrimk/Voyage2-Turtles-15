/** groups functions related to blocking web requests together */
const WebRequestBlocker = {

  /** @return {boolean} - is the blocker enabled */
  disable: function() {
    chrome.webRequest.onBeforeRequest.removeListener(this.listener);
    // temporary to show that our blocker works
    chrome.browserAction.setBadgeText({text: ''});
    return false;
  },

  /** @return {boolean} - is the blocker enabled */
  enable: function() {
    chrome.webRequest.onBeforeRequest.addListener(
      this.listener,
      {urls: ['http://*/*', 'https://*/*']},
      ['blocking']);
    // temporary to show that our blocker works
    chrome.browserAction.setBadgeText({text: 'ON'});
    return true;
  },

  /** @return {boolean} - is the blocker enabled */
  isEnabled: function() {
    return chrome.webRequest.onBeforeRequest.hasListener(this.listener);
  },

  /**
   * web requests go through here to determine whether they should be blocked.
   * todo: implement whitelist here
   *
   * @param {object} request - contains details about the intercepted request
   * @return {BlockingResponse} - used to modify network requests
   */
  listener: function(request) {
    let blockingResponse = {cancel: true};
    return blockingResponse;
  },

  /**
   * Handles messages to and from WebRequestBlocker
   * @param  {string} message - the message sent from elsewhere
   * @return {boolean} - is the blocker enabled
   */
  messageHandler: function(message) {
    switch (message) {
      case 'isEnabled': {
        let response = this.isEnabled();
        return response;
      }
      case 'toggle': {
        let response = this.toggle();
        return response;
      }
    }
  },

  /** @return {boolean} - is the blocker enabled */
  toggle: function() {
    let enabled = this.isEnabled();
    enabled ? this.disable() : this.enable();

    return !enabled;
  },
};

/**
 * listener function that processes messages sent from other pages
 * @param  {Object} request - JSON object
 * @param  {Object} sender - the id and url the message originated from
 * @param  {function} sendResponse - function that sends the JSON response
 */
function messages(request, sender, sendResponse) {
  if (request.hasOwnProperty('WebRequestBlocker')) {
    let response = WebRequestBlocker.messageHandler(request.WebRequestBlocker);
    sendResponse({isEnabled: response});
  }
}

chrome.runtime.onMessage.addListener(messages);
