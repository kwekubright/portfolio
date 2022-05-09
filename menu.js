let hamburgerMenu = document.querySelector('.mobile-nav-icon');

hamburgerMenu.addEventListener('click', function () {
  //show the mobile menu
  document.querySelector('.mobile-menu').style.display = 'flex';
});

let mobileClose = document.querySelector('.mobile-menu-close');

mobileClose.addEventListener('click', function () {
  //show the mobile menu
  document.querySelector('.mobile-menu').style.display = 'none';
});

//close menu on click mobile-nav-item
let mobileNavItems = document.querySelectorAll('.mobile-nav-item');
mobileNavItems.forEach(function (item) {
  item.addEventListener('click', function () {
    document.querySelector('.mobile-menu').style.display = 'none';
  });
});
