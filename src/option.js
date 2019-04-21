function submitJs() {
  let localStorageItem = localStorage.getItem('jsList');
  let data = localStorageItem === null ? [] : JSON.parse(localStorageItem);

  let jsValue = $('textarea[name="js"]').val();
  let titleValue = $('input[name="title"]').val();

  data.push({js: jsValue, title: titleValue});
  localStorage.setItem('jsList', JSON.stringify(data));

  alert(data.valueOf());

  let result = JSON.parse(localStorage.getItem('jsList'));
  for (let i = 0; i < result.length; i++) {
    for (let key in result[i]) {
      console.log(result[i][key]);
    }
  }
}



document.querySelector('.submit').addEventListener('click', submitJs);
