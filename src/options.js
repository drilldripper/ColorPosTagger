// Saves options to chrome.storage
function save_options() {
  var noun = document.getElementById('noun').value;
  var adjective = document.getElementById('adjective').value;
  var verb = document.getElementById('verb').value;
  var adverb = document.getElementById('adverb').value;
  var auxiliaryVerb = document.getElementById('auxiliaryVerb').value;
  var relative = document.getElementById('relative').value;
  var conjunction = document.getElementById('conjunction').value;
  var determiner = document.getElementById('determiner').value;

  chrome.storage.local.set({
    'noun': noun,
    'adjective':adjective,
    'verb':verb,
    'adverb':adverb,
    'auxiliaryVerb':auxiliaryVerb,
    'relative':relative,
    'conjunction':conjunction,
    'determiner':determiner

  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.local.get({
    noun: 'Green',
    adjective: 'Blue',
    verb: 'Orange',
    adverb: 'Pale-purple',
    auxiliaryVerb: 'Yellow-green',
    relative: 'Purple',
    conjunction: 'Red',
    determiner: 'Soil'


  }, function(items) {
    document.getElementById('noun').value = items.noun;
    document.getElementById('adjective').value = items.adjective;
    document.getElementById('verb').value = items.verb;
    document.getElementById('adverb').value = items.adverb;
    document.getElementById('auxiliaryVerb').value = items.auxiliaryVerb;
    document.getElementById('relative').value = items.relative;
    document.getElementById('conjunction').value = items.conjunction;
    document.getElementById('determiner').value = items.determiner;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);


