<?php

class Upgrade {
    private $name;
    private $level;
    private $maxLevel;
    private $startCost;
    private $costMultiplier;
    private $image;
    private $description;

    public function __construct($image, $name, $descripton, $startCost, $level, $maxLevel, $costMultiplier) {
        $this->name = $name;
        $this->startCost = $startCost;
        $this->level = $level;
        $this->maxLevel = $maxLevel;
        $this->image = $image;
        $this->description = $descripton;
        $this->costMultiplier = $costMultiplier;
    }

    public function getLevel(){
        return $this->level;
    }

    public function getImage(){
        return $this->image;
    }

    protected function upgradeLevel(){
        return $this->level++;
    }

    public function getName() {
        return $this->name;
    }

    public function getDescription() {
        return $this->description;
    }

    public function getLevelCost($level) {
        return $this->level > 1 ? $this->startCost * (int)(($this->level) * $this->costMultiplier) : $this->startCost;
    }

    public function getCost() {
        return $this->getLevelCost($this->level);
    }

    public function upgrade() {
        if($this->level >= $this->maxLevel) return false;
        $this->upgradeLevel();
        $this->updateTarget();
        return true;
    }

    public function updateTarget(){
    }
}

class ClickForceUpgrade extends Upgrade {
    private HitTool $hitTool;

    public function __construct($hitTool, $level, $maxLevel) {
        $name = 'Click Force';
        $this->hitTool = $hitTool;
        parent::__construct("https://static.vecteezy.com/system/resources/previews/010/366/227/original/computer-mouse-click-transparent-free-png.png",
             $name, "Increases forces of ur hits.", 200, $level, $maxLevel, 1.2);
    }

    public function updateTarget(){
        $this->hitTool->setNewForce($this->getLevel());
    }

    public function setNewUpgradeTarget($hitTool){
        $this->hitTool = $hitTool;
    }
}

class LuckUpgrade extends Upgrade {
    private luck $luckToUpgrade;

    public function __construct(luck $luck, $level, $maxLevel) {
        $name = 'Luck';
        $this->luckToUpgrade = $luck;
        parent::__construct("https://www.pngall.com/wp-content/uploads/2017/05/Good-Luck-PNG-Image.png"
            , $name, "Increases chance to get bones.", 250, $level, $maxLevel, 1.3);
    }

    public function updateTarget(){
        $this->luckToUpgrade->setNewLuck($this->luckToUpgrade->getStartLuck() + ($this->getLevel()) * 5);
    }

    public function setNewUpgradeTarget(luck $luck){
        $this->luckToUpgrade = $luck;
        $this->updateTarget();
    }
}
