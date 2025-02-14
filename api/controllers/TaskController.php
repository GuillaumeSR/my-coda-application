<?php
class TaskController
{

  public function Add(...$task)
  {
    $name = $task["name"] ?? null;
    $status = $task["status"] ?? null;
    $date = $task["date"] ?? null;

    if (!$name || !isset($status) || !$date) {
      http_response_code(400);
      echo json_encode([
        "message" => "Une ou plusieurs valeurs ne sont pas définies.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $taskManager = new Task(BDD::getInstance($config->getConfig()));

    $taskManager->initTask([
      "name" => $name,
      "status" => $status,
      "date" => $date,
    ]);

    $newTask = $taskManager->getAllProperties();

    if ($taskManager->add($newTask["name"], $newTask["status"], $newTask["date"])) {
      http_response_code(200);
      echo json_encode([
        "message" => "Ajout de la tâche en base de données.",
        "status" => 200
      ]);
      exit;
    }

    http_response_code(400);
    echo json_encode([
      "message" => "Erreur lors de l'ajout de la tâche en BDD.",
      "status" => 400
    ]);
    exit;
  }

  public function ShowList()
  {
    $config = new Config();
    $taskManager = new Task(BDD::getInstance($config->getConfig()));
    $tasks = $taskManager->getList();

    if (!$tasks) {
      http_response_code(400);
      echo json_encode([
        "message" => "Aucune tâche trouvée.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "Liste des tâches.",
      "status" => 200,
      "tasks" => $tasks
    ]);
    exit;
  }

  public function Show(...$params)
  {
    $id = $params["id"] ?? null;

    if (!$id) {
      http_response_code(400);
      echo json_encode([
        "message" => "Le paramètre ID est invalide.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $taskManager = new Task(BDD::getInstance($config->getConfig()));

    $task = $taskManager->getById($id);
    if (!$task) {
      http_response_code(400);
      echo json_encode([
        "message" => "Une erreur s'est produite lors de la récupération de la tâche.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "Tâche récupérée.",
      "status" => 200,
      "task" => $task
    ]);
    exit;
  }

  public function Update(...$task)
  {
    $id = $task["id"] ?? null;
    $name = $task["name"] ?? null;
    $status = $task["status"] ?? null;
    $date = $task["date"] ?? null;

    if (!$id || !$name || !isset($status) || !$date) {
      http_response_code(400);
      echo json_encode([
        "message" => "Les paramètres sont invalides.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $taskManager = new Task(BDD::getInstance($config->getConfig()));

    if (!$taskManager->update([
      "id" => $id,
      "name" => $name,
      "status" => $status,
      "date" => $date
    ])) {
      http_response_code(400);
      echo json_encode([
        "message" => "Une erreur s'est produite lors de la modification de la tâche.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "Mise à jour de la tâche effectuée.",
      "status" => 200
    ]);
    exit;
  }
public function Delete(...$params)
  {
    $id = $params["id"] ?? null;

    if (!$id) {
      http_response_code(400);
      echo json_encode([
        "message" => "Le paramètre ID est invalide.",
        "status" => 400
      ]);
      exit;
    }

    $config = new Config();
    $taskManager = new Task(BDD::getInstance($config->getConfig()));

    if (!$taskManager->deleteById($id)) {
      http_response_code(400);
      echo json_encode([
        "message" => "La suppression de la tâche a échoué.",
        "status" => 400
      ]);
      exit;
    }

    http_response_code(200);
    echo json_encode([
      "message" => "La tâche n°{$id} a été supprimée.",
      "status" => 200
    ]);
    exit;
  }
}
