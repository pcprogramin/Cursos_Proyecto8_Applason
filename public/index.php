<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\AdminController;
use Controllers\ApiController;
use Controllers\CitaController;
use MVC\Router;
use Controllers\LoginController;
use Controllers\ServiciosController;

$router = new Router();
$router ->get('/',[LoginController::class,'login']);
$router ->post('/',[LoginController::class,'login']);
$router ->get('/logout',[LoginController::class,'logout']);

$router ->get('/olvide',[LoginController::class,'olvide']);
$router ->post('/olvide',[LoginController::class,'olvide']);
$router ->get('/recuperar',[LoginController::class,'recuperar']);
$router ->post('/recuperar',[LoginController::class,'recuperar']);

$router ->get('/crear-cuenta',[LoginController::class,'crear']);
$router ->post('/crear-cuenta',[LoginController::class,'crear']);

$router ->get('/confirmar-cuenta',[LoginController::class,'confirmar']);
$router ->get('/mensaje',[LoginController::class,'mensaje']);
// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador

$router->get ('/cita',[CitaController::class,'index']);

$router->get ('/admin',[AdminController::class,'index']);



$router->get('/api/servicios',[ApiController::class,'index']);
$router->post('/api/citas',[ApiController::class,'guardar']);
$router->post('/api/eliminar',[ApiController::class,'eliminar']);

$router->get('/servicios',[ServiciosController::class,'index']);
$router->get('/servicios/crear',[ServiciosController::class,'crear']);
$router->post('/servicios/crear',[ServiciosController::class,'crear']);
$router->get('/servicios/actualizar',[ServiciosController::class,'actualizar']);
$router->post('/servicios/eliminar',[ServiciosController::class,'eliminar']);
$router->comprobarRutas();