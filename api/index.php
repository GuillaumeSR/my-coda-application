<?php
ini_set("date.timezone", "Europe/Paris");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

require_once "./utils/Autoloader.php";
Autoloader::register();

$configManager = new Config();
[$configFile, $config] = $configManager->registerConfig();

try {
  $httpRequest = new HttpRequest();
  $router = new Router();
  $httpRequest->setRoute($router->findRoute($httpRequest, $config->basepath));
  $httpRequest->run($config);
} catch (Exception $e) {
  throw new Exception($e->getMessage());
}
