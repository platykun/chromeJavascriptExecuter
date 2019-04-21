// localStorageの値を取得する
let localStorageItem = localStorage.getItem('jsList');
let data = localStorageItem === null ? [] : JSON.parse(localStorageItem);

// listを作成する
for (let i = 0; i < data.length; i++) {
  let title = data[i]["title"];
  $('ul').append('<li class="list-group-item">' + title + '</li>');
}


for (let i = 0; i < $('.list-group-item').length; i++) {
  $('.list-group-item').get(i).addEventListener("click", function () {
    alert("execute js code to tabs : " + data[i]["js"]);

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
      alert("queryInfo " + tabs[0].id);
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
