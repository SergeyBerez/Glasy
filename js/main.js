let li = document.querySelector('.login-link');
let modal = document.querySelector('.modal.modal-login ');
li.addEventListener('click', function(e) {
  e.preventDefault();

  console.log(modal);
  if (modal.style.display == 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }
});

let contButton = document.querySelectorAll('.contacts-button');
let modalMap = document.querySelector('.modal-map');

contButton[0].onclick = function(e) {
  e.preventDefault();
  if (modalMap.style.display == 'block') {
    modalMap.style.display = 'none';
  } else {
    modalMap.style.display = 'block';
  }
};

let but = document.querySelectorAll('.modal-close');
for (let i = 0; i < but.length; i++) {
  but[i].addEventListener('click', function(e) {
    modal.style.display = 'none';
    modalMap.style.display = 'none';
  });
}

setInterval(function() {
  loginLight(li);
}, 1000);
function loginLight(elem) {
  if (elem.style.background == 'grey') {
    elem.style.background = 'black';
  } else {
    elem.style.background = 'grey';
    elem.style.borderRadius = '20px';
  }
}

console.log(11);