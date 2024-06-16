const formNewUser = `
    <section class="contenedor-forms">
        <form class="nuevo" name="formNewUser" id="formNewUser" action="" method="POST">
            <h2>Crear Usuario</h2>
            <div class="grupo-entrada">
                <input type="text" name="nif" id="nif" required data-error="Por favor introduce tu NIF"
                    pattern="^[0-9]{8}[A-Z]$" title="El NIF debe tener 8 dígitos seguidos de una letra mayúscula">
                <label for="nif" id="lnif">NIF</label>
            </div>

            <div class="campo-doble">
                <div class="grupo-entrada">
                    <input type="text" name="nombre" id="nombre" required
                        data-error="Por favor introduce tus apellidos y nombre" 
                        pattern="^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,40}$" title="El nombre y apellidos deben contener solo letras y espacios.">
                    <label for="nombre" id="lnombre">Nombre y apellidos</label>
                </div>

                <div class="grupo-entrada">
                    <input type="email" name="email" id="email" required
                        data-error="Por favor introduce tu email">
                    <label for="email">Email</label>
                </div>
            </div>

            <div class="campo-doble">
                <div class="grupo-entrada">
                    <input type="tel" name="telefono" id="telefono" required
                        data-error="Por favor introduce tu teléfono" pattern="^\\d{9}$">
                    <label for="telefono">Teléfono</label>
                </div>

                <div class="grupo-entrada">
                    <input type="date" name="fnacimiento" id="fnacimiento" required
                        data-error="Por favor introduce tu fecha de nacimiento">
                    <label for="fnacimiento" id="lfnacimiento">F. nacimiento</label>
                </div>
            </div>

            <div class="campo-doble">
                <div class="grupo-entrada">
                    <input type="password" name="password" id="password" required
                        data-error="Por favor introduce tu contraseña" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$">
                    <label for="password" id="lpassword">Crea una contraseña</label>
                </div>

                <div class="grupo-entrada">
                    <input type="password" name="password2" id="password2" required
                        data-error="Por favor introduce tu contraseña" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$">
                    <label for="password2" id="lpassword2">Repite la contraseña</label>
                </div>
            </div>
            <div class="campo-doble">
                <div class="grupo-entrada boton">
                    <button type="submit" id="btnNewUser">Crear cuenta</button>
                </div>

                <div class="grupo-entrada boton">
                    <button type="button" id="btnCancelar">Cancelar</button>
                </div>
            </div>

            <div class="mensaje-db"></div>
        </form>
    </section>
`;

export { formNewUser };
