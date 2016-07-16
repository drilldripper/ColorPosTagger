chrome.runtime.onMessage.addListener(function(request) {
    // console.log(request);
    // console.log("MODULE TEST");
    colorChange(request);
});
