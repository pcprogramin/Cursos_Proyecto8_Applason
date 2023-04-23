<?php
namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;
class LoginController{
    public static function login(Router $router){
        $alertas = [];
        if ($_SERVER['REQUEST_METHOD']==='POST'){
            $auth = new Usuario($_POST);
            $auth->validarLogin();
        }
        $router->render('auth/login',[
            'alertas'=>$alertas
        ]);
    }
    public static function logout(){
        echo "Desde Login";
    }
    public static function olvide(Router $router){
        $router->render('auth/olvide-password',[
            
        ]);
    }
    public static function recuperar(){
        echo "Desde Login";
    }
    public static function crear(Router $router){
        $usuario = new Usuario;
        $alertas=[];
        if ($_SERVER ['REQUEST_METHOD'] == 'POST'){
            $usuario->sincronizar($_POST);
          
            $alertas = $usuario->validarNuevaCuenta();
            
            if (empty($alertas)){
                $resultado = $usuario->existeUsuario();
                if ($resultado->num_rows){
                    $alertas = Usuario::getAlertas();
                }else{
                    $usuario->hashPassword();
                    $usuario->crearToken();

                    $email = new Email($usuario->email,$usuario->nombre,$usuario->token);
                    $email ->enviarConfirmacion();

                    $resultado = $usuario->guardar();
                    if ($resultado){
                       header('Location: /mensaje');
                    }
                }
            }
        }   

        $router->render('auth/crear-cuenta',[
            'usuario'=> $usuario,
            'alertas'=> $alertas
        ]);
    }
    public static function confirmar(Router $router){
        $alertas = [];
        $token= s($_GET['token']);
        $usuario = Usuario::where('token',$token);
        if (empty($usuario)){
            Usuario::setAlerta('error','Token no valido');
        }else{
            $usuario->confirmado=1;
            $usuario->token = null;
            $usuario->guardar();
            Usuario::setAlerta('exito','Cuenta comprobada correctamente ');
        }
        $alertas = Usuario::getAlertas();
        $router->render ('auth/confirmar-cuenta',[
            'alertas'=> $alertas
        ]);
    }
    public static function mensaje (Router $router){
        $router->render('auth/mensaje');
    }
}