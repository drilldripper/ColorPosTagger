//default color
chrome.storage.sync.set({
	'noun': '<font color="#009250">',
	'adjective': '<font color="#1F91BE">',
	'verb': '<font color="#DE9610">',
	'adverb': '<font color="#5D639E">',
	'auxiliaryVerb': '<font color="#B61972">',
	'relative': '<font color="#744199">',
	'conjunction': '<font color="#DA5019">',
	'determiner': '<font color="#009250">'
}, function () {
		console.log('Settings saved');
});


chrome.browserAction.onClicked.addListener(function (id, bookmark) {
		// get tab query
		var queryInfo = {
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
		};

	// get tab infomation
		chrome.tabs.query(queryInfo, function (result) {
		var currentTab = result.shift();
		if (message == true) {
			message = false
		} else {
			message = true;
		}
		var message = {};

		// send current tab
		chrome.tabs.sendMessage(currentTab.id, message, function () { });
		});
});


//update icon when you click icon
var toggle = true;
chrome.browserAction.onClicked.addListener(function (tab) {
	toggle = !toggle;
	if (toggle) {
		chrome.browserAction.setIcon({ path: "icons/icon_before.png", tabId: tab.id });
		chrome.tabs.executeScript(tab.id, { file: "SCRIPT.user.js" });
	}
	else {
		chrome.browserAction.setIcon({ path: "icons/icon_after.png", tabId: tab.id });
		chrome.tabs.executeScript(tab.id, { code: "alert()" });
	}
});
