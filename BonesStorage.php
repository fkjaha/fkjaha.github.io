<?php

class BonesStorage
{
    private $slots = [];

    public function __construct($bones){
        foreach ($bones as $bone){
            $this->slots[] = new storageSlot($bone);
        }
    }

    public function getNumberOfBones($bone){
        foreach ($this->slots as $slot){
            if($slot->storesThisBoneType($bone)){
                return $slot->getStoredCount();
            }
        }
    }

    public function tryTakeBones($bone, $count){
        foreach ($this->slots as $slot){
            if($slot->tryRemoveFromStoring($bone, $count)){
                return true;
            }
        }
        return false;
    }

    public function getSlots(){
        return $this->slots;
    }

    public function store($bone){
        foreach ($this->slots as $slot){
            if($slot->storesThisBoneType($bone)){
                $slot->tryStore($bone);
                break;
            }
        }
    }
}

class storageSlot{
    private Bone $storedTypeOfBones;
    private int $storedCount;

    public function __construct(Bone $storedTypeOfBones){
        $this->storedTypeOfBones = $storedTypeOfBones;
        $this->storedCount = 0;
    }

    public function getStoredCount(){
        return $this->storedCount;
    }

    public function storesThisBoneType(Bone $bone){
        return $bone == $this->storedTypeOfBones;
    }

    public function tryStore($bone){
        if($this->storesThisBoneType($bone)){
            $this->storedCount++;
        }
    }

    public function tryRemoveFromStoring($bone, $count){
        if($this->storesThisBoneType($bone) && $this->storedCount >= $count){
            $this->storedCount -= $count;
            return true;
        }
        return false;
    }
}