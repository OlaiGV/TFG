// import contenido de cabecera
import { cabeceraMenu } from "../parciales/cabeceraMenuLogin.js";
import { testimony } from "../../public/parciales/contenidoIndex.js";

window.onload = function () {
  // Colocamos cabecera y menú en el DOM
  let main = document.querySelector("main");
  let header = document.createElement("header");
  header.innerHTML = cabeceraMenu;
  main.before(header);

  let testimonyContainer = document.querySelector(".testimony");
  testimonyContainer.innerHTML = testimony;

  const slider = document.querySelector(".slider");
  const items = document.querySelectorAll(".item");
  const btns = document.querySelectorAll(".btnTestimony");

  function reset() {
    for (let i = 0; i < items.length; i++) {
      btns[i].classList.remove("expand");
      items[i].classList.remove("animation");
    }
  }

  function animate(i) {
    btns[i].classList.add("expand");
    items[i].classList.add("animation");
  }

  function scrollTo(i) {
    slider.style.transform = `translateX(${-i * slider.offsetWidth}px)`;
    reset();
    animate(i);
  }

  const activate = (e) =>
    e.target.matches(".btnTestimony") && scrollTo(e.target.dataset.index);

  const init = () => animate(0);

  init();
  window.addEventListener("click", activate, false);
};
