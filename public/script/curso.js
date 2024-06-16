// import contenido de cabecera
import { cabeceraMenu } from "../parciales/cabeceraMenuLogin.js";

window.onload = function () {
  // Colocamos cabecera y menú en el DOM
  let main = document.querySelector("main");
  let header = document.createElement("header");
  header.innerHTML = cabeceraMenu;
  main.before(header);

  pintarInfoCurso();

  async function pintarInfoCurso() {
    // Obtener el ID del curso y hacer la solicitud fetch
    let urlParams = new URLSearchParams(window.location.search);
    let cursoId = urlParams.get("id"); // Obtiene el ID del curso de la URL

    // Construir la URL con el ID de la categoría
    const urlLeccionCurso = `/leccion/buscar/${cursoId}`;

    try {
      // Realizar una solicitud para obtener las lecciones asociadas a un curso
      const response = await fetch(`http://localhost:8080${urlLeccionCurso}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        console.error(
          "Error en la respuesta del servidor:",
          response.status,
          response.statusText
        );
        return; // Si la respuesta no es exitosa, termina la función aquí
      }

      const leccionCurso = await response.json(); // Analiza la respuesta como JSON
      console.log("Lección del curso:", leccionCurso);

      ponContenido(leccionCurso);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function ponContenido(contenidos) {
    let articleContenido = document.querySelector(".contenido");
    let articleRecursosleccion = document.querySelector(".recursos__leccion");
    let articleAccionesUsu = document.querySelector(".acciones__usuario");
    let tituloH1 = document.createElement("h1");

    for (const contenido of contenidos) {
      tituloH1.textContent = contenido.tituloContenido;

      // Añadir el texto al contenedor de contenido
      let p = document.createElement("p");
      p.textContent = contenido.contenido;
      articleContenido.appendChild(p);

      // Añadir el video y la imagen al contenedor de recursos
      if (contenido.tipoRecurso == "video") {
        let video = document.createElement("video");
        video.src = `../public/imagenes/recursos_lecciones/${contenido.urlRecurso}`;
        video.autoplay = true;
        video.loop = true;
        articleRecursosleccion.appendChild(video);
      } else {
        let img = document.createElement("img");
        img.src = `../public/imagenes/recursos_lecciones/${contenido.urlRecurso}`;
        img.alt = "Imagen del recurso";
        articleRecursosleccion.appendChild(img);
      }
    }

    // Crear componentes para el article de acciones usuario
    let card = document.querySelector(".card");
    let form = document.querySelector(".form");

    card.innerHTML = `
      <span class="title">Deja un comentario</span>
      <form class="form__comment">
        <div class="group">
          <textarea
            placeholder="‎"
            id="comment"
            name="comment"
            rows="5"
            required=""
          ></textarea>
          <label for="comment">Comentario</label>
        </div>
        <button type="submit">Enviar</button>
      </form>
    `;

    form.innerHTML = `
      <input placeholder="👇" class="input" type="text" />
      <div class="btn">SUSCRIBETE</div>
    `;

    // Agregar eventos de escucha a los botones
    let btnEnviar = card.querySelector("button");
    let btnSuscribir = form.querySelector(".btn");

    btnEnviar.addEventListener("click", enviarComentario);
    btnSuscribir.addEventListener("click", suscribirUsuario);

    articleAccionesUsu.append(card, form);
    main.append(
      tituloH1,
      articleContenido,
      articleRecursosleccion,
      articleAccionesUsu
    );
  }

  async function enviarComentario(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    // Obtener el nombre del usuario para hacer la solicitud fetch
    let nombre = sessionStorage.getItem("username");

    // Obtener el ID del curso y hacer la solicitud fetch
    let urlParams = new URLSearchParams(window.location.search);
    let cursoId = urlParams.get("id"); // Obtiene el ID del curso de la URL

    let infUser = await obtenerUsuario(nombre);
    let infCurso = await obtenerCurso(cursoId);

    // Obtén el comentario del formulario
    let formulario = document.querySelector(".form__comment");
    let comentarioUsuario = formulario.elements["comment"].value;

    // Llamada para enviar el comentario con la fecha del comentario y la información del usuario y del curso
    const urlComentario = `http://localhost:8080/comentarios/insertarComentario?userId=${infUser.idusuario}&cursoId=${infCurso.idcurso}`;

    try {
      // Realizar una solicitud para insertar el comentario
      const response = await fetch(urlComentario, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: comentarioUsuario , // Enviar el comentario como JSON
      });

      if (!response.ok) {
        console.error(
          "Error en la respuesta del servidor:",
          response.status,
          response.statusText
        );
        console.log(response);

        return; // Si la respuesta no es exitosa, termina la función aquí
      }

      console.log("Comentario enviado con éxito!");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function suscribirUsuario(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada

    // Obtener el nombre del usuario para hacer la solicitud fetch
    let nombre = sessionStorage.getItem("username");

    // Obtener el ID del curso y hacer la solicitud fetch
    let urlParams = new URLSearchParams(window.location.search);
    let cursoId = urlParams.get("id"); // Obtiene el ID del curso de la URL

    let infUser = await obtenerUsuario(nombre);
    let infCurso = await obtenerCurso(cursoId);

    try {
      let response = await fetch(
        `http://localhost:8080/suscripciones/insertarSub?userId=${infUser.idusuario}&cursoId=${infCurso.idcurso}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"), // Añade el token de autenticación
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Aquí puedes manejar la respuesta de la API
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function obtenerUsuario(nombre) {
    let infUser;
    try {
      const response = await fetch(
        `http://localhost:8080/usuario/buscar/buscarPorNombre/${nombre}`,
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
          "Error al obtener los datos del usuario:",
          response.status,
          response.statusText
        );
        return;
      }

      infUser = await response.json(); // Analizar la respuesta como JSON
      console.log("Inf User: ", infUser);
    } catch (error) {
      console.error("Error:", error);
    }
    return infUser;
  }

  async function obtenerCurso(cursoId) {
    let infCurso;
    const urlLeccionCurso = `/curso/buscar/${cursoId}`;
    try {
      const response = await fetch(`http://localhost:8080${urlLeccionCurso}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        console.error(
          "Error en la respuesta del servidor:",
          response.status,
          response.statusText
        );
        return;
      }

      infCurso = await response.json(); // Analiza la respuesta como JSON
      console.log("Lección del curso:", infCurso);
    } catch (error) {
      console.error("Error:", error);
    }
    return infCurso;
  }
};
