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

btnFind.addEventListener('click', function (e) {
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
  document.forms[i].addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(document.forms);
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
          .post('telegram.php', obj)
          .then(response => {
            //let data = Object.values(response.data);
            console.log(response.data);
            document.forms[i].style.color = 'black';
            document.forms[i].innerHTML += `<p> <br>ваша заявка принята</p>`;
            deleteModalForm(document.forms[i]);
            document.forms[i].reset();
          })
          .catch(error => {
            console.log(error);

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
  setTimeout(function () {
    node.reset();
    node.lastElementChild.remove();
    modalLogin.classList.toggle('animate-modal-search');
  }, 3000);
}
// =====================axios reuqest

// -------------корзина показываем и скрываем ее
const btnUserCart = document.querySelector('.nav-user_cart');
const innerGoodsCart = document.querySelector('.inner-goods');
const cartDiv = document.querySelector('.cart-div');
const cartSum = document.querySelector('.cart-sum');
const btnOrder = document.querySelector('.button-order');

btnUserCart.addEventListener('click', function (e) {
  e.preventDefault();
  sum = 0;
  getGoods(renderCardBasket, sortCardBacket);
  cartDiv.classList.toggle('animate-modal-search');
});
cartDiv.addEventListener('click', function (e) {
  if (e.target.classList.contains('close-modalLogin--js')) {
    cartDiv.classList.toggle('animate-modal-search');
  }
  // document.addEventListener('keypress', function (e) {
  //   console.log(e.keyCode ===27);
  // });

  
});
let divform = document.querySelector('.new-form-header');
let copyDivForm = divform.cloneNode(true);
console.log(copyDivForm);

btnOrder.addEventListener('click', function (e) {
  btnOrder.insertAdjacentElement('beforebegin', copyDivForm);
});

//====================работаем с товаром  рисуем карты=============
let wrapGoods = document.querySelector('.wrap-goods');
let getGoodsbtn = document.querySelector('.button--header');
let goodsWrap = document.getElementsByClassName('goods-wrap');
const counterCart = document.querySelector('.counter');

const objGoods = {};
const arrGoods = [];

const loading = namefunction => {
  const spinner = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;

  if (namefunction == 'renderCard') {
    wrapGoods.innerHTML = spinner;
  }
  if (namefunction == 'renderCardBasket') {
    innerGoodsCart.innerHTML = spinner;
  }
};
//https://my-json-server.typicode.com/SergeyBerez/server/getGoods
function getGoods(callbackHadler, callbackFilter) {
  loading(callbackHadler.name);

  axios
    .get(
      'https://spreadsheets.google.com/feeds/list/1gbWOOoMzRCE3XwK7OM6HtOXFEnfv-Vq8hbQlpMnf1h4/od6/public/values?alt=json',
    )
    .then(response => response.data.feed.entry)
    .then(callbackFilter)
    .then(callbackHadler)
    .catch(error => console.log(error));
}
getGoods(renderCard, randomSort);
//  -------функция создаем карты динамически  и добавляем из в дом
function randomSort(arr) {
  return arr.sort((a, b) => a.gsx$id.$t - b.gsx$id.$t);
  //arr.sort(() => Math.random() - 0.5);
  // .sort((obja, objb) => obja.price - objb.price);
  //.filter(obj => obj.price > 20);

  //return arr.sort((a, b) => b.id - a.id);
}

function createCard(title, name, photo, price, id) {
  const div = document.createElement('div');
  div.className = 'goods';
  div.innerHTML = `
      <h2> ${title} </h2 >
      <p class="name"> ${name}</p>
      <img  class="goods-img" src="${photo}"  alt="">
        <p><span > ${price} грн</span></p>
        <i class="fa fa-shopping-cart cart-fa-icon fa-lg ${
          objGoods.hasOwnProperty(id) ? 'acive-fa-plus--js' : ''
        }" aria-hidden="true"  data-id ="${id}" ></i>
       
        <div>`;
  return div;
}

// функция добавление  карт goods на странице
function renderCard(arr) {
  wrapGoods.textContent = '';
  if (arr.length) {
    arr.forEach(({ title, gsx$name, gsx$photo, gsx$price, gsx$id }) => {
      wrapGoods.append(
        createCard(
          title.$t,
          gsx$name.$t,
          gsx$photo.$t,
          gsx$price.$t,
          gsx$id.$t,
        ),
      );
    });
  } else {
    wrapGoods.textContent = '❌ такого товара нет';
  }
}
//================ создаем товары в корзине
let sum = 0;
let servergoods = {};
const calcTotalPrice = goods => {
  for (let i = 0; i < goods.length; i++) {
    // console.log(goods[i]);
    // servergoods[i] = goods[i];
    // servergoods[i]['count'] = objGoods[goods[i].gsx$id.$t];
    let temp = {};
    sum += goods[i].gsx$price.$t * objGoods[goods[i].gsx$id.$t];
    temp.id = goods[i].gsx$id.$t;
    temp.count = objGoods[goods[i].gsx$id.$t];
    temp.price = goods[i].gsx$price.$t;
    servergoods[goods[i].gsx$id.$t] = temp;
  }

  console.log(servergoods);

  cartDiv.querySelector('.cart-sum').textContent = `:${sum} грн`;
};
function sortCardBacket(goods) {
  const basketGoods = goods
    .sort((a, b) => a.gsx$id.$t - b.gsx$id.$t)
    .filter(item => objGoods.hasOwnProperty(item.gsx$id.$t));

  calcTotalPrice(basketGoods);
  return basketGoods;
}

function createCardBasket(title, name, photo, price, id) {
  const div = document.createElement('div');
  div.className = 'inner-goods-cart';
  div.innerHTML = `
      <p> ${id} </p >
      <p class="name"> ${name}</p>
      <img  class="goods-img" src="${photo}"  alt="">
       <i class="fa fa-plus-circle cart-fa-icon"  data-id ="${id}"  data-price = "${price}" aria-hidden="true"></i>
       <i class="fa fa-minus-circle  cart-fa-icon"  data-id ="${id}" data-price = "${price}" aria-hidden="true"></i>
         <p><span > ${price} грн</span></p>*
             <span class ="show-count">${objGoods[id]}шт</span>=
         <span class ="show-res">${objGoods[id] * price} грн</span> `;
  return div;
}

function renderCardBasket(goods) {
  innerGoodsCart.textContent = '';

  if (goods.length) {
    goods.forEach(({ title, gsx$name, gsx$photo, gsx$price, gsx$id }) => {
      innerGoodsCart.append(
        createCardBasket(
          title.$t,
          gsx$name.$t,
          gsx$photo.$t,
          gsx$price.$t,
          gsx$id.$t,
        ),
      );
    });
  } else {
    cartDiv.querySelector('.cart-sum').textContent = '';
    innerGoodsCart.textContent = '❌ ваша корзина пуста';
  }
}

// обрабатываем событие нажатие кнопки показа товаров поиска товаров отрисовываем заново
getGoodsbtn.addEventListener('click', function (e) {
  console.log(1);
  wrapGoods.classList.toggle('show-cart');
  sum = 0;
  // getGoods(renderCard, randomSort);
});

// обрабатываем событие на кнопке поиска  инпута товаров находим совпадение и отрисовываем
let input = document.querySelector('.new-form_input');
let searchGoods = document.querySelector('.fa-search');
formSearch.addEventListener('click', function (e) {
  searchGoods.addEventListener('click', function (e) {
    let inputvalue = input.value.trim().toLowerCase();
    console.log(inputvalue);
    if (inputvalue != '') {
      const searchReg = new RegExp(inputvalue, 'i');
      console.log(searchReg);
      getGoods(renderCard, goods => {
        console.log(goods);
        return goods.filter(item => searchReg.test(item.gsx$name.$t));
      });
      wrapGoods.classList.add('show-cart'); //show goods after sort return true
    }
    input.value = '';
  });
});

//  add count to cart
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

  if (objGoods[id]) {
    objGoods[id] -= 1;
    e.target.classList.remove('acive-fa-plus--js');
    delete objGoods[id];
  } else {
    objGoods[id] = 1;
    e.target.classList.add('acive-fa-plus--js');
  }
  sum = 0;
  getGoods(renderCardBasket, sortCardBacket);
  chekCount();
  storageQuery();
};

//  функции подсчета товаров в корзите
function countSumInBacket(e) {
  sum = 0;
  getGoods(renderCardBasket, sortCardBacket);
}

function countPlusGoodsInBascket(e) {
  // console.log(e.target.dataset);
  let showRes = e.target.parentNode.querySelector('.show-res');
  let showCount = e.target.parentNode.querySelector('.show-count');
  let price = e.target.dataset.price;
  let id = e.target.dataset.id;

  if (objGoods[id]) {
    objGoods[id] += 1;
  } else {
    objGoods[id] = 1;
  }

  showCount.textContent = `${objGoods[id]}шт`;
  showRes.textContent = `${objGoods[id] * price}грн`;

  storageQuery();

  cartDiv.querySelector('.cart-sum').textContent = 'пересчитать';
}
function countMinusGoodsInBascket(e) {
  let showCount = e.target.parentNode.querySelector('.show-count');
  let showRes = e.target.parentNode.querySelector('.show-res');
  let id = e.target.dataset.id;
  let price = e.target.dataset.price;
  console.log(objGoods[id]);
  if (objGoods[id]) {
    objGoods[id] -= 1;
  }
  if (objGoods[id] == 0) {
    delete objGoods[id];
    sum = 0;
    getGoods(renderCard, randomSort);
    getGoods(renderCardBasket, sortCardBacket);
  }
  storageQuery();
  cartDiv.querySelector('.cart-sum').textContent = 'пересчитать';
  showCount.textContent = `${objGoods[id]}шт`;
  showRes.textContent = `${objGoods[id] * price}грн`;
}

// add goods to storage with arr and object
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
      Object.assign(objGoods, obj);
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
wrapGoods.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-shopping-cart')) {
    addGoodsToBasket(e);
  }
});

cartDiv.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-plus-circle')) {
    countPlusGoodsInBascket(e);
  }
  if (e.target.classList.contains('fa-minus-circle')) {
    countMinusGoodsInBascket(e);
  }

  if (e.target.classList.contains('cart-sum')) {
    countSumInBacket(e);
  }
});

// вызываем один раз фунцию для того что бы пролучить в массив товары из storage
storageQuery(true);
