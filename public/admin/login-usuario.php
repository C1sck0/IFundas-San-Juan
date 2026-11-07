<?php
session_start();

include ("conexion.php");

$usuario = $_POST['usuario'];
$clave = $_POST['clave'];

$sql = "SELECT * FROM tbl_usuarios WHERE usuario = '".$usuario."' AND clave='".$clave." '";
$query=mysqli_query($conexion,$sql);
$counter=mysqli_num_rows($query);
if ($counter==1){
  while ($reg=mysqli_fetch_array($query)){
	  $_SESSION['usuario']=$reg['usuario']; 
	  $_SESSION['nombre']=$reg['nombre'];
	  //$_SESSION['foto']=$reg['foto'];
}


	   print "<script>alert(\"Bienvenido.\");window.location='listado_usuarios.php';</script>";

} else {
    print "<script>alert(\"Usuario incorrecto.Intente de nuevo.\");window.location='index.html';</script>";
}

?>
