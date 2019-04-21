chrome.runtime.onMessage.addListener(
  function(msg, sender, sendResponse) {
    let js = msg.executeJs;
    if(js != null) {
      // javascriptを実行する
      eval(js.value);
      sendResponse({result: "executed"});
    }
  });
