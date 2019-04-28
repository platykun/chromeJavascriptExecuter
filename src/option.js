/**
 * JSを登録する
 */
function submitJs() {
  let localStorageItem = localStorage.getItem('jsList');
  let data = localStorageItem === null ? [] : JSON.parse(localStorageItem);

  let jsValue = $('textarea[name="js"]').val();
  let titleValue = $('input[name="title"]').val();

  data.push({js: jsValue, title: titleValue});
  localStorage.setItem('jsList', JSON.stringify(data));
  location.reload();
}

/**
 * JSを更新する
 *
 * @param index 更新対象のJSのindex番号
 * @param title タイトル
 * @param js javascript
 */
function updateJs(index, title, js) {
  let updateTargetJs = localStorage.getItem('jsList');
  let data = JSON.parse(updateTargetJs);
  data[index].js = js;
  data[index].title = title;

  localStorage.setItem('jsList', JSON.stringify(data));
  location.reload();
}

/**
 * JSを削除する
 * @param index 削除対象JSのindex番号
 *
 * lovalStorage以外の更新処理はどうするかは要検討
 */
function deleteJs(index) {
  let deleteTargetJs = localStorage.getItem('jsList');
  let data = JSON.parse(deleteTargetJs);
  data.splice(index, 1);

  localStorage.setItem('jsList', JSON.stringify(data));
  location.reload();
}

/**
 * 画面初期表示時、localStorage情報から登録済みjavascript情報を取得する
 */
let localStorageItem = localStorage.getItem('jsList');
let data = localStorageItem === null ? [] : JSON.parse(localStorageItem);
for (let i = 0; i < data.length; i++) {
  let title = data[i]["title"];
  const js = data[i]["js"];
  const dataTarget = "dataTarget" + i;

  $('#registerList').append(
    '<tr>' +
    '<th scope="row" data-toggle="modal" data-target="#' + dataTarget + '">' + title + '</th>' +
    '</tr>');
  $('#modalList').append(
    '<div class="modal fade" id="' + dataTarget + '" tabindex="-1" role="dialog" aria-labelledby="label1" aria-hidden="true">' +
    '<div class="modal-dialog" role="document">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<h5 class="modal-title" id="label1">編集</h5>' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span>' +
    '</button>' +
    '</div>' +
    '<div class="modal-body">' +
    '<div class="form-group">' +
    '<label>Title</label>' +
    '<input class="form-control" id=' + dataTarget + 'title name="title" value="' + title + '"/>' +
    '<label>JavaScript</label>' +
    '<textarea class="form-control" id=' + dataTarget + 'js name="js" rows="3">' + js + '</textarea>' +
    '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-danger" id=' + dataTarget + 'delete data-dismiss="modal">削除</button>' +
    '<button type="button" class="btn btn-primary" id=' + dataTarget + 'update >更新</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
  );

  document.querySelector('#' + dataTarget + 'update')
    .addEventListener('click', function () {
      let updatedTitle = $("#dataTarget" + i + "title")[0].value;
      const updatedJs = $("#dataTarget" + i + "js")[0].value;
      updateJs(i, updatedTitle, updatedJs);
    });
  document.querySelector('#' + dataTarget + 'delete')
    .addEventListener('click', function () {
      deleteJs(i);
    });
}

document.querySelector('#submit').addEventListener('click', submitJs);
