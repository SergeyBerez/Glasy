let slider = document.querySelector('.slides');

// -----------меняем при нажатии цвет и картинки на радио кнопки
let radio = document.querySelectorAll('[type="radio"]');
for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener('click', function(e) {
    console.log(e.target.dataset.color);
    if (e.target.dataset.type) {
      slider.style.backgroundImage = `url(./img/${e.target.dataset.type})`;
      slider.style.backgroundColor = e.target.dataset.color;
    }
  });
}
// ----------меняем фон и картинки  делаем переключение авто
let j = 0;
function changebackground() {
  let arrImg = [
    'url(./img/Group1aaa.png)',
    'url(./img/Group2bbb.png)',
    'url(./img/Group3ddd.png)',
  ];
  let arrColor = ['#849d8f', '#8996a6', '#9d8b84'];
  slider.style.backgroundImage = arrImg[j];
  slider.style.backgroundColor = arrColor[j];
  radio[j].checked = true;
  j++;
  if (j >= arrImg.length) {
    j = 0;
  }
}

setInterval(function() {
  changebackground();
}, 3000);
// -------------работем с меню скрытым
let headerMenuIcon = document.querySelector('.header_menu-icon');
let headerNav = document.querySelector('.header-nav');
let closemenu = document.querySelector('.close-menu-button--js');

headerMenuIcon.addEventListener('click', function(e) {
  this.style.opacity = '0';
  headerNav.style.display = 'flex';
  headerNav.style.left = '0px';
});
closemenu.addEventListener('click', function(e) {
  headerNav.style.left = '-580px';
  headerMenuIcon.style.opacity = '1';
});
window.addEventListener('resize', function(e) {
  headerNav.style.display = '';
  headerMenuIcon.style.display = '';
});

//----------работаем с товаром добавляем , кнокапи добавляем товар в козину
let bntcarts = document.querySelectorAll('.fa-cart-plus');
for (let i = 0; i < bntcarts.length; i++) {
  bntcarts[i].addEventListener('click', addtoCart);
}
let cart = {}; //корзина
//добавляем товар в обьект корзина
function addtoCart() {
  let id = this.closest('div').dataset.id;
  if (cart[id] == undefined) {
    cart[id] = 1; //если нет товара то ставим один
  } else {
    //cart[id] = cart[id] + 1;
    //cart[id]++;
    cart[id] += 1;
    showCart(this);
  }
}

function showCart(el) {
  let out = '';
  for (const key in cart) {
    out += `<p>${key}-${cart[key]}</p> `;
  }
  let cartProduct = document.querySelector('.banner-foto');
  let div = document.createElement('div');
  div.innerHTML += out;
  div.style.position = 'fixed';
  div.style.left = 0;
  div.style.top = '50%';

  cartProduct.insertAdjacentElement('afterbegin', div);
  console.log(div);
}

//перебираем ноде лист как массив
let products = document.querySelectorAll('.banner-foto_item');
let arrProducts = [...products];

for (let i = 0; i < arrProducts.length; i++) {
  arrProducts[i].dataset.id = i + 100;
  //добавляем айди дивам-товарам
}

// -------------корзина показываем и скрываем ее
let btnUserCart = document.querySelector('.nav-user_cart');
let cartDiv = document.querySelector('.cart-div');
btnUserCart.addEventListener('click', function(e) {
  if (cartDiv.style.display == 'flex') {
    cartDiv.style.display = 'none';
  } else {
    cartDiv.style.display = 'flex';
  }
});
cartDiv.addEventListener('click', function(e) {
  if (e.target.classList.contains('close-modalLogin--js')) {
    cartDiv.style.display = 'none';
  }
});
// -----------подвешиваем событие на прокрутку окна анимацию на h1
// const h1 = document.querySelector('.header-title');
// const indicationButton = document.querySelector('.indication-button');

// window.addEventListener('scroll', function(e) {
//   if (window.pageYOffset > 20) {
//     h1.classList.add('animaton-h1');
//   } else if (window.pageYOffset < 10) {
//     h1.classList.remove('animaton-h1');
//   }
//   if (window.pageYOffset > 20) {
//     indicationButton.classList.add('animaton-h1');
//   } else if (window.pageYOffset < 10) {
//     indicationButton.classList.remove('animaton-h1');
//   }

//   console.log(window.pageYOffset);
// });

function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}
//console.log(getCoords(indicationButton));

const faders = document.querySelectorAll('.fade-in');
console.log(faders);

const appearOptions = {
  threshod: 1,
  rootMargin: '0px 0px -400px 0px',
};
const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll,
) {
  entries.forEach(entry => {
    // console.log(entry.isIntersecting);
    console.log(entry);
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
