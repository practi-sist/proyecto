<?php
require('conexion.php');

if($_SERVER['REQUEST_METHOD'] == 'GET') {
   $id = $_GET['id'];

   $sql = 'SELECT t.*, u1.nombre as usuario_solicito, u2.nombre as usuario_atendio FROM tickets t
LEFT JOIN usuarios u1 ON t.id_usuario_solicito = u1.id_usuario
LEFT JOIN usuarios u2 ON t.id_usuario_atendio = u2.id_usuario
WHERE t.id_ticket = ?
';

$stmt = $conn->prepare($sql);

if(!$stmt) {
    http_response_code(500);
    echo json_encode(["status"=>"error", "message" => "Error al generar la consulta"]);
    exit();
}

$stmt->bind_param('i', $id);
$stmt->execute();
$result = $stmt->get_result();

$ticket = [];
while($row = $result->fetch_assoc()) {
  $ticket[] = $row;
}

echo json_encode(["status"=>"success", "datos"=>$ticket]);

}