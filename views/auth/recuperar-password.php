<h1 class="nombre-pagina">Recuperar Password</h1>
<p class="descripcion-pagina">Coloca tu nueva password a continuación</p>
<?php
include __DIR__ . "/../templates/alertas.php";
?>
<?php
if ($error) return
?>
<form class="formulario" method="POST">
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Tu nuevo password">
    </div>
    <input type="submit" value="Guardar Nuevo Password" class="boton">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta?Crear Una</a>
</div>