<?php
require_once 'vendor/autoload.php';

use MyClasses as MC;

$animal = new MC\Animal();
$human = new MC\Human();
$dog = new MC\Dog();
$cat = new MC\Cat();

ob_start();

print <<<EOF
<table>
<tr><td>{$animal->className()}</td><td>{$animal->greeting()}</td></tr>
<tr><td>{$human->className()}</td><td>{$human->greeting()}</td></tr>
<tr><td>{$dog->className()}</td><td>{$dog->greeting()}</td></tr>
<tr><td>{$cat->className()}</td><td>{$cat->greeting()}</td></tr>
</table>
EOF;

$output = ob_get_clean();
?>
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Composer Autoload Sample</title>
    <style>
        h1 {
            text-align: center;
        }
        table {
            margin: 0 auto;
            border-collapse: collapse;
        }
        td {
            border: 1px solid;
            padding: 10px;
        }

        tr:nth-of-type(odd) {
            background-color: lightcyan;
        }

        tr:nth-of-type(even) {
            background-color: beige;
        }
    </style>
</head>

<body>
    <div>
        <h1>Composer Autoload Sample</h1>
        <?= $output ?>
    </div>
</body>

</html>