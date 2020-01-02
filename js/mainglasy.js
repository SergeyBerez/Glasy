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
function changebackground() {
  let arrImg = [
    'url(./img/Group1aaa.png)',
    'url(./img/Group2bbb.png)',
    'url(./img/Group3ddd.png)',
  ];
  let arrColor = ['#849d8f', '#8996a6', '#9d8b84'];
  let i = 0;
  setInterval(function() {
    console.log(radio[i].dataset.type);
    slider.style.backgroundImage = arrImg[i];
    slider.style.backgroundColor = arrColor[i];
    radio[i].checked = true;
    i++;
    if (i >= arrImg.length) {
      i = 0;
    }

    // for (let i = 0; i < radio.length; i++) {
    //   console.log(radio[i].dataset.type);
    // }
    // slider.style.backgroundColor = e.target.dataset.color;
  }, 2500);
}
changebackground();
