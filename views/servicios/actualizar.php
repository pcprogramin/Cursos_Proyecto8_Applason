<h1 class="nombre-pagina">Actualizar Servicios</h1>
<p class="descripcion-pagina">Modifica los valores del servicio</p>
<?php
    include_once __DIR__.'/../templates/barra.php';
    include_once __DIR__.'/../templates/alertas.php';
?>
<form  method="post" class="formulario">
    <?php include __DIR__."/formulario.php"?>
    <input type="submit" value="Actualizar Servicio" class="boton">
</form>