<?php 
require('conexion.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
   $usuario_solicito = "1";
   $descripcion = $_POST['descripcion'];
   $prioridad = $_POST['prioridad'];
   $tipo = $_POST['tipo'];
   $titulo = $_POST['titulo'];
   
   date_default_timezone_set("America/Lima");
   $fecha = date("Y-m-d H:i:s");

   $nombre_unico = "";
   if(isset($_FILES['imagen'])) {
     $nombre = $_FILES['imagen']['name'];
     $tmp_name = $_FILES['imagen']['tmp_name'];
     $path_info = pathinfo($nombre);
     $extension = $path_info['extension'];
     $file_name = $path_info['filename'];
     $nombre_unico = $file_name . '_' . uniqid() . '.' . $extension;
   
     $path = '../imagenes/' . $nombre_unico;
     if(is_uploaded_file($tmp_name)) {
        move_uploaded_file($tmp_name, $path);
     }

   }

   $progreso = "En Espera";

   $sql = "INSERT INTO tickets (id_usuario_solicito, titulo, tipo_ticket, prioridad, descripcion, url_imagen, progreso, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

   $stmt =  $conn->prepare($sql);

   if(!$stmt) {
      http_response_code(500);
      echo json_encode(['status'=>'error', 'message'=>'Error en la consulta']);
   }
   
   $stmt->bind_param("ississss", $usuario_solicito, $titulo, $tipo, $prioridad, $descripcion, $nombre_unico, $progreso, $fecha);

   if($stmt->execute()) {
      http_response_code(200);
      echo json_encode(['status'=>'success','message'=>'Ticket registrado con éxito', "fecha" => $fecha]);
   } else {
      http_response_code(500);
      echo json_encode(['status'=>'error', 'message'=>'Error al registrar el ticket']);
   }
  
}


/* Selecciona todos los usuarios de la base de datos 
$sql = "SELECT * FROM usuarios";

$stmt = $conn->prepare($sql);

 if(!$stmt) {
    echo "Error en la consulta";
 }

 $stmt->execute();
 $result = $stmt->get_result();
 $usuarios = [];
 while($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
 }
 
 echo json_encode($usuarios);
 */


