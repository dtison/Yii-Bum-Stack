<?php
/* @var $this AdminController */

$this->pageTitle= 'Admin | '+Yii::app()->name;

?>

<section id="main-content" class="content"></section>


<?php

// Turn things over to Marionette, and auto-load templates
echo Marionette::loadBum($action);

?>
