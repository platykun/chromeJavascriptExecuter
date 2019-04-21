// localStorageの値を取得する
let localStorageItem = localStorage.getItem('jsList');
let data = localStorageItem === null ? [] : JSON.parse(localStorageItem);

// 実行対象のlistを作成する
for (let i = 0; i < data.length; i++) {
  let title = data[i]["title"];
  $('#registerList').append('<tr><th class="register-content" scope="row">' + title + '</th></tr>');
}

// Listの項目押下時にjavascriptが発火するように、eventListenerを登録する
for (let i = 0; i < $('.register-content').length; i++) {
  $('.register-content').get(i).addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          executeJs: {
            value: data[i]["js"]
          }
        },
        {},
        function () {
        }
      );
    })
  })
}
