var btn = document.getElementById("login");

function comprobarCampo() {
  var pwd = document.getElementById("password").value.trim();
  var email = document.getElementById("email").value.trim();
  if (pwd === "" || email === "") {
    document.getElementById("alerta").style.display = "block";
    esconderAlert();
  } else {
    localStorage.setItem('email', email)
    location.href = "cover.html";
  }
}

function esconderAlert() {
  $("#alerta").delay(1500).hide(300);
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.

  if (
    profile.getId() != "" &&
    profile.getName() != "" &&
    profile.getImageUrl() != "" &&
    profile.getEmail() != ""
  ) {
    localStorage.setItem('email', profile.getEmail())
    location.href = "cover.html";
  }
}
