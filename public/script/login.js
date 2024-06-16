import { cabeceraMenu } from "../parciales/cabeceraMenuLogin.js";

window.onload = function () {
  // Código para colocar el HTML importado: HEADER y menú
  // Colocamos cabecera y menú en el DOM
  const main = document.querySelector("main");
  const header = document.createElement("header");
  header.innerHTML = cabeceraMenu;
  main.before(header);

  // Código para mover las label al seleccionar los input demas entradas
  const inputs = document.querySelectorAll("input, select");

  // Eventos de obtener y perder foco de los elementos de entrada
  for (let input of inputs) {
    input.addEventListener("focus", obtenFoco);
    input.addEventListener("blur", pierdeFoco);
  }

  // Desplazamos Label en función de si hay entradas o no
  let estiloLabel; // Estilo inicial de la label para restaurarla al perder e foco
  function obtenFoco() {
    estiloLabel = estiloLabel
      ? this.nextElementSibling.style.cssText
      : estiloLabel;
    this.classList.add("input-foco");
    this.nextElementSibling.style.cssText =
      "font-size: 12px; color: var(--color-fondo-caja); top: -15px;";
  }

  function pierdeFoco() {
    if (this.value === "") {
      this.classList.remove("input-foco");
      this.nextElementSibling.style.cssText = estiloLabel;
    }
  }

  // Codigo para los efectos de desplazamiento de velo y formularios
  const velo = document.querySelector(".velo");
  const veloIzquierda = document.querySelector(".velo-izquierda");
  const veloDerecha = document.querySelector(".velo-derecha");

  const formLogin = document.querySelector("form.login");
  const formNuevo = document.querySelector("form.nuevo");

  // Botones para seleccionar formulario: login o nuevo usuario
  document
    .querySelector("#btnIzquierda")
    .addEventListener("click", desplazaVelo);
  document.querySelector("#btnDerecha").addEventListener("click", desplazaVelo);

  // Operaciones de desplazamientos de elementos en función de botón pulsado
  function desplazaVelo(even) {
    if (even.target.id === "btnDerecha") {
      velo.style.width = "350px";
      velo.style.transform = "translateX(-100%)";
      veloIzquierda.style.transform = "translateX(0)";
      veloDerecha.style.transform = "translateX(-100%)";
      formLogin.style.transform = "translateY(100%)";
      formNuevo.style.transform = "translateY(0)";
    } else {
      velo.style.width = "418px";
      velo.style.transform = "translateX(0)";
      veloIzquierda.style.transform = "translateX(100%)";
      veloDerecha.style.transform = "translateX(0)";
      formLogin.style.transform = "translateY(0)";
      formNuevo.style.transform = "translateY(-100%)";
    }
  }

  // Enviar el formulario usando fetch
  // document.querySelector("#btnNewUser").addEventListener("click", enviaForm);
  document.querySelector("#btnNewUser").addEventListener("click", register);
  document.querySelector("#login").addEventListener("click", login);

  // Método para iniciar sesión con un usuario
  async function login(event) {
    // Evita que el formulario se envíe de forma tradicional
    event.preventDefault();

    // Obtén los valores de los campos de usuario y contraseña
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("clave").value;

    // Crea un objeto con los datos del formulario
    const formData = {
      username: username,
      password: password,
    };

    // Convierte a texto (serializa) el objeto JSON para su envío
    const formJSONSerial = JSON.stringify(formData);

    try {
      const response = await fetch("http://localhost:8080/auth/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formJSONSerial,
      });

      if (!response.ok) {
        throw new Error("Error en el login");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data); // Verifica el contenido de 'data'

      const token = data.jwt; // Aquí recojo el token del usuario
      const role = data.role; // Aquí recojo el rol del usuario
      const nombreUser = data.username;

      // Almacena el token en sessionStorage para mayor seguridad
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", nombreUser);

      console.log("Token del usuario: " + token);
      console.log("Rol del usuario: " + role);
      console.log("Username del usuario: " + nombreUser);

      // Redirige al usuario a otra página con el token
      if (role.includes("ROLE_ADMIN")) {
        window.location.href = "admin/dashboard.html";
      } else {
        window.location.href = "index.html";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Método que inserta un usuario en la base de datos
  async function register(event) {
    // Evita que el formulario se envíe de forma tradicional
    event.preventDefault();

    // Referencia al div donde se mostrarán los mensajes
    const mensajeDB = document.querySelector(".mensaje-db");

    // FormData crea una estructura de claves/valor con los datos del formulario
    const formData = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      email: document.getElementById("email").value,
      roleRequest: {
        roleListName: ["USER"], // Agrega los roles según tus necesidades
      },
    };

    // Convertimos a texto (serializamos) el JSON para su envío
    const formJSONSerial = JSON.stringify(formData);

    try {
      const respuesta = await fetch("http://localhost:8080/auth/sign-up", {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: "POST",
        body: formJSONSerial, // Añadimos al cuerpo de la solicitud los datos
      });

      let respuestaBD = await respuesta.json();
      console.log(respuestaBD);

      // Comprobamos si la respuesta es exitosa
      if (respuesta.ok) {
        mensajeDB.textContent = "Usuario creado con éxito.";
        mensajeDB.classList.add("mensaje-exito");
      } else {
        mensajeDB.textContent =
          "Error al crear el usuario. " + respuestaBD.message;
        mensajeDB.classList.add("mensaje-error");
      }
    } catch (error) {
      console.error("Error al enviar datos del formulario:", error);
      mensajeDB.textContent = "Error al conectar con el servidor.";
      mensajeDB.classList.add("mensaje-error");
    }
  }
};
