<?php

class dinosaur
{
    private $cost;
    private $partsRequired;
    private $name;
    private $description;
    private $image;
    private $rarity;
    private $wiki;

    public function __construct($cost, $partsRequired, $name, $description, $image, $rarity, $wiki = "")
    {
        $this->cost = $cost;
        $this->partsRequired = $partsRequired;
        $this->name = $name;
        $this->description = $description;
        $this->image = $image;
        $this->rarity = $rarity;
        $this->wiki = $wiki;
    }

    public function getCost()
    {
        return $this->cost;
    }

    public function getWiki()
    {
        return $this->wiki;
    }

    public function getPartsRequired()
    {
        return $this->partsRequired;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function getImage()
    {
        return $this->image;
    }

    public function getRarity()
    {
        return $this->rarity;
    }
}
