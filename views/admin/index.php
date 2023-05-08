<h1 class="nombre-pagina">Panel de Aministración</h1>
<?php include __DIR__ . '/../templates/barra.php' ?>
<div class="busqueda">
    <h2>Buscar Cita</h2>
    <form class="formulario">
        <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" id="fecha" name="fecha">
        </div>
    </form>
</div>
<div class="citas-admin">
    <?php
    $idCita = 0;
    $total = 0;
    foreach ($citas as $key => $cita) {
        if ($idCita !== $cita->id) {

    ?>
            <li>
                <p>ID:<span><?php echo $cita->id ?></span></p>
                <p>Hora:<span><?php echo $cita->hora ?></span></p>
                <p>Cliente:<span><?php echo $cita->cliente ?></span></p>
                <p>Email:<span><?php echo $cita->email ?></span></p>
                <p>Telefono:<span><?php echo $cita->telefono ?></span></p>

                <h3>Servicios</h3>
            <?php
            $idCita = $cita->id;
            
        } ?>
            <p class="servicio"><?php echo $cita->servicio . " " . $cita->precio ?></p>

        <?php
        $actual = $cita->id;
        $proximo = $citas[$key + 1]->id ??  0;
        $total += $cita->precio ;
        if (esUltimo($actual,$proximo)){
            ?>
            <p class="servicio"> Total: <?php echo $total ?></p>
            <?php
            $total=0;
        }
    }
        ?>
</div>