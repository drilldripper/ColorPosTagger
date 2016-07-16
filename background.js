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
var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if(toggle){
    chrome.browserAction.setIcon({path: "icon1.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {file:"SCRIPT.user.js"});
  }
  else{
    chrome.browserAction.setIcon({path: "icon2.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {code:"alert()"});
  }
});
