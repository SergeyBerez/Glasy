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
  bntcarts[i].addEventListener('click', showCount);
}

let cartArr = {};
let i = 1;

function showCount() {
  console.log(this);
  this.innerText = i;
  cartArr.count = i;
  i = i + 1;
  console.log(cartArr);
}

