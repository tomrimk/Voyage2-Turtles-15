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
  let whitelist = document.querySelector('textarea[name="whitelist"]');
  whitelist.textContent = data['whitelist'];
}

/**
 * Checks whether the domain is valid
 * todo: implement
 * @param {String} domain
 * @return {boolean} is the input a valid domain
 */
function isValidDomain(domain) {
  return true;
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

/**
 * Stops the form from submitting when pressing the 'Enter' key.
 * Validates the domain field and if valid, add it to the whitelist textarea.
 * @param {Event} event - KeyboardEvent
 */
function validateDomainOnEnter(event) {
  if (event.key === 'Enter') {
    event.preventDefault();

    let input = document.querySelector('input[name="domain"]');
    if (isValidDomain(input.value)) {
      let whitelist = document.querySelector('textarea[name="whitelist"]');
      whitelist.textContent = `${whitelist.textContent}\n${input.value}`;
    } else {
      // invalid domain
    }
  }
}


/** document init function */
function init() {
  // retrieves form values from storage and puts them in the page
  chrome.storage.local.get(null, fillForm);

  // overrides default behavior when the focus is on domain input field
  let domainField = document.querySelector('input[name="domain');
  domainField.addEventListener('keydown', validateDomainOnEnter);

  // what to do when the form is submitted
  document.forms['options'].addEventListener('submit', submit);
}

document.addEventListener('DOMContentLoaded', init);
