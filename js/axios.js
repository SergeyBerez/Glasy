let find = document.querySelector('.nav-user_find');
let enter = document.querySelector('.nav-user_enter--js');
let modalFind = document.querySelector('.modal-find');
let modalLogin = document.querySelector('.modal-login');

// меняем событие на модальных оканах показываем и скрываем
document.addEventListener('click', function(e) {
  if (!(e.target.tagName == 'INPUT' || e.target.tagName == 'FORM')) {
    modalFind.style.display = 'none';
  }
  if (e.target.classList.contains('nav-user_find--js')) {
    if (modalFind.style.display == 'none') {
      modalFind.style.display = 'block';
    }
  }
});
document.addEventListener('click', function(e) {
  console.log(e.target);
  // if (
  //   !(
  //     e.target.tagName == 'INPUT' ||
  //     e.target.tagName == 'FORM' ||
  //     e.target.tagName == 'BUTTON'
  //   )
  // ) {
  //   modalLogin.style.display = 'none';
  // }
  let eTargetLink = e.target.classList.contains('nav-user_enter--js');
  let svgIcon = document.querySelectorAll('.nav-user_img');
  console.log(eTargetLink);
  if (eTargetLink) {
    if (modalLogin.style.display == 'block') {
      modalLogin.style.display = 'none';
      enter.style.backgroundImage = '';
      enter.style.backgroundPosition = '';
      enter.style.backgroundSize = '';
      svgIcon[1].style.opacity = 1;
      enter.style.backgroundImage = 'url(./img/for_curt.png)';
    } else {
      modalLogin.style.display = 'block';
      enter.style.backgroundImage = 'url(./img/close_but.png)';

      enter.style.backgroundRepeat = 'no-repeat';
      enter.style.backgroundPosition = '20%,50%';
      enter.style.backgroundSize = '20px';
      svgIcon[1].style.opacity = 0;
    }
  }
});

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
        //document.forms[i].elements[j].classList.remove('error');
        axios
          .post(
            'https://my-json-server.typicode.com/SergeyBerez/server/myPost',
            obj,
          )
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
            console.log(error);
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
