let slider = document.querySelector('.slides');

let radio = document.querySelectorAll('[type="radio"]');

for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener('click', function(e) {
    console.log(this.dataset.type);
    if (e.target.dataset.type) {
      slider.style.backgroundImage = `url(./img/${e.target.dataset.type})`;
      slider.style.backgroundColor = e.target.dataset.color;
    }
    // if (this.id == 'slide2') {
    //   slider.style.backgroundImage = arrImg[1];
    // }
    // if (this.id == 'slide3') {
    //   slider.style.backgroundImage = arrImg[2];
    // }
  });
}

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
  // setInterval(function() {
  //   console.log(radio[i].dataset.type);
  //   slider.style.backgroundImage = arrImg[i];
  //   slider.style.backgroundColor = arrColor[i];
  //   radio[i].checked = true;
  //   i++;
  //   if (i >= arrImg.length) {
  //     i = 0;
  //   }

  // }, 2500);
}

setInterval(function() {
  changebackground();
}, 3000);

let headerMenuIcon = document.querySelector('.header_menu-icon');
let headerNav = document.querySelector('.header-nav');
let closemenu = document.querySelector('.close-menu-button--js');

headerMenuIcon.addEventListener('click', function(e) {
  this.style.opacity = '0';
  headerNav.style.display = 'flex';
  headerNav.style.left = '0px';
});
closemenu.addEventListener('click', function(e) {
  headerNav.style.left = '-490px';
  headerMenuIcon.style.opacity = '1';
});
window.addEventListener('resize', function(e) {
  headerNav.style.display = '';
  headerMenuIcon.style.display = '';
});

// $('.header_menu-icon').click(function(e) {
//   $('.header-nav').fadeToggle(300);

//   if (headerNav.style.display == 'block') {
//     headerNav.style.display = '';
//   }
// });

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
let btnUserCart = document.querySelector('.nav-user_cart');
let cartDiv = document.querySelector('.cart-div');
btnUserCart.addEventListener('click', function(e) {
  console.log(1);
  cartDiv.classList.toggle('cart_display--js');
});
