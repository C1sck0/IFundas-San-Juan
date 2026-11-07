<?php include("session.php")?>
<?php include("conexion.php")?>
<?php 

if (isset($_POST['guardar_registro'])){
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
     $telefono = $_POST['telefono'];
    $usuario = $_POST['usuario'];
    $clave = $_POST['clave'];
    $tipo = $_POST['tipo'];
    //die(var_dump($_POST));
    //echo $nombres;
    //echo $direccion;
}

    $query = "INSERT INTO tbl_usuarios(nombre, email,telefono,usuario,clave,tipo_usuario) VALUES ('$nombre','$email','$telefono','$usuario','$clave',$tipo)";
   //die($query);
    $result = mysqli_query($conexion, $query);
    if(!$result){
        die("Fallo en el query. Existe un problema en la base de datos.");
    }
    else{
        ?>
        <script>alert("Registro Guardado");</script>
        <?php 
        
    }

    //si quisiera redireccionar a index directamente:
    ?>
    <script>
    window.location = "listado_usuarios.php";
    </script>
