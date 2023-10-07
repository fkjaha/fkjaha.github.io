<?php

class dig_field
{
    private $cellStrength = 5;
    private $numberOfRows = 5;
    private $numberOfColumns = 10;
    private $grid = [];

    private $possibleBones;
    private BonesStorage $connectedStorage;

    public function getRowsCount(){
        return $this->numberOfRows;
    }

    public function getColumnsCount(){
        return $this->numberOfColumns;
    }

    public function getMaxCellStrength(){
        return $this->cellStrength;
    }

    public function setStorage($storage){
        $this->connectedStorage = $storage;
    }

    public function __construct(BonesStorage $connectedStorage, $rows = 5, $columns = 10, $cellStrength = 100, $possibleBones = []){
        for ($row = 0; $row < $rows; $row++) {
            $this->grid[$row] = [];
            for ($col = 0; $col < $columns; $col++) {
                $this->grid[$row][$col] = $cellStrength;
            }
        }
        $this->numberOfRows = $rows;
        $this->numberOfColumns = $columns;
        $this->cellStrength = $cellStrength;
        $this->possibleBones = $possibleBones;
        $this->connectedStorage = $connectedStorage;
    }

    public function getCell($x, $y){
        return $this->grid[$y][$x];
    }

    public function hitCell($x, $y, HitTool $tool, luck $luck){
        if($this->grid[$y][$x] > 0) {
            $this->grid[$y][$x] = $tool->hitTile($this->grid[$y][$x]);
            if ($this->grid[$y][$x] <= 0) {
                $randomNumber = rand(0, 100);
                if ($randomNumber > $luck->getLuck()) {
                    return "broken";
                } else {
                    $drop = $this->possibleBones[rand(0, count($this->possibleBones) - 1)];
                    $this->connectedStorage->store($drop);
                    return $drop;
                }
            }
        }
        $rows = count($this->grid);
        $columns = count($this->grid[0]);
        for ($row = 0; $row < $rows; $row++) {
            for ($col = 0; $col < $columns; $col++) {
                if ($this->grid[$row][$col] > 0) return null;
            }
        }
        $this->updateField();
        return null;
    }

    public function updateField(){
        $this->cellStrength = (int)($this->cellStrength * 1.75);
        $rows = count($this->grid);
        $columns = count($this->grid[0]);
        for ($row = 0; $row < $rows; $row++) {
            $this->grid[$row] = [];
            for ($col = 0; $col < $columns; $col++) {
                $this->grid[$row][$col] = $this->cellStrength;
            }
        }
    }
}