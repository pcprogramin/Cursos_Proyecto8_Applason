<?php
namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;

class ApiController{
    public static function index(){
        $servicios = Servicio::all();
        echo json_encode($servicios);
    }
    public static function guardar(){
        $cita= new Cita($_POST);
        $resultado= $cita->guardar();

        $idServicios = explode(',',$_POST['servicios']);

        foreach ($idServicios as $idServicio){
            $args=[
                'citaId'=> $resultado['id'],
                'servicioId'=>$idServicio
            ]; 
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }

        $respuesta =[
            'resultado'=> $resultado,
        ];
        echo json_encode($respuesta);
    }
    public static function eliminar(){
        if ($_SERVER['REQUEST_METHOD']==='POST'){
            $id= $_POST['id'];
           
            $cita = Cita::find($id);
            $cita->eliminar();
            header('Location:'.$_SERVER['HTTP_REFERER']);
        }
    }
}