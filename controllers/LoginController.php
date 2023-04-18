<?php
namespace Controllers;
use MVC\Router;
class LoginController{
    public static function login(Router $router){
        $router->render('auth/login');
    }
    public static function logout(){
        echo "Desde Login";
    }
    public static function olvide(){
        echo "Desde Login";
    }
    public static function recuperar(){
        echo "Desde Login";
    }
    public static function crear(){
        echo "Desde Login";
    }
}