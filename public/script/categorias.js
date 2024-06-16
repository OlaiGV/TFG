// import contenido de cabecera
import { cabeceraMenu } from "../parciales/cabeceraMenuLogin.js";

window.onload = function () {
  // Colocamos cabecera y menú en el DOM
  let main = document.querySelector("main");
  let header = document.createElement("header");
  header.innerHTML = cabeceraMenu;
  main.before(header);

  // Método que carga las categorías existentes
  async function getCategorias() {
    try {
      const response = await fetch("http://localhost:8080/categoria/buscar", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });

      if (response.status === 403) {
        // Si el servidor devuelve un error 403, redirige al usuario a la página de inicio de sesión
        window.location.href = "../views/login.html";
        return;
      }

      if (!response.ok) {
        console.error(
          "Error en la respuesta del servidor:",
          response.status,
          response.statusText
        );
        return; // Si la respuesta no es exitosa, termina la función aquí
      }

      const categorias = await response.json(); // Analiza la respuesta como JSON
      console.log("Categorías:", categorias);

      ponCategorias(categorias);

      // Asignar el evento de clic a todas las cartas
      const cartas = document.querySelectorAll(".front");
      cartas.forEach((carta) => {
        carta.addEventListener("click", getCursos);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Llamada a la función que extrae las categorías de la base de datos
  getCategorias();

  // Función que pinta las categorías extraídas de la base de datos
  function ponCategorias(categorias) {
    let articleCursos = document.querySelector(".categorias");
    let main = document.querySelector("main");

    // Eliminamos contenido de main para colocar las fichas
    main.innerHTML = "";
    main.style.filter = "none";
    // Contenido HTML fichas de categorías
    let htmlString = "";

    for (let categoria of categorias) {
      htmlString += `
      <div class="carta" data-idcategoria= "${categoria.idcategoria}">
        <div 
          class="front" 
          style="
            background-image: url(../public/imagenes/categorias/${categoria.imgCategoria});
            background-repeat: no-repeat;
            background-size: cover;
        ">
          <h1>${categoria.nombre}</h1>
        </div>
      </div>
    `;
    }
    articleCursos.innerHTML = htmlString;
    main.append(articleCursos);
  }

  // Función para recuperar los cursos tras clicar sobre una categoría
  async function getCursos(event) {
    // Obtener el elemento HTML al que se le hizo clic
    console.log("Elemento HTML al que se hizo clic:", event.target.parentNode);

    // Obtener el ID de la categoría desde el elemento HTML
    let idCategoria = event.target.parentNode.getAttribute("data-idcategoria");

    console.log(idCategoria);

    // Construir la URL con el ID de la categoría
    const urlCursosPorCategoria = `/curso/buscar/categoria/${idCategoria}`;

    try {
      // Realizar una solicitud para obtener los cursos asociados a la categoría
      const response = await fetch(
        `http://localhost:8080${urlCursosPorCategoria}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        console.error(
          "Error al obtener los cursos:",
          response.status,
          response.statusText
        );
        return;
      }

      const cursos = await response.json(); // Analizar la respuesta como JSON
      // window.location.href = "cursos.html";
      ponCursos(cursos);
      console.log("Cursos asociados a la categoría:", cursos);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Función que pinta las categorías extraídas de la base de datos
  function ponCursos(cursos) {
    let articleCursos = document.querySelector(".categorias");
    let main = document.querySelector("main");

    // Eliminamos contenido de main para colocar las fichas
    articleCursos.innerHTML = "";
    main.style.filter = "none";
    // Contenido HTML fichas de categorías
    let htmlString = "";
    console.log(cursos);

    for (let curso of cursos) {
      htmlString += `
      <div class="carta" onclick="rotarFicha(event)">
        <div class="back">
          <h1>${curso.autor}</h1>
          <p>${curso.descripcion}</p>
          <div class="link">
            <a href="curso.html?id=${curso.idcurso}">Details</a>
          </div>
        </div>
        <div 
          class="front" 
          style="
            background-image: url(../public/imagenes/cursos/${curso.imgCurso});
            background-repeat: no-repeat;
            background-size: cover;
        ">
          <h1>${curso.nombre}</h1>
        </div>
      </div>
    `;
    }

    articleCursos.innerHTML = htmlString;
    main.append(articleCursos);
  }
};
