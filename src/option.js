// 共通
// localStorageのJSが格納されたkey情報
const localStorageJsListKey = 'jsList';

// localStorageに保存されているJS情報リストを取得する
function findJsListItem() {
  let localStorageItem = localStorage.getItem(localStorageJsListKey);
  return localStorageItem === null ? [] : JSON.parse(localStorageItem);
}

// JS情報リストを格納する
function saveJsListItem(data) {
  localStorage.setItem(localStorageJsListKey, JSON.stringify(data));
}

// ID属性
const submitId = 'submit';
const registerList = 'registerList';
const modalList = 'modalList';

function getJsListId(index) {
  return "dataTarget" + index;
}

function getJsListTitleId(index) {
  return getJsListId(index) + "title";
}

function getJsListJsId(index) {
  return getJsListId(index) + "js";
}

function getJsListUpdateId(index) {
  return getJsListId(index) + "update";
}

function getJsListDeleteId(index) {
  return getJsListId(index) + "delete";
}

/**
 * 登録済みJSタイトルの列となるHTMLを作成する
 *
 * @param index index番号
 * @param title タイトル
 * @returns {string} 登録済みJSタイトルの列
 */
function createTitleListHtml(index, title) {
  return '<tr>' +
    '<th scope="row" data-toggle="modal" data-target="#' + getJsListId(index) + '">' + title + '</th>' +
    '</tr>';
}

/**
 * JS編集用のモーダル用のHTMLを作成する
 *
 * @param index index番号
 * @param title 修正後のタイトル
 * @param js 修正後のjavascript
 * @returns {string} JS編集用のモーダル
 */
function createUpdateMordalHtml(index, title, js) {
  return '<div class="modal fade" id="' + getJsListId(index) + '" tabindex="-1" role="dialog" aria-labelledby="label1" aria-hidden="true">' +
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
    '<input class="form-control" id=' + getJsListTitleId(index) + ' name="title" value="' + title + '"/>' +
    '<label>JavaScript</label>' +
    '<textarea class="form-control" id=' + getJsListJsId(index) + ' name="js" rows="3">' + js + '</textarea>' +
    '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-danger" id=' + getJsListDeleteId(index) + ' data-dismiss="modal">削除</button>' +
    '<button type="button" class="btn btn-primary" id=' + getJsListUpdateId(index) + '>更新</button>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>'
}


/**
 * JSを登録する
 */
function submitJs() {
  let data = findJsListItem();

  let jsValue = $('textarea[name="js"]').val();
  let titleValue = $('input[name="title"]').val();

  data.push({js: jsValue, title: titleValue});
  saveJsListItem(data);
  location.reload();
}

/**
 * JSを更新する
 *
 * @param index 更新対象のJSのindex番号
 */
function updateJs(index) {
  let updatedTitle = $("#" + getJsListTitleId(index))[0].value;
  const updatedJs = $("#" + getJsListJsId(index))[0].value;

  let data = findJsListItem();
  data[index].js = updatedJs;
  data[index].title = updatedTitle;

  saveJsListItem(data);
  location.reload();
}

/**
 * JSを削除する
 * @param index 削除対象JSのindex番号
 *
 * localStorage以外の更新処理はどうするかは要検討
 */
function deleteJs(index) {
  let data = findJsListItem();
  data.splice(index, 1);

  saveJsListItem(data);
  location.reload();
}

/**
 * 画面初期表示時、localStorage情報から登録済みjavascript情報を取得する
 */
let data = findJsListItem();
for (let i = 0; i < data.length; i++) {
  let title = data[i]["title"];
  const js = data[i]["js"];
  const dataTarget = getJsListId(i);

  $('#' + registerList).append(createTitleListHtml(i, title));
  $('#' + modalList).append(createUpdateMordalHtml(i, title, js));

  document.querySelector('#' + getJsListUpdateId(i))
    .addEventListener('click', function () {
      updateJs(i);
    });
  document.querySelector('#' + getJsListDeleteId(i))
    .addEventListener('click', function () {
      deleteJs(i);
    });
}

document.querySelector('#' + submitId).addEventListener('click', submitJs);
