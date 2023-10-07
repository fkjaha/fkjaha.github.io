<?php

class HitTool
{
    private $force;

    public function __construct($force){
        $this->force = $force;
    }

    public function hitTile($tile){
        return ($tile - $this->force);
    }

    public function getForce($tile){
        return $this->force;
    }

    public function setNewForce($force){
        $this->force = $force;
    }
}