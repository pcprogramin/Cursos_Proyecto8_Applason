<h1 class="nombre-pagina">Crear Cuenta</h1>
<p class="descripcion-pagina">Llene el siguiente formulario  para crear una cuenta</p>
<form class="formulario" method="POST" action="/crear-cuenta" >
    <div class="campo"> 
        <label for="nombre">Nombre:</label>
        <input type="text" name="nombre" id="nombre" placeholder="Tu Nombre">
    </div>
    <div class="campo"> 
        <label for="apellido">Apellido:</label>
        <input type="text" name="apellido" id="apellido" placeholder="Tu Apellido">
    </div>
    <div class="campo"> 
        <label for="telefono">Apellido:</label>
        <input type="tel" name="telefono" id="telefono" placeholder="Tu Telefono">
    </div>
    <div class="campo"> 
        <label for="email">E-mail:</label>
        <input type="email" name="email" id="email" placeholder="Tu E-mail">
    </div>
    <div class="campo"> 
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" placeholder="Tu Password">
    </div>
    <input type="submit" value="Crear Cuenta" class="boton">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/olvide">¿Olvidaste tu password?</a>
</div>