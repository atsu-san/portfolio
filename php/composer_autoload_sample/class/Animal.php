<?php
namespace MyClasses;

class Animal
{ 
    protected const REPLY = '・・・';
    
    public function className(): string
    {
        return get_class($this);
    }

    public function greeting(): string
    {
        return static::REPLY;
    }
}