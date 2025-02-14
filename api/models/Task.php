<?php
class Task {
  private int $id;
  private string $name;
  private bool $status;
  private string $date;
  private string $creation_date;

  private $bdd;

  public function __construct($bdd = null) {
    if (!is_null($bdd)) {
      $this->setBdd($bdd);
    }
  }

  public function getId(): int {
    return $this->id;
  }

  public function setId(int $id) {
    $this->id = $id;
  }

  public function getName(): string {
    return $this->name;
  }

  public function setName(string $name) {
    $this->name = $name;
  }

  public function getStatus(): bool {
    return $this->status;
  }

  public function setStatus(bool $status) {
    $this->status = $status;
  }

  public function getDate(): string {
    return $this->date;
  }

  public function setDate(string $date) {
    $this->date = $date;
  }

  public function getCreationDate(): string {
    return $this->creation_date;
  }

  public function setCreationDate(string $creation_date) {
    $this->creation_date = $creation_date;
  }

  public function initTask(array $task) {
    $this->setName($task["name"]);
    $this->setStatus($task["status"]);
    $this->setDate($task["date"]);
    $this->setCreationDate($task["creation_date"]);
  }

  public function getAllProperties() {
    return [
      "id" => $this->getId(),
      "name" => $this->getName(),
      "status" => $this->getStatus(),
      "date" => $this->getDate(),
      "creation_date" => $this->getCreationDate(),
    ];
  }

  public function add(string $name, bool $status, string $date) {
    $req = $this->bdd->prepare("INSERT INTO tasks(name, status, date) VALUES(:name, :status, :date)");
    $req->bindValue(":name", $name, PDO::PARAM_STR);
    $req->bindValue(":status", $status, PDO::PARAM_BOOL);
    $req->bindValue(":date", $date, PDO::PARAM_STR);
    
    if (!$req->execute()) {
      return false;
    }
    
    $req->closeCursor();
    return true;
  }

  public function getList() {
    $req = $this->bdd->prepare("SELECT * FROM tasks ORDER BY creation_date DESC");
    $req->execute();
    $tasks = $req->fetchAll(PDO::FETCH_OBJ);

    if (!$tasks) {
      return null;
    }
    
    $req->closeCursor();
    return $tasks;
  }

  public function getById(int $id) {
    $req = $this->bdd->prepare("SELECT * FROM tasks WHERE id=:id");
    $req->bindValue(":id", $id, PDO::PARAM_INT);
    $req->execute();
    $task = $req->fetch(PDO::FETCH_OBJ);

    if (!$task) {
      return null;
    }
    
    return $task;
  }

  public function update(array $task) {
    $req = $this->bdd->prepare("UPDATE tasks SET 
      name=:name,
      status=:status,
      date=:date
      WHERE id=:id
    ");

    $req->bindValue(":id", $task["id"], PDO::PARAM_INT);
    $req->bindValue(":name", $task["name"], PDO::PARAM_STR);
    $req->bindValue(":status", $task["status"], PDO::PARAM_BOOL);
    $req->bindValue(":date", $task["date"], PDO::PARAM_STR);

    if (!$req->execute()) {
      return false;
    }
    
    return true;
  }

  public function deleteById(int $id) {
    return $this->bdd->exec("DELETE FROM tasks WHERE id={$id}");
  }

  private function setBdd($bdd) {
    $this->bdd = $bdd;
  }
}
