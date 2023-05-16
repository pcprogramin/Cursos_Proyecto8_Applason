<h1 class="nombre-pagina">Crear Servicios</h1>
<p class="descripcion-pagina">Añadir un nuevo campo para añadir un sevicio </p>
<?php
    include_once __DIR__.'/../templates/barra.php';
    include_once __DIR__.'/../templates/alertas.php';
?>
<form action="" method="post" class="formulario">
    <?php include __DIR__."/formulario.php"?>
    <input type="submit" value="Guardar Servicio" class="boton">
</form>