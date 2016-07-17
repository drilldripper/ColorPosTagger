//default color
chrome.storage.local.set({
	 'noun': '<font color="#009250">', 
	 'adjective':'<font color="#1F91BE">' ,
	 'verb': '<font color="#EDAD0B">', 
	 'adverb': '<font color="#5D639E">', 
	 'auxiliaryVerb':'<font color="#A4C520">' ,
	 'relative': '<font color="#744199">', 
	 'conjunction':'<font color="#DA5019">',
	 'determiner': '<font color="#009250">'
	}, function () {
	console.log('Settings saved');
});


chrome.browserAction.onClicked.addListener(function (id, bookmark) {
	console.log("BACKGROUND");
	// 取得するタブのクエリ
	var queryInfo = {
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
	};

	// タブの情報を取得する
	chrome.tabs.query(queryInfo, function (result) {
		// 配列の先頭に現在タブの情報が入っている
		var currentTab = result.shift();
		if (message == true) {
			message = false
		} else {
			message = true;
		}
		// メッセージ
		var message = {};

		// 現在表示しているタブにメッセージを送る
		chrome.tabs.sendMessage(currentTab.id, message, function () { });
	});
});


//アイコンの更新
var toggle = true;
chrome.browserAction.onClicked.addListener(function (tab) {
  toggle = !toggle;
  if (toggle) {
    chrome.browserAction.setIcon({ path: "icon_before.png", tabId: tab.id });
    chrome.tabs.executeScript(tab.id, { file: "SCRIPT.user.js" });
  }
  else {
    chrome.browserAction.setIcon({ path: "icon_after.png", tabId: tab.id });
    chrome.tabs.executeScript(tab.id, { code: "alert()" });
  }
});
