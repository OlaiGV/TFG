window.onload = function () {
  // Obtener el ID del curso y hacer la solicitud fetch
  let urlParams = new URLSearchParams(window.location.search);
  let valor = urlParams.get("valor"); // Obtiene el ID del curso de la URL
  let btnVolver = document.querySelector(".ui-btn span");

  btnVolver.addEventListener("click", function () {
    window.location.href = `./dashboard.html`;
  });
  cargarDatos(valor);

  async function cargarDatos(valor) {
    const urls = {
      usuarios: "http://localhost:8080/usuario/buscar",
      categorías: "http://localhost:8080/categoria/buscar",
      lecciones: "http://localhost:8080/leccion/buscar",
      cursos: "http://localhost:8080/curso/buscar",
      comentarios: "http://localhost:8080/comentarios/buscar",
      suscripciones: "http://localhost:8080/suscripciones/buscar",
    };

    let url = urls[valor];

    try {
      const response = await fetch(url, {
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

      const respuestaBbdd = await response.json(); // Analiza la respuesta como JSON
      console.log("Respuesta:", respuestaBbdd);

      pintaTabla(valor, respuestaBbdd);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function pintaTabla(quePintar, respuestaBbdd) {
    let contenidoHTML = "";
    let tabla = document.querySelector("table");

    if (!Array.isArray(respuestaBbdd)) {
      console.error("Error: respuestaBbdd no es un array:", respuestaBbdd);
      return;
    }

    switch (quePintar) {
      case "usuarios":
        contenidoHTML = `
        <tr>
            <th>idUsuario</th>
            <th>mail</th>
            <th>password</th>
            <th>username</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>
        `;

        for (const respuesta of respuestaBbdd) {
          contenidoHTML += ` 
          <tr>
            <td>${respuesta.idusuario}</td>
            <td>${respuesta.mail}</td>
            <td>${respuesta.password}</td>
            <td>${respuesta.username}</td>
            <td><i class="fa-regular fa-pen-to-square"></i></td>
            <td><i class="fa-regular fa-trash-can"></i></td>
          </tr>
          `;
        }

        tabla.innerHTML = contenidoHTML;
        break;
      case "categorías":
        contenidoHTML = `
        <tr>
            <th>idCategoria</th>
            <th>nombre</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>
        `;
        for (const respuesta of respuestaBbdd) {
          contenidoHTML += ` 
          <tr>
            <td>${respuesta.idcategoria}</td>
            <td>${respuesta.nombre}</td>
            <td><i class="fa-regular fa-pen-to-square"></i></td>
            <td><i class="fa-regular fa-trash-can"></i></td>
          </tr>
          `;
        }
        tabla.innerHTML = contenidoHTML;
        break;
      case "comentarios":
        contenidoHTML = `
        <tr>
            <th>idComentario</th>
            <th>fecha</th>
            <th>comentario</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>
        `;

        for (const respuesta of respuestaBbdd) {
          contenidoHTML += ` 
          <tr>
            <td>${respuesta.idcomentario}</td>
            <td>${respuesta.fecha}</td>
            <td>${respuesta.comentario}</td>
            <td><i class="fa-regular fa-pen-to-square"></i></td>
            <td><i class="fa-regular fa-trash-can"></i></td>
          </tr>
          `;
        }

        tabla.innerHTML = contenidoHTML;
        break;
      case "lecciones":
        contenidoHTML = `
        <tr>
            <th>idleccion</th>
            <th>contenido</th>
            <th>tipo_recurso</th>
            <th>url_recurso</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>
        `;
        for (const respuesta of respuestaBbdd) {
          contenidoHTML += ` 
          <tr>
            <td>${respuesta.idleccion}</td>
            <td>${respuesta.contenido}</td>
            <td>${respuesta.tipoRecurso}</td>
            <td>${respuesta.urlRecurso}</td>
            <td><i class="fa-regular fa-pen-to-square"></i></td>
            <td><i class="fa-regular fa-trash-can"></i></td>
          </tr>
          `;
        }
        tabla.innerHTML = contenidoHTML;
        break;
      case "suscripciones":
        contenidoHTML = `
        <tr>
            <th>idsuscripcion</th>
            <th>fecha</th>
            <th>nombreCurso</th>
            <th>nombreUsuario</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>
        `;
        for (const respuesta of respuestaBbdd) {
          contenidoHTML += ` 
          <tr>
            <td>${respuesta.idsuscripcion}</td>
            <td>${respuesta.fecha}</td>
            <td>${respuesta.curso.nombre}</td>
            <td>${respuesta.user.username}</td>
            <td><i class="fa-regular fa-pen-to-square"></i></td>
            <td><i class="fa-regular fa-trash-can"></i></td>
          </tr>
          `;
        }
        tabla.innerHTML = contenidoHTML;
        break;
      case "cursos":
        contenidoHTML = `
        <tr>
            <th>idcurso</th>
            <th>autor</th>
            <th>descripcion</th>
            <th>nombre</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>
        `;
        for (const respuesta of respuestaBbdd) {
          contenidoHTML += ` 
          <tr>
            <td>${respuesta.idcurso}</td>
            <td>${respuesta.autor}</td>
            <td>${respuesta.descripcion}</td>
            <td>${respuesta.nombre}</td>
            <td><i class="fa-regular fa-pen-to-square"></i></td>
            <td><i class="fa-regular fa-trash-can"></i></td>
          </tr>
          `;
        }
        tabla.innerHTML = contenidoHTML;
        break;
      default:
        break;
    }
    let botonesEliminar = document.querySelectorAll("i.fa-trash-can");
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", function () {
        let idElemento =
          this.parentElement.parentElement.firstElementChild.textContent;
        borrarDatos(valor, idElemento);
      });
    });
  }

  async function borrarDatos(tipo, idElemento) {
    const urlsEliminar = {
      usuarios: `http://localhost:8080/usuario/eliminar/${idElemento}`,
      categorías: `http://localhost:8080/categoria/eliminar/${idElemento}`,
      lecciones: `http://localhost:8080/leccion/eliminar/${idElemento}`,
      cursos: `http://localhost:8080/curso/eliminar/${idElemento}`,
      comentarios: `http://localhost:8080/comentarios/eliminar/${idElemento}`,
      suscripciones: `http://localhost:8080/suscripciones/eliminar/${idElemento}`,
    };

    let url = urlsEliminar[tipo];

    try {
      const response = await fetch(url, {
        method: "DELETE",
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

      console.log("Elemento borrado con éxito");

      // Recarga la página
      location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  }
};
