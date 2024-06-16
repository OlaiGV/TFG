window.onload = function () {
  let paneles = document.querySelectorAll(".panel img");
  let btnVolver = document.querySelector(".ui-btn span");

  btnVolver.addEventListener("click", function () {
    // Elimina la información del usuario del almacenamiento local
    sessionStorage.removeItem("token");
    window.location.href = `../login.html`;
  });

  for (const panel of paneles) {
    panel.addEventListener("click", redirigir);
  }

  function redirigir(even) {
    let tipo = even.target.alt.toLowerCase(); // Obtiene el valor del atributo 'alt' de la imagen

    window.location.href = `./datos.html?valor=${tipo}`;
  }
};
