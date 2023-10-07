<?php

class Bone
{
    private dinosaur $parentDinosaur;

    public function __construct(dinosaur $parentDinosaur){
        $this->parentDinosaur = $parentDinosaur;
    }

    public function getParentDinosaur(){
        return $this->parentDinosaur;
    }
}