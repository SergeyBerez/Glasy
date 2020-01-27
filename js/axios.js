let btnFind = document.querySelector('.nav-user_a');
let btnEnter = document.querySelector('.nav-user_enter--js');
let modalFind = document.querySelector('.modal-find');
let modalLogin = document.querySelector('.modal-login');
let closeMmodalLogin = document.querySelector('.close-modalLogin--js');
let formSearch = document.querySelector('.form-header-search');

// меняем событие на модальных оканах показываем и скрываем

//---------- модальное окно поиска
const closeModalFind = e => {
  if (e.target.classList.contains('close-modalLogin--js') || e.keyCode == 27) {
    document.removeEventListener('keyup', closeModalFind);
    modalFind.classList.toggle('animate-modal-search');
  }
};

btnFind.addEventListener('click', function(e) {
  e.preventDefault();
  document.addEventListener('keyup', closeModalFind);
  modalFind.classList.toggle('animate-modal-search');
});

modalFind.addEventListener('click', closeModalFind);

// --------модальное окно регистрации
const openModalLogin = e => {
  e.preventDefault();
  modalLogin.classList.toggle('animate-modal-search');
};
const closeMofalLogin = e => {
  if (
    e.target.classList.contains('close-modalLogin--js') ||
    e.target.className == 'modal-login'
  ) {
    modalLogin.classList.toggle('animate-modal-search');
  }
};
btnEnter.addEventListener('click', openModalLogin);
modalLogin.addEventListener('click', closeMofalLogin);

//===================== работаем с формамами общая форма отправки данных

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
      //console.log(checkName.test(document.forms[i].elements[j].value));
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
          .post(
            'https://my-json-server.typicode.com/SergeyBerez/server/myPost',
            obj,
          )
          .then(response => {
            //let data = Object.values(response.data);
            console.log(response.data);
            document.forms[i].style.color = 'black';
            document.forms[i].innerHTML += `<p> <br>ваша заявка принята</p>`;
            deleteModalForm(document.forms[i]);
            document.forms[i].reset();
          })
          .catch(error => {
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
    modalLogin.classList.toggle('animate-modal-search');
  }, 3000);
}

//====================работаем с товаром  рисуем карты=============
let wrapGoods = document.querySelector('.wrap-goods');
let getGoodsbtn = document.querySelector('.button--header');
let goodsWrap = document.getElementsByClassName('goods-wrap');

const loading = () => {
  wrapGoods.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
};

function getGoods(callbackHadler, callbackFilter) {
  loading();
  axios
    .get('https://my-json-server.typicode.com/SergeyBerez/server/getGoods')
    .then(({ data }) => {
      console.log(data);
      return callbackFilter(data);
    })
    .then(data => callbackHadler(data))
    .catch(error => console.log(error));
}
getGoods(renderCard, randomSort);

function randomSort(arr) {
  return arr
    .sort((obja, objb) => obja.price - objb.price)
    .filter(obj => obj.price > 20);

  //.sort((a, b) => a.id - b.id);
  //return arr.sort((a, b) => b.id - a.id);
}
// функция создаем карты динамически  и добавляем из в дом
function createCart(title, name, photo, price, id) {
  const div = document.createElement('div');
  div.className = 'goods';
  div.innerHTML = `
      <h2> ${title} </h2 >
      <p class="name"> ${name}</p>
      <img  class="goods-img" src="${photo}"  alt="">
        <p><span > ${price} грн</span></p>
        <div> <span class ="show-res"></span>
        <i class="fa fa-shopping-cart cart-fa-icon fa-lg" aria-hidden="true"  data-id ="${id}";></i>
        <i class="fa fa-plus-circle cart-fa-icon" data-price = "${price}" aria-hidden="true"></i>
        <i class="fa fa-minus-circle cart-fa-icon" aria-hidden="true"></i>
        <div>`;
  return div;
}
// функция добавление  карт на странице
function renderCard(arr) {
  wrapGoods.textContent = '';
  if (arr.length) {
    arr.forEach(({ title, name, photo, price, id }) => {
      wrapGoods.append(createCart(title, name, photo, price, id));
    });
  } else {
    wrapGoods.textContent = '❌ такого товара нет';
  }
}
// обрабатываем событие нажатие кнопки показа товаров поиска товаров отрисовываем заново
getGoodsbtn.addEventListener('click', function(e) {
  wrapGoods.classList.toggle('show-cart');
  getGoods(renderCard, randomSort);
});

// обрабатываем событие на кнопке поиска  инпута товаров находим совпадение и отрисовываем
let input = document.querySelector('.new-form_input');
let searchGoods = document.querySelector('.fa-search');
formSearch.addEventListener('click', function(e) {
  searchGoods.addEventListener('click', function(e) {
    let inputvalue = input.value.trim().toLowerCase();
    console.log(inputvalue);
    if (inputvalue != '') {
      const searchReg = new RegExp(inputvalue, 'i');
      getGoods(renderCard, goods =>
        goods.filter(item => searchReg.test(item.name)),
      );
      wrapGoods.classList.add('show-cart'); //show goods after sort return true
    }
    input.value = '';
  });
});
const counterCart = document.querySelector('.counter');
const objGoods = {};
const arrGoods = [];
console.log(counterCart);
const chekCount = () => {
  if (arrGoods.length > 0) {
    counterCart.innerText = arrGoods.length;
    counterCart.style.paddingLeft = '5px';
  } else {
    counterCart.innerText = 'пусто';
  }

  //console.log(Object.keys(objGoods).length);
};
const wishList = e => {
  let id = e.target.dataset.price;

  const spanRes = e.target.parentNode.querySelector('.show-res');
  if (objGoods[id] == undefined) {
    objGoods[id] = 1;
    spanRes.innerText = `итого: ${objGoods[id]}*${id}грн = ${objGoods[id] *
      id}грн `;
  } else {
    objGoods[id]++;
    spanRes.innerText = `итого: ${objGoods[id]}*${id}грн = ${objGoods[id] *
      id}грн `;
  }
  // chekCount();
};

const addToCart = e => {
  let id = e.target.dataset.id;
  // console.log(e.target.previousElementSibling);
  if (arrGoods.includes(id)) {
    e.target.classList.remove('acive-fa-plus--js');
    arrGoods.splice(arrGoods.indexOf(id), 1);
  } else {
    arrGoods.push(id);
    e.target.classList.add('acive-fa-plus--js');
  }
  chekCount();
  console.log(arrGoods);
};
//======= наша общая функция добавления товара пара обработчиков
wrapGoods.addEventListener('click', function(e) {
  if (e.target.classList.contains('fa-shopping-cart')) {
    addToCart(e);
  }
  if (e.target.classList.contains('fa-plus-circle')) {
    wishList(e);
  }
});
