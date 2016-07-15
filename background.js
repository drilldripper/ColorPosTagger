chrome.browserAction.onClicked.addListener(function (id, bookmark) {
	// 取得するタブのクエリ
	var queryInfo = {
		active: true,
		windowId: chrome.windows.WINDOW_ID_CURRENT
	};

	// タブの情報を取得する
	chrome.tabs.query(queryInfo, function (result) {
		// 配列の先頭に現在タブの情報が入っている
		var currentTab = result.shift();

		// メッセージ
		var message = {};

		// 現在表示しているタブにメッセージを送る
		chrome.tabs.sendMessage(currentTab.id, message, function () { });
	});
});