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
const counterCart = document.querySelector('.counter');
const innerGoodsCart = document.querySelector('.innerGoods');
let objGoods = {};
const arrGoods = [];

const loading = () => {
  wrapGoods.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
};

function getGoods(callbackHadler, callbackFilter) {
  loading();
  axios
    .get('https://my-json-server.typicode.com/SergeyBerez/server/getGoods')
    .then(({ data }) => callbackFilter(data))
    .then(data => callbackHadler(data))
    .catch(error => console.log(error));
}
getGoods(renderCard, randomSort);

function randomSort(arr) {
  return arr.sort(() => Math.random() - 0.5);
  // .sort((obja, objb) => obja.price - objb.price);
  //.filter(obj => obj.price > 20);
  //.sort((a, b) => a.id - b.id);
  //return arr.sort((a, b) => b.id - a.id);
}
// функция создаем карты динамически  и добавляем из в дом
function createCard(title, name, photo, price, id) {
 
  const div = document.createElement('div');
  div.className = 'goods';
  div.innerHTML = `
      <h2> ${title} </h2 >
      <p class="name"> ${name}</p>
      <img  class="goods-img" src="${photo}"  alt="">
        <p><span > ${price} грн</span></p>
        <div class ="goods-price"> <span class ="show-res"></span>
        <i class="fa fa-shopping-cart cart-fa-icon fa-lg ${
          objGoods.hasOwnProperty(id) ? 'acive-fa-plus--js' : ''
        }" aria-hidden="true"  data-id ="${id}" ></i>
        <i class="fa fa-plus-circle cart-fa-icon" data-price = "${price}" aria-hidden="true"></i>
        <i class="fa fa-minus-circle cart-fa-icon" aria-hidden="true"></i>
        <div>`;
  return div;
}

// функция добавление  карт goods на странице
function renderCard(arr) {
  wrapGoods.textContent = '';
  if (arr.length) {
    arr.forEach(({ title, name, photo, price, id }) => {
      wrapGoods.append(createCard(title, name, photo, price, id));
    });
  } else {
    wrapGoods.textContent = '❌ такого товара нет';
  }
}
// создаем товары в корзине

function createCardBasket(title, name, photo, price, id) {
  // console.log(id);
  // console.log(arrGoods.indexOf(id));
  // console.log(id);
  const div = document.createElement('div');
  div.className = 'goods';
  div.innerHTML = `
      <h2> ${title} </h2 >
      <p class="name"> ${name}</p>
      <img  class="goods-img" src="${photo}"  alt="">
        <p><span > ${price} грн</span></p>
        <div class ="goods-price"> <span class ="show-res"></span>
        <i class="fa fa-shopping-cart cart-fa-icon fa-lg ${
          objGoods.hasOwnProperty(id) ? 'acive-fa-plus--js' : ''
        }" aria-hidden="true"  data-id ="${id}" ></i>
        <i class="fa fa-plus-circle cart-fa-icon" data-price = "${price}" aria-hidden="true"></i>
        <i class="fa fa-minus-circle cart-fa-icon" aria-hidden="true"></i>
        <div>`;
  return div;
}

function renderCardBasket(arr) {
  cartDiv.textContent = '';
  if (arr.length) {
    arr.forEach(({ title, name, photo, price, id }) => {
      cartDiv.append(createCardBasket(title, name, photo, price, id));
    });
  } else {
    cartDiv.textContent = '❌ ваша корзина пуста';
  }
}

const addCartBasket = () => {};

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
      wrapGoods.classList.toggle('show-cart'); //show goods after sort return true
    }
    input.value = '';
  });
});

//  tag span with counter in cart
const chekCount = () => {
  if (arrGoods.length > 0) {
    counterCart.innerText = arrGoods.length;
    counterCart.style.paddingLeft = '5px';
    counterCart.style.color = 'red';
  } else {
    counterCart.innerText = 'пусто';
    counterCart.style.color = '';
  }

  if (Object.keys(objGoods).length > 0) {
    counterCart.innerText = Object.keys(objGoods).length;
    counterCart.style.paddingLeft = '5px';
    counterCart.style.color = 'red';
  } else {
    counterCart.innerText = 'пусто';
    counterCart.style.color = '';
  }
};
const addGoodsToBasket = e => {
  let id = e.target.dataset.id;
  const innerGoodsCart = document.querySelector('.innerGoods');
  if (objGoods[id]) {
    objGoods[id] += 1;
  } else {
    objGoods[id] = 1;
    e.target.classList.add('acive-fa-plus--js');
  }
  chekCount();
  storageQuery();

  // if (objGoods[id] == undefined) {
  //   objGoods[id] = 1;
  //    e.target.classList.add('acive-fa-plus--js');
  //   innerGoodsCart.innerText = `итого: ${objGoods[id]}*${id}грн = ${objGoods[
  //     id
  //   ] * id}грн `;
  // } else {

  //   objGoods[id]++;
  //   innerGoodsCart.innerText = `итого: ${objGoods[id]}*${id}грн = ${objGoods[
  //     id
  //   ] * id}грн `;
  // }

  // showGoodsinCart();
  // chekCount();
};
const storageQuery = get => {
  if (get) {
    if (localStorage.getItem('goods')) {
      arrGoods.push(...JSON.parse(localStorage.getItem('goods')));
    }
  } else {
    localStorage.setItem('goods', JSON.stringify(arrGoods));
  }
  if (get) {
    if (localStorage.getItem('goods-obj')) {
      let obj = JSON.parse(localStorage.getItem('goods-obj'));
      objGoods = Object.assign(objGoods, obj);
      // console.log(objGoods);
    }
  } else {
    localStorage.setItem('goods-obj', JSON.stringify(objGoods));
  }
  chekCount();
};

// const addGoodsToArr = e => {
//   let id = +e.target.dataset.id;

//   if (arrGoods.includes(id)) {
//     // e.target.classList.remove('acive-fa-plus--js');
//     arrGoods.splice(arrGoods.indexOf(id), 1);
//   } else {
//     arrGoods.push(id);
//     e.target.classList.add('acive-fa-plus--js');
//   }

//   chekCount();
//   storageQuery();
// };

// const showGoodsinCart = e => {
//   let out = '';
//   for (const key in objGoods) {
//     out += `<p>${key}:${objGoods[key]}</p>
//    <br>`;
//   }
//   innerGoodsCart.innerHTML = out;
//   console.log(objGoods);
//   console.log(out);
// };

//======= наша общая функция добавления товара пара обработчиков
wrapGoods.addEventListener('click', function(e) {
  if (e.target.classList.contains('fa-shopping-cart')) {
    // addGoodsToArr(e);
    addGoodsToBasket(e);
  }
  // if (e.target.classList.contains('fa-plus-circle')) {
  //   addGoodsToBasket(e);
  // }
});
// вызываем один раз фунцию для того что бы пролучить в массив товары из storage
storageQuery(true);
