<?php include("session.php")?>
<?php include("conexion.php")?>

<?php
if(isset($_GET['id'])){
        $codigo = $_GET['id'];
        $query = "DELETE FROM tbl_usuarios WHERE id = $codigo";
        $result = mysqli_query($conexion, $query);
        if(!$result)
        {
            die("El query para eliminar falló");
        }
        else{
            ?>
            <script>alert("Registro Eliminado");</script>
            <?php 
        }
    }
    //si quisiera redireccionar a index directamente: ?>
    <script>
    window.location = "listado_usuarios.php";
    </script>
    

