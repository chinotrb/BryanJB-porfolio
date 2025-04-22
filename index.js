const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

var modal = document.getElementById("myModal");

var closeButton = document.getElementsByClassName("close-btn")[0];

window.onload = function () {
  if (!localStorage.getItem('hasVisited')) {
    modal.style.display = "block";
    localStorage.setItem('hasVisited', 'true');
  }
}



document.getElementById('popupBtn').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior
  var popup = document.getElementById('popup');
  if (popup.style.display === 'none' || popup.style.display === '') {
      popup.style.display = 'block';
  } else {
      popup.style.display = 'none';
  }
});

document.getElementById('closePopup').addEventListener('click', function() {
  var popup = document.getElementById('popup');
  popup.style.display = 'none';
});