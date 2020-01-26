let btnFind = document.querySelector('.nav-user_a');
let btnEnter = document.querySelector('.nav-user_enter--js');
let modalFind = document.querySelector('.modal-find');
let modalLogin = document.querySelector('.modal-login');
let closeMmodalLogin = document.querySelector('.close-modalLogin--js');
let formSearch = document.querySelector('.form-header-search');

// меняем событие на модальных оканах показываем и скрываем
modalFind.addEventListener('click', closeModalFind);
// function (e) {
//   if (e.target.classList.contains('close-modalLogin--js')) {
//     modalFind.classList.toggle('animate-modal-search');
//     document.removeEventListener('keyup', closeModalFind);
//   }

function closeModalFind(e) {
  if (e.target.classList.contains('close-modalLogin--js') || e.keyCode == 27) {
    modalFind.classList.toggle('animate-modal-search');
    document.removeEventListener('keyup', closeModalFind);
  }
}

btnFind.addEventListener('click', function(e) {
  e.preventDefault();
  document.addEventListener('keyup', closeModalFind);
  modalFind.classList.toggle('animate-modal-search');
  // if (modalFind.style.display == 'block') {
  //   modalFind.style.display = 'none';
  // } else {
  //   modalFind.style.display = 'block';
  //   modalFind.classList.add('animate-modal-search');
  // }
});
//  отбражаем наше модальное окно
// входа
const openModalLogin = e => {
  e.preventDefault();

  modalLogin.classList.toggle('animate-modal-search');
};
const closeMofalLogin = e => {
  // console.log(e.target);
  if (
    e.target.classList.contains('close-modalLogin--js') ||
    e.target.className == 'modal-login'
  ) {
    modalLogin.classList.toggle('animate-modal-search');
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
          .then(function(response) {
            //let data = Object.values(response.data);
            console.log(response.data);
            document.forms[i].style.color = 'black';
            document.forms[i].innerHTML += `<p> <br>ваша заявка принята</p>`;
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
    modalLogin.classList.toggle('animate-modal-search');
  }, 3000);
}

// рисуем карты
let wrap = document.querySelector('.wrap-goods');
let getGoodsbtn = document.querySelector('.button--header');
let goodsWrap = document.getElementsByClassName('goods-wrap');

const loading = () => {
  wrap.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
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

function randomSort(arr) {
  return arr
    .sort((obja, objb) => obja.price - objb.price)
    .filter(obj => obj.price > 20);

  //.sort((a, b) => a.id - b.id);
  //return arr.sort((a, b) => b.id - a.id);
}
function createCart(title, name, photo, price) {
  const div = document.createElement('div');
  div.className = 'goods-wrap';
  div.innerHTML = `<div class="goods">
      <h2> ${title} </h2 >
      <p class="name"> ${name}</p>
      <img  class="goods-img" src="${photo}"  alt="">
        <p><span> ${price} грн</span></p>
        <div>
        <i class="fa fa-shopping-cart cart-fa-icon" aria-hidden="true"></i>
        <i class="fa fa-plus-circle cart-fa-icon" aria-hidden="true"></i>
        <i class="fa fa-minus-circle cart-fa-icon" aria-hidden="true"></i>
        <div>
      </div>`;
  return div;
}

function renderCard(arr) {
  wrap.textContent = '';
  if (arr.length) {
    arr.forEach(({ title, name, photo, price }) => {
      wrap.append(createCart(title, name, photo, price));
    });
  } else {
    wrap.textContent = '❌ такого товара нет';
  }
}

getGoodsbtn.addEventListener('click', function(e) {
  wrap.classList.toggle('show-cart');
  getGoods(renderCard, randomSort);
});

formSearch.addEventListener('click', function(e) {
  let input = e.target.tagName == 'INPUT';

  if (input) {
    e.target.addEventListener('click', function(e) {
      let inputvalue = e.target.value.trim().toLowerCase();
      console.log(inputvalue);
      if (inputvalue != '') {
        const searchReg = new RegExp(inputvalue, 'i');
        getGoods(renderCard, goods =>
          goods.filter(item => searchReg.test(item.name)),
        );
        wrap.classList.toggle('show-cart');

        // for (let i = 0; i < goods.length; i++) {
        //   if (goods[i].innerText.indexOf(inputvalue) > -1) {
        //     console.log('block');
        //     goods[i].style.display = 'block';
        //   } else {
        //     goods[i].style.display = 'none';
        //   }
        // }
      }
      this.value = '';
    });
  }
});
