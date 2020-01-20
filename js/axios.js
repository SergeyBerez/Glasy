let btnFind = document.querySelector('.nav-user_a');
let btnEnter = document.querySelector('.nav-user_enter--js');
let modalFind = document.querySelector('.modal-find');
let modalLogin = document.querySelector('.modal-login');
let closeMmodalLogin = document.querySelector('.close-modalLogin--js');

// меняем событие на модальных оканах показываем и скрываем

document.addEventListener('click', function(e) {
  console.log(e.target);
  if (
    !(
      e.target.tagName == 'INPUT' ||
      e.target.tagName == 'FORM' ||
      e.target.classList.contains('fa-search')
    )
  ) {
    modalFind.style.display = 'none';
  }

  if (
    e.target.classList.contains('nav-user_find--js') ||
    e.target.classList.contains('nav-user_a')
  ) {
    modalFind.style.display = 'block';
  }
});
//  отбражаем наше модальное окно
// входа
const openModalLogin = e => {
  modalLogin.style.display = 'block';
};
const closeMofalLogin = e => {
  if (
    e.target.classList.contains('close-modalLogin--js') ||
    e.target.className == 'modal-login'
  ) {
    modalLogin.style.display = 'none';
  }
};
btnEnter.addEventListener('click', openModalLogin);
modalLogin.addEventListener('click', closeMofalLogin);

// общая форма отправки данных

for (let i = 0; i < document.forms.length; i++) {
  document.forms[i].addEventListener('submit', function(e) {
    e.preventDefault();

    let form = new FormData(this);
    let obj = {};
    for (let [name, value] of form) {
      obj[name] = value;
    }
    let count = document.forms[i].elements.length;
    let counter = 0;
    const checkName = /^[a-zA-Z0-9_]+$/;

    for (let j = 0; j < document.forms[i].elements.length; j++) {
      // console.log(checkName.test(document.forms[i].elements[j].value));
      if (
        document.forms[i].elements[j].value == '' &&
        document.forms[i].elements[j].tagName == 'INPUT'
      ) {
        document.forms[i].elements[j].classList.add('error');
        document.forms[i].elements[j].placeholder = 'заполните поле';
      } else {
        document.forms[i].elements[j].classList.remove('error');
        counter++;
      }

      if (counter == count) {
        // 'https://my-json-server.typicode.com/SergeyBerez/server/myPost'
        axios
          .post('../telegram.php', obj)
          .then(function(response) {
            //let data = Object.values(response.data);
            console.log(response.data);
            document.forms[i].style.color = 'black';
            document.forms[
              i
            ].innerHTML += `<p>${response.data['user_name']} <br>ваша заявка принята</p>`;
            deleteModalForm(document.forms[i]);
            document.forms[i].reset();
          })
          .catch(function(error) {
            //console.log(error);

            document.forms[
              i
            ].innerHTML += `<p><br>произошла ошибка сервер не отвечает</p>`;
            deleteModalForm(document.forms[i]);
            document.forms[i].reset();
          });
      }
    }
  });
}

function deleteModalForm(node) {
  setTimeout(function() {
    node.reset();
    node.lastElementChild.remove();
    modalLogin.style.display = 'none';
  }, 3000);
}

// рисуем карты
let wrap = document.querySelector('.wrap-goods');
let getGoodsbtn = document.querySelector('.button--header');
let goodsWrap = document.getElementsByClassName('goods-wrap');

function getGoods(callbackHadler, callbackFilter) {
  axios
    .get('../request/db.json')
    .then(({ data }) => callbackFilter(data))
    .then(data => callbackHadler(data));
}

function randomSort(arr) {
  let arrey = arr.filter(item => item.price > 10);
  return arrey.sort((a, b) => a.id - b.id);
  //return arr.sort((a, b) => b.id - a.id);
}
function createCart(title, name, photo, price) {
  const div = document.createElement('div');
  div.className = 'goods-wrap';
  div.innerHTML = `<div class="goods">
                <h2> ${title} </h2 >
                <p> ${name}</p>
               
                 <img  class="goods-img" src="${photo}"  alt="">
                  <p> ${price}</p><span>грн</span>
                </div>`;
  return div;
}

function renderCard(arr) {
  // wrap.textContent = '';
  arr.forEach(({ title, name, photo, price }) => {
    wrap.append(createCart(title, name, photo, price));
  });
}
getGoods(renderCard, randomSort);

getGoodsbtn.addEventListener('click', function(e) {
  wrap.classList.toggle('display');
  // if (wrap.style.display == 'flex') {
  //   wrap.style.height = '200px';
  // } else {
  //   wrap.style.opacity = 1;

  // }
});
//wrap.append(renderCard('aaa', 'sss', 'фото'));
