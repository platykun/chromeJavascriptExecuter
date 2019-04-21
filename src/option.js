// 登録ボタン押下イベントを取得してjsを実行するイベントを呼ぶ
function submitJs() {
  let localStorageItem = localStorage.getItem('jsList');
  let data = localStorageItem === null ? [] : JSON.parse(localStorageItem);

  let jsValue = $('textarea[name="js"]').val();
  let titleValue = $('input[name="title"]').val();

  data.push({js: jsValue, title: titleValue});
  localStorage.setItem('jsList', JSON.stringify(data));
}
document.querySelector('.submit').addEventListener('click', submitJs);

// 画面初期表示時、localStorage情報から登録済みjavascript情報を取得する
let localStorageItem = localStorage.getItem('jsList');
let data = localStorageItem === null ? [] : JSON.parse(localStorageItem);
for (let i = 0; i < data.length; i++) {
  let title = data[i]["title"];
  $('#registerList').append('<tr><th scope="row">'+ title +'</th></tr>');
}

// 登録ボタン押下イベントを取得して登録済みjavascriptの情報を更新する
function updateRegisterList() {
  let localStorageItem = localStorage.getItem('jsList');
  let data = localStorageItem === null ? [] : JSON.parse(localStorageItem);
  $('#registerList').empty();
  for (let i = 0; i < data.length; i++) {
    let title = data[i]["title"];
    $('#registerList').append('<tr><th scope="row">'+ title +'</th></tr>');
  }
}
document.querySelector('.submit').addEventListener('click', updateRegisterList);
