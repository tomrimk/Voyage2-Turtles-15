/* global WebRequestBlocker */

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
