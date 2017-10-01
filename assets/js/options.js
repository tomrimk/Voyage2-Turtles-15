/* eslint no-console: 1 */

/**
 * temp logging function for the option page
 * @param {String} message
 */
function log(message) {
  let pre = document.getElementById('logging');
  let time = (new Date).toTimeString().slice(0, 8);
  pre.textContent = `${time} - ${message}\n${pre.textContent}\n`;
}

/**
 * Populates form fields with data from storage
 * @param {Object} data - JSON data object
 */
function fillForm(data) {
  log('retrieved from storage: ' + JSON.stringify(data));
  let whitelist = document.getElementsByTagName('textarea')[0];
  whitelist.textContent = data['whitelist'];
}

/**
 * Gets form entries and stores it
 * @param {Event} event - submit event
  */
function submit(event) {
  event.preventDefault();

  let entries = {};
  let formData = new FormData(document.forms['options']);
  for (let entry of formData.entries()) {
    entries[entry[0]] = entry[1];
  }

  chrome.storage.local.set(entries, function() {
    log('saved to storage: ' + JSON.stringify(entries));
  });
}


/** document init function */
function init() {
  chrome.storage.local.get(null, fillForm);
  document.forms['options'].addEventListener('submit', submit);
}

document.addEventListener('DOMContentLoaded', init);
