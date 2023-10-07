<?php

class luck
{
    private int $startLuck;
    private int $actualLuck;

    public function __construct($startLuck){
        $this->startLuck = $startLuck;
        $this->actualLuck = $startLuck;
    }

    public function getLuck(){
        return $this->actualLuck;
    }

    public function getStartLuck(){
        return $this->startLuck;
    }

    public function setNewLuck($newLuck){
        $this->actualLuck = $newLuck;
    }
}