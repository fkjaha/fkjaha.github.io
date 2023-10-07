<?php
require_once ("dig_field.php");
require_once("grid_ui_renderer.php");
require_once ("dinosaur.php");
require_once ("BonesStorage.php");
require_once ("Bone.php");
require_once ("HitTool.php");
require_once ("luck.php");
require_once ("upgrades.php");
session_start();

$shopImageSize = 75;

$blocksDug = 0;
$bonesFound = 0;
$hits = 0;
$coins = 0;
$dinosaurs = [];
$unlockedDinosaurs = [];
$bones = [];
$storage = new BonesStorage($bones);
$hitTool = new HitTool(1);
$luck = new luck(25);

$dig_field = new dig_field($storage);
$grid_ui_renderer = new grid_ui_renderer();

$upgrades = array(new ClickForceUpgrade($hitTool, 1, 10), new LuckUpgrade($luck, 1, 70));

function saveProgress($coins, $dig_field, $ui_renderer, $storage, $dinosaurs, $bones, $hitTool, $luck, $upgrades, $unlockedDinos, $blocksDug, $bonesFound, $hits){
    $_SESSION['blocks'] = $blocksDug;
    $_SESSION['hits'] = $hits;
    $_SESSION['bonesFound'] = $bonesFound;
    $_SESSION['coins'] = $coins;
    $_SESSION['hitTool'] = serialize($hitTool);
    $_SESSION['digField'] = serialize($dig_field);
    $_SESSION['uirenderer'] = serialize($ui_renderer);
    $_SESSION['storage'] = serialize($storage);
    $_SESSION['dinos'] = serialize($dinosaurs);
    $_SESSION['udinos'] = serialize($unlockedDinos);
    $_SESSION['bones'] = serialize($bones);
    $_SESSION['luck'] = serialize($luck);
    foreach ($upgrades as $upgrade) {
        $_SESSION['upgrades' . $upgrade->getName()] = serialize($upgrade);
    }
}

if(isset($_POST['clearSession'])){
    session_unset();
}

if(!isset($_SESSION['started']) || !$_SESSION['started']){
    $grid_ui_renderer = new grid_ui_renderer();
    $dinosaurs = [
        new dinosaur(500, 3, "Velociraptor", "A fast and intelligent dinosaur.",
            "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQD77ntM_ltBrhd9MO2CgJRJVEqimLh9VF38o7FEnylhkvDPs0BuxNB_knp3lD11nYVWUO7PqOtaooEml4", "Rare",
        "https://en.wikipedia.org/wiki/Velociraptor"),
        new dinosaur(1000, 5, "Triceratops", "A herbivorous dinosaur with three horns.",
            "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRsS6KWLoAyL_IFjI5Ts0utSPJLiqgW0RdzB8q003svm5FcQBTMybL8Pl3LZJr_jiJnkGhv0ythowWCBq4", "Rare"
        , "https://pl.wikipedia.org/wiki/Triceratops"),
        new dinosaur(2500, 8, "Tyrannosaurus Rex", "A large, carnivorous dinosaur.",
            "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQypxU_irYUdUKJiMh1Y4xRJ0wFMZX-m7dGgJKsmK55x2TgzVbUxU8yW8SMuuF4VIJvIr18UnsxubFwj3E", "Common"
        , "https://en.wikipedia.org/wiki/Tyrannosaurus"),
        new dinosaur(30000, 50, "Stegosaurus", "Has distinctive row of large bony plates along its back and its spiked tail.",
            "https://static.wikia.nocookie.net/jurassicpark/images/8/8f/Jurassic_world_fallen_kingdom_stegosaurus_v4_by_sonichedgehog2-dco06sh.png/revision/latest?cb=20180928221819", "Epic"
        ,"https://en.wikipedia.org/wiki/Stegosaurus"),
        new dinosaur(10000000, 300, "Pterodactyl", "AIt had a wingspan of up to 30 feet and soared through the skies.",
            "https://images.dinosaurpictures.org/Pterodactyl-facts_b1c1.jpg", "Legendary"
        ,"https://en.wikipedia.org/wiki/Pterodactylus")
    ];

    foreach ($dinosaurs as $dinosaur){
        $bones[] = new Bone($dinosaur);
    }

    $storage = new BonesStorage($bones);

    $dig_field = new dig_field($storage, 5, 10, 3, $bones);

    $_SESSION['started'] = true;
    saveProgress($coins, $dig_field, $grid_ui_renderer, $storage, $dinosaurs, $bones, $hitTool, $luck, $upgrades, $unlockedDinosaurs, $blocksDug, $bonesFound, $hits );
}
else{
    $grid_ui_renderer = unserialize($_SESSION['uirenderer']);
    $hitTool = unserialize($_SESSION['hitTool']);
    $dinosaurs = unserialize($_SESSION['dinos']);
    $unlockedDinosaurs = unserialize($_SESSION['udinos']);
    $bones = unserialize($_SESSION['bones']);
    $storage = unserialize($_SESSION['storage']);
    $dig_field = unserialize($_SESSION['digField']);
    $dig_field->setStorage($storage);
    $luck = unserialize($_SESSION['luck']);
    $count = count($upgrades);
    for ($i = 0; $i < $count; $i++) {
        $upgrades[$i] = unserialize($_SESSION['upgrades' . $upgrades[$i]->getName()]);
        $upgrades[$i]->setNewUpgradeTarget($i == 0 ? $hitTool : $luck);
    }

    $coins = intval($_SESSION['coins']);
    $blocksDug = intval($_SESSION['blocks']);
    $bonesFound = intval($_SESSION['bonesFound']);
    $hits = intval($_SESSION['hits']);
}

if(isset($_GET['row']) && isset($_GET['col'])){
    $x = $_GET['col'];
    $y = $_GET['row'];
    $hitResult = $dig_field->hitCell($x, $y, $hitTool, $luck);
    $hits++;
    if($hitResult == "broken") $blocksDug++;
    if($hitResult != null && $hitResult != "broken") {
        $bonesFound++;
        $blocksDug++;
    }
    saveProgress($coins, $dig_field, $grid_ui_renderer, $storage, $dinosaurs, $bones, $hitTool, $luck, $upgrades, $unlockedDinosaurs, $blocksDug, $bonesFound, $hits);
}

if(isset($_POST['sell'])){
    $dinoIndex = $_POST['sell'];
    $dino = $dinosaurs[$dinoIndex];
    $bone = $bones[$dinoIndex];
    if($storage->tryTakeBones($bone, $dino->getPartsRequired())){
        $coins += $dino->getCost();
        if(!in_array($dino, $unlockedDinosaurs)){
            $unlockedDinosaurs[] = $dino;
        }
        saveProgress($coins, $dig_field, $grid_ui_renderer, $storage, $dinosaurs, $bones, $hitTool, $luck, $upgrades, $unlockedDinosaurs, $blocksDug, $bonesFound, $hits);
    }
}

if(isset($_POST['buy'])){
    $upgradeIndex = $_POST['buy'];
    $upgrade = $upgrades[$upgradeIndex];
    if($coins >= $upgrade->getCost() && $upgrade->getCost() != false){
        $coins -= $upgrade->getCost();
        $upgrade->upgrade();
        saveProgress($coins, $dig_field, $grid_ui_renderer, $storage, $dinosaurs, $bones, $hitTool, $luck, $upgrades, $unlockedDinosaurs, $blocksDug, $bonesFound, $hits);
    }
}

$grid_ui_renderer->gameUI($dig_field);

?>
<html>
<body background="https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg?cs=srgb&dl=pexels-pixabay-235985.jpg&fm=jpg" ">
<table style="margin-left: auto; margin-right: auto; text-align: center;">
    <tr>
        <td>
            <h2 style="text-align: center; color: chartreuse; background-color: black"><?php echo 'Balance: $' . $coins ?></h2>
        </td>
        <td>
<h2 style="text-align: center">Collection</h2>
<table style="margin-left: auto; margin-right: auto; text-align: center; border: 2px solid black;">
    <tr>
        <th>Image</th>
        <th>Description</th>
        <th>Cost</th>
        <th>Parts Required</th>
        <th>Rarity</th>
        <th>Bones Collected</th>
        <th>Name</th>
        <th>Craft</th>
    </tr>
    <?php
    for ($i = 0; $i < count($dinosaurs); $i++) {
        $dinosaur = $dinosaurs[$i];
        $bone = $bones[$i];
        $image = $dinosaur->getImage();
        $description = $dinosaur->getDescription();
        $cost = $dinosaur->getCost();
        $name = $dinosaur->getName();
        if(!in_array($dinosaur, $unlockedDinosaurs)){
            $image = "https://static.vecteezy.com/system/resources/previews/012/174/061/original/3d-question-mark-free-png.png";
            $description = "???";
            $cost = "???";
            $name = "???";
        }
        echo '<tr>';
        echo '<td><img src="' . $image . '" alt="' . $dinosaur->getName() . '" 
        style="width: ' . $shopImageSize .'px; height: ' . $shopImageSize .'px"></td>';
        if(in_array($dinosaur, $unlockedDinosaurs)){
            echo '<td>' . '<a href="' . $dinosaur->getWiki() . '" target="_blank">' . $description . '</a>' . '</td>';
        }
        else{
            echo '<td>' . $description . '</td>';
        }
        echo '<td>' . $cost . '</td>';
        echo '<td>' . $dinosaur->getPartsRequired() . '</td>';
        echo '<td>' . $dinosaur->getRarity() . '</td>';
        echo '<td>' . $storage->getNumberOfBones($bone) . '</td>';
        echo '<td>' . $name . '</td>';

        if($storage->getNumberOfBones($bone) >= $dinosaur->getPartsRequired()){
            echo '<form method="post" action="index.php">';
            echo '<td><button type="submit" name="sell" value="' . $i . '">Craft & Sell</button></td>';
            echo '</form>';
        }
        else{
            echo '<td>' . $storage->getNumberOfBones($bone) . "/" . $dinosaur->getPartsRequired() . '</td>';
        }
        echo '</tr>';
    }
    ?>
</table>
        </td>
        <td>
<h2 style="text-align: center">Upgrades</h2>
<table style="margin-left: auto; margin-right: auto; text-align: center; border: 2px solid black;">
    <tr>
        <th>Image</th>
        <th>Description</th>
        <th>Buy</th>
        <th>Level</th>
    </tr>
    <?php
    $count = count($upgrades);
    for ($i = 0; $i < $count; $i++) {
        $upgrade = $upgrades[$i];
        echo '<td><img src="' . $upgrade->getImage() . '" alt="' . $upgrade->getName() . '"
        style="width: ' . $shopImageSize .'px; height: ' . $shopImageSize .'px"></td>';
        echo '<td>' . $upgrade->getDescription() . '</td>';

        if ($coins >= $upgrade->getCost()) {
            echo '<form method="post" action="index.php">';
            echo '<td><button type="submit" name="buy" value="' . $i . '">$ ' . $upgrade->getCost() .'</button></td>';
            echo '</form>';
        } else {
            echo '<td>' . $coins . "/" . $upgrade->getCost() . '</td>';
        }

        echo '<td>' . $upgrade->getLevel() . ' > ' . ($upgrade->getLevel() + 1) . '</td>';

        echo '</tr>';
    }

    ?>
</table>
        </td>
</tr>
</table>
</body>
</html>

<?php
if(!isset($_POST['clearSession'])){
    echo '<form method="post" action="index.php">';
    echo '<input type="submit" value="Reset ALL" name="clearSession">';
    echo '</form>';
}

echo '<form method="get" action="Stats.php">';
echo '<a href="Stats.php?hits=' . $hits . '&broken=' . $blocksDug . '&bones=' . $bonesFound . '">Statistics</a>';
echo '</form>';

