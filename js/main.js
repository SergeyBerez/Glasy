'use strict';
let slider = document.querySelector('.slides');
let nav = document.querySelector('.fixed');
let inputs = document.querySelectorAll('.indication-input');
let logo = document.querySelector('.main-logo');
// let shrink = document.querySelector('.navbar-shrink');
// console.log(shrink);
// -----------меняем при нажатии цвет и картинки на радио кнопки
let radio = document.querySelectorAll('[type="radio"]');
for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener('click', function(e) {
    clearTimeout(autoPlay);
    // console.log(radio[i].checked);
    if (e.target.dataset.type) {
      slider.style.backgroundImage = `url(./img/${e.target.dataset.type})`;
      // slider.style.backgroundColor = e.target.dataset.color;
    }
  });
}
// ----------меняем фон и картинки  делаем переключение авто
let j = 0;

function autoChangebackground() {
  let arrImg = [
    'url(./img/Group1aaa.png)',
    'url(./img/Group2bbb.png)',
    'url(./img/Group3ddd.png)',
  ];
  // let arrColor = ['#849d8f', '#8996a6', '#9d8b84'];
  slider.style.backgroundImage = arrImg[j];

  // slider.style.backgroundColor = arrColor[j];
  radio[j].checked = true;
  j++;
  if (j >= arrImg.length) {
    j = 0;
  }
}

let autoPlay = setTimeout(function auto() {
  autoChangebackground();
  autoPlay = setTimeout(auto, 3000);
}, 2000);

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

// -------------корзина показываем и скрываем ее
let btnUserCart = document.querySelector('.nav-user_cart');
let innetGoods = document.querySelector('.innerGoods');

let cartDiv = document.querySelector('.cart-div');
btnUserCart.addEventListener('click', function(e) {
  e.preventDefault();
  cartDiv.classList.toggle('animate-modal-search');
});
cartDiv.addEventListener('click', function(e) {
  if (e.target.classList.contains('close-modalLogin--js')) {
    cartDiv.classList.toggle('animate-modal-search');
  }
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
  }
  showCart();
}

function showCart() {
  console.log(1);
  let out = '';
  for (const key in cart) {
    out += `<p>${key}-${cart[key]}</p> `;
  }

  innetGoods.innerHTML = out;
}

//перебираем ноде лист как массив
let [...products] = document.querySelectorAll('.banner-foto_item');
//let arrProducts = [...products];

for (let i = 0; i < products.length; i++) {
  products[i].dataset.id = i + 100;
  //добавляем айди дивам-товарам
}

// -----------подвешиваем событие на прокрутку окна анимацию на h1
// const h1 = document.querySelector('.header-title');
// const indicationButton = document.querySelector('.indication-button');
const footer = document.querySelector('.footer');
window.addEventListener('scroll', function(e) {
  if (window.pageYOffset > 2600) {
    footer.classList.add('animaton-footer');
  }
});

function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
    left: box.left + window.pageXOffset,
  };
}
//console.log(getCoords(indicationButton));

const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshod: 0,
  rootMargin: '0px 0px -200px 0px',
};
const drowElemetnts = (entries, appearOnScroll) => {
  entries.forEach(entry => {
    // console.log(entry.isIntersecting);
    //console.log(entry);
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  });
};
const appearOnScroll = new IntersectionObserver(drowElemetnts, appearOptions);
faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// let btnSearch = document.querySelector('.fa-search');

document.addEventListener('scroll', function(e) {
  if (window.pageYOffset > 70) {
    nav.classList.add('navbar-shrink');
  } else {
    nav.classList.remove('navbar-shrink');
  }
});
document.querySelectorAll('a').forEach(element => {
  element.onclick = function(e) {
    e.preventDefault();
  };
});

function changeColorMenu() {
  for (let i = 0; i < inputs.length; i++) {
    const element = inputs[0].dataset.color;
    nav.style.backgroundColor = element;
    console.log(element);
  }
}
function delchangeColorMenu() {
  nav.style.backgroundColor = '';
}

$('.main-logo-svg').click(function(e) {
  let offset = $('.header').offset().top;
  $('html, body').animate({ scrollTop: offset }, 2000);
});
