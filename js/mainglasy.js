let slider = document.querySelector('.slides');
let arrImg = [
  'url(/img/Group1aaa.png)',
  'url(/img/Group2bbb.png)',
  'url(/img/Group3ddd.png)',
];
let radio = document.querySelectorAll('[type="radio"]');

for (let i = 0; i < radio.length; i++) {
  radio[i].addEventListener('click', function(e) {
    console.log(this.dataset.type);
    if (e.target.dataset.type) {
      slider.style.backgroundImage = `url(../img/${e.target.dataset.type})`;
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
