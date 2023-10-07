<?php

if(isset($_GET['hits']) && isset($_GET['broken']) && isset($_GET['bones'])){
    echo '<table style="margin-left: auto; margin-right: auto; border: 4px solid black;">';
    echo '<tr><td>' . 'Hits: ' . $_GET['hits'] . '</td></tr>';
    echo '<tr><td>' . 'Blocks Dug: ' . $_GET['broken'] . '</td></tr>';
    echo '<tr><td>' . 'Bones Found: ' . $_GET['bones'] . '</td></tr>';
    echo '</table>';
}
else{
    echo '<h2>STATS ERROR</h2>';
}

echo '<form method="" action="index.php">';
echo '<a href="index.php" style="background-color: wheat">Back to game...</a>';
echo '</form>';

?>
<body background="https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?cs=srgb&dl=pexels-pixabay-235985.jpg&fm=jpg" ">
