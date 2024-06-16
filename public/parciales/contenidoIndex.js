let loginText = "Login";
if (sessionStorage.getItem("token")) {
  loginText = "LogOut";
}

const header = `
    <nav class="nav__header container">
        <!-- Contenedor con el logo de la app -->
        <div class="nav__logo">
            <h2 class="nav__title">CodeMaster</h2>
        </div>

        <!-- Menú superior -->
        <ul class="nav__link nav__link--menu">
            <li class="nav__items">
                <a>Inicio</a>
            </li>
            <li class="nav__items">
                <a onclick="window.location='./categorias.html'">Cursos</a>
            </li>
            <li class="nav__items">
                <a onclick="window.location='./aboutUs.html'">Sobre Nosotros</a>
            </li>

            <!-- Icono para cerrar el menú -->
            <i class="fa-solid fa-circle-xmark nav__close"></i>
        </ul>

        <!-- Contenedor para el inicio de sesión -->
        <div class="nav__login">
            <button onclick="window.location='./login.html'" class="btn__login">
                <span class="span-mother">
                    ${loginText.split("").map((letter) => `<span>${letter}</span>`).join("")}
                </span>
                <span class="span-mother2">
                    ${loginText.split("").map((letter) => `<span>${letter}</span>`).join("")}
                </span>
            </button>
        </div>

        <!-- Botón hamburgesa para mostrar el menú cuando por dimensiones este no quepa -->
        <div class="nav__menu">
            <img
                src="../public/imagenes/iconos/clasificacion-de-barras.png"
                alt="Botón que al clicar sobre él muestra el menu"
                class="nav__img"
            />
        </div>
    </nav>

    <!-- Sección que destaca las razones para elegir la aplicación -->
    <section class="section__header container">
        <h1 class="typewriter">CodeMaster</h1>
        <p class="section__header_paragraph">
            "Descubre la magia de la programación con CodeMaster: donde el código
            se convierte en inspiración y el futuro se conquista. Domina cada
            línea y conviértela en un paso firme hacia tu éxito."
        </p>
    </section>
`;

const about = `
    <h2 class="subtitle">Descubre el Mundo CodeMaster</h2>
    <p class="about__paragraph">
        Amplía tus habilidades en los lenguajes de programación más avanzados
        con nuestros cursos especializados.
    </p>

    <div class="about__main">
        <article class="about__icons">
            <img
            src="../public/imagenes/iconos/js.png"
            alt="JavaScript"
            class="about__icon"
            />
            <h3 class="about__title">JavaScript</h3>
            <p class="about__paragraph">
            Explora las posibilidades ilimitadas de JavaScript y da vida a tus
            ideas. Aprende con proyectos prácticos y desafíos estimulantes.
            </p>
        </article>

        <article class="about__icons">
            <img
            src="../public/imagenes/iconos/piton.png"
            alt="Python"
            class="about__icon"
            />
            <h3 class="about__title">Python</h3>
            <p class="about__paragraph">
            Sumérgete en el mundo versátil de Python y domina su sintaxis
            elegante. Desarrolla soluciones eficientes y potencia tu carrera
            en la programación.
            </p>
        </article>

        <article class="about__icons">
            <img
            src="../public/imagenes/iconos/java.png"
            alt="Java"
            class="about__icon"
            />
            <h3 class="about__title">Java</h3>
            <p class="about__paragraph">
            Conquista el universo de Java y construye aplicaciones robustas y
            descubre las bases sólidas para el desarrollo de software.
            </p>
        </article>
    </div>`;

const knowledge = `
    <div class="knowledge__container container">
        <div class="knowledge__texts">
            <h2 class="subtitle">Descubre una Amplia Gama de Cursos</h2>
            <p class="knowledge__paragraph">
                Impúlsate hacia el conocimiento con nuestra variada selección de
                cursos. Sumérgete en experiencias de aprendizaje envolventes y haz
                realidad tus ambiciones en el mundo de la programación.
            </p>
            <button class="explore__courses">
                <span><a href="./categorias.html">Explorar Cursos</a></span>
            </button>
        </div>

        <figure class="knowledge__picture">
        <img
            src="../public/imagenes/fondo-landing.jpg"
            class="knowledge__img"
            alt="Equipo de CodeMaster"
        />
        </figure>
    </div>
`;

const price = `
    <h2 class="subtitle">¡Encuentra el Plan Perfecto!</h2>
    <div class="price__table">
        <div class="price__element">
            <p class="price__name">Básico</p>
            <h3 class="price__price">¡Gratis!</h3>

            <div class="price__items">
                <p class="price__features">Acceso a cursos seleccionados</p>
                <p class="price__features">Recursos básicos</p>
                <p class="price__features">Comunidad de estudiantes</p>
            </div>

            <a href="#" class="price__cta">Comienza Gratis</a>
        </div>

        <div class="price__element price__element--best">
            <p class="price__name">Profesional</p>
            <h3 class="price__price">40€/mes</h3>

            <div class="price__items">
                <p class="price__features">
                    Beneficios del plan Intermedio y más
                </p>
                <p class="price__features">Proyectos prácticos avanzados</p>
                <p class="price__features">
                    Certificación al completar el programa
                </p>
            </div>

            <a href="#" class="price__cta">Comienza Ahora</a>
        </div>

        <div class="price__element">
            <p class="price__name">Intermedio</p>
            <h3 class="price__price">30€/mes</h3>

            <div class="price__items">
                <p class="price__features">Acceso completo a todos los cursos</p>
                <p class="price__features">Material didáctico premium</p>
                <p class="price__features">Asesoría personalizada</p>
            </div>

            <a href="#" class="price__cta">Comienza Ahora</a>
        </div>
    </div>
`;

const testimony = `
    <div class="testimony__container container">
        <div class="testimony__container">
            <ul class="slider">
                <li class="item">
                    <div class="testimonial">
                        <p>
                        "Desde que me uní a CodeMaster, mi capacidad para organizar
                        y construir equipos ha alcanzado nuevos niveles. "
                        </p>
                        <p>Randall Howard</p>
                        <p>UX Designer, Netflix</p>
                    </div>
                    <img
                        class="image"
                        src="../public/imagenes/personas/hombre1.jpg"
                        alt="Testigo de la app"
                    />
                </li>
                <li class="item">
                    <div class="testimonial">
                        <p>
                        "CodeMaster ha transformado mi enfoque hacia el desarrollo
                        sin código. La variedad de cursos me ha permitido avanzar
                        con confianza."
                        </p>
                        <p>Alyssa Morris</p>
                        <p>Product Manager, Intel</p>
                    </div>
                    <img
                        class="image"
                        src="../public/imagenes/personas/mujer1.jpg"
                        alt="Testigo de la app"
                    />
                </li>
                <li class="item">
                    <div class="testimonial">
                        <p>
                        "La flexibilidad del producto y las posibilidades casi
                        ilimitadas me han permitido destacar en el análisis de datos
                        en mi trabajo en Spotify."
                        </p>
                        <p>Adam Worrell</p>
                        <p>Data Analyst, Spotify</p>
                    </div>
                    <img
                        class="image"
                        src="../public/imagenes/personas/mujer2.jpg"
                        alt="Testigo de la app"
                    />
                </li>
                <li class="item">
                    <div class="testimonial">
                        <p>
                        "Los proyectos desafiantes y el material didáctico
                        excepcional me han permitido destacar en mi nuevo rol como
                        Desarrollador Web."
                        </p>
                        <p>Adam Worrell</p>
                        <p>Desarrollador Web, Innovate Tech</p>
                    </div>
                    <img
                        class="image"
                        src="../public/imagenes/personas/hombre2.jpg"
                        alt="Testigo de la app"
                    />
                </li>
            </ul>
            <nav>
                <button class="btnTestimony" data-index="0"></button>
                <button class="btnTestimony" data-index="1"></button>
                <button class="btnTestimony" data-index="2"></button>
                <button class="btnTestimony" data-index="3"></button>
            </nav>
        </div>
    </div>
`;

export { header, about, knowledge, price, testimony };
