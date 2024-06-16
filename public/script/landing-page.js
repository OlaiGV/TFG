import {
  header,
  about,
  knowledge,
  price,
  testimony,
} from "../../public/parciales/contenidoIndex.js";

window.onload = function () {
  let headerContainer = document.querySelector("header");
  headerContainer.innerHTML = header;

  let aboutContainer = document.querySelector(".about");
  aboutContainer.innerHTML = about;

  let knowledgeContainer = document.querySelector(".knowledge");
  knowledgeContainer.innerHTML = knowledge;

  let priceContainer = document.querySelector(".price");
  priceContainer.innerHTML = price;

  let loginButton = document.querySelector(".btn__login");

  // Agrega un evento de clic al botón
  loginButton.addEventListener("click", function () {
    // Si el usuario está logueado, haz logout
    if (sessionStorage.getItem("token")) {
      sessionStorage.removeItem("token");
      loginButton.textContent = "Login";
    } else {
      // Si el usuario no está logueado, redirige a la página de login
      window.location.href = "./login.html";
    }
  });
};
