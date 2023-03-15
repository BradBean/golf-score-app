window.onload = function() {
    const firstButton = document.getElementById('find-courses-button');
    const firstScreen = document.getElementById('first-screen');
    const secondScreen = document.getElementById('second-screen');
    const buttons = document.querySelectorAll('.course-selection-button');
  
    function fadeOut(element) {
      element.style.opacity = 0;
      element.style.transition = 'opacity 0.5s ease-in-out';
    }
  
    function showScreen(screen) {
      screen.style.display = 'block';
      screen.style.opacity = 1;
      screen.style.transition = 'opacity 0.5s ease-in-out';
    }
  
    function redirectTo(url) {
      window.location.href = url;
    }
  
    firstButton.addEventListener('click', function() {
      fadeOut(firstScreen);
      setTimeout(function() {
        firstScreen.style.display = 'none';
        showScreen(secondScreen);
      }, 500);
    });
  
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        fadeOut(secondScreen);
        setTimeout(function() {
          redirectTo(button.dataset.url);
        }, 500);
      });
    });
  
  }
  