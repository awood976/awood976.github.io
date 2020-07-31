function mobileWindow() {
  myWindow = window.open("https://awood976.github.io/index.html","","width=550,height=800");
}

function toggleRainEffect(elem) {
  var element = document.getElementById(elem);
  if(element.classList.contains("motion-scroll")) {
    element.classList.remove("motion-scroll");
  } else {
    element.classList.add("motion-scroll");
  }
}
