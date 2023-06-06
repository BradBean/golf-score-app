window.onload = function() {
    const firstButton = document.getElementById('find-courses-button');
    const firstScreen = document.getElementById('first-screen');
    const secondScreen = document.getElementById('second-screen');
    const buttons = document.querySelectorAll('.course-selection-button');

    fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length >= 3) {
        document.getElementById("thanksgivingPoint").textContent = data[0].name;
        document.getElementById("americanFork").textContent = data[1].name;
        document.getElementById("spanishFork").textContent = data[2].name;
      } else {
        throw new Error("Invalid response from API");
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  
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
  