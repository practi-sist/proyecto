<?php
require('conexion.php');


if($_SERVER['REQUEST_METHOD'] == 'GET') {
  $contenido = $_GET['contenido'];
  $contenido = '%' . strtolower($contenido) . '%';

$sql = 'SELECT t.*, u1.nombre as usuario_solicito, u2.nombre as usuario_atendio FROM tickets t
LEFT JOIN usuarios u1 ON t.id_usuario_solicito = u1.id_usuario
LEFT JOIN usuarios u2 ON t.id_usuario_atendio = u2.id_usuario
WHERE LOWER(t.titulo) LIKE ? OR LOWER(t.descripcion) LIKE ? OR LOWER(t.tipo_ticket) LIKE ?
';

$stmt = $conn->prepare($sql);

if(!$stmt) {
    http_response_code(500);
    echo json_encode(["status"=>"error", "message" => "Error al generar la consulta"]);
    exit();
}


$stmt->bind_param("sss", $contenido, $contenido, $contenido);

$stmt->execute();
$result = $stmt->get_result();

$datos = [];

while($row = $result->fetch_assoc()) {
    $datos[] = $row;
}


echo json_encode(["status"=>"success", "datos"=>$datos]);

}