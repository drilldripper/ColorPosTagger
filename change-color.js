chrome.runtime.onMessage.addListener(function() {
    console.log("MODULE_TEST");
    colorChange();
});
