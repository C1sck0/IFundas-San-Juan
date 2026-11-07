<?php

$conexion = new mysqli('localhost', 'root', '', 'ucc_testing');

if ($conexion->connect_errno) {
    echo "Lo sentimos, este sitio web está experimentando problemas.";

    echo "Error: Fallo al conectarse a MySQL debido a: \n";
    echo "Errno: " . $conexion->connect_errno . "\n";
    echo "Error: " . $conexion->connect_error . "\n";

    // Podría ser conveniente mostrar algo interesante, aunque nosotros simplemente saldremos
    exit;
}

?>
