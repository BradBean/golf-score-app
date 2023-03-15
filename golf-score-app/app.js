window.onload = function() {


const firstButton = document.getElementById('find-courses-button');
const firstScreen = document.getElementById('first-screen');
const secondScreen = document.getElementById('second-screen');

firstButton.addEventListener('click', function() {
  firstScreen.style.opacity = 0;
  firstScreen.style.transition = 'opacity 0.5s ease-in-out';

  // Wait for fade-out to complete, then hide first screen and show second screen
  setTimeout(function() {
    firstScreen.style.display = 'none';
    secondScreen.style.display = 'block';
    secondScreen.style.opacity = 1;
    secondScreen.style.transition = 'opacity 0.5s ease-in-out';
  }, 500);
});
}
